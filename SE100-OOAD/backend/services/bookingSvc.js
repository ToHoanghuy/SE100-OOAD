const Booking = require('../models/Booking').Booking
const ServiceBooked = require('../models/Booking').ServiceBooked
const Location = require('../models/Location')
const Service = require('../models/Service')
const Room = require('../models/Room')
const {NotFoundException, ForbiddenError} = require('../errors/exception')
const { default: mongoose } = require('mongoose')

const updateStatusBooking = async (bookingId, amountPayed) => {
    const booking = await Booking.findById(bookingId);
    if(!booking)
        throw new NotFoundException('Cannot found booking to calculate')
    booking.amountPaid = amountPayed
    await booking.save()
}

const getAllBooking = async () => {
    const result = await Booking.find()
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found')
    
}
const getBookingById = async (id) => {
    const result = await Booking.findById(id)
    .populate({
        path: 'items.roomId',
        select: 'name'
    })
    .populate({
        path: 'services.serviceId',
        select: 'name'
    }) 
    if(result)
        return result
    else
        throw new NotFoundException('Not found specific booking')
}

const getBookingByUserId = async (userId) => {
    const result = await Booking.find({userId : userId})
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found')
}

//TODO: 
const getBookingByLocationId = async (locationId) => {
    // Tìm tất cả các booking
    const bookings = await Booking.find().lean();

    if (!bookings || bookings.length === 0) {
        throw new NotFoundException("Not found");
    }

    // Duyệt qua từng booking và lọc dựa trên roomId theo locationId
    const filteredBookings = [];

    for (const booking of bookings) {
        const itemsWithRoomDetails = [];

        // Lấy chi tiết từng phòng từ Room dựa trên roomId
        for (const item of booking.items) {
            const room = await Room.findById(item.roomId).lean();

            // Kiểm tra locationId của room
            if (room && room.locationId.toString() === locationId) {
                itemsWithRoomDetails.push({
                    roomId: item.roomId,
                    quantity: item.quantity,
                    roomDetails: {
                        name: room.name,
                        pricePerNight: room.pricePerNight,
                    },
                });
            }
        }

        // Nếu có bất kỳ items nào trong booking thỏa điều kiện, thêm booking vào kết quả
        if (itemsWithRoomDetails.length > 0) {
            filteredBookings.push({
                _id: booking._id,
                userId: booking.userId,
                dateBooking: booking.dateBooking,
                checkinDate: booking.checkinDate,
                checkoutDate: booking.checkoutDate,
                totalPrice: booking.totalPrice,
                status: booking.status,
                items: itemsWithRoomDetails,
            });
        }
    }

    if (filteredBookings.length > 0) {
        return filteredBookings;
    } else {
        throw new NotFoundException("Not found");
    }
};

const createBooking = async (bookingData) => {
    const result = bookingData.save()
    if(result)
        return result
    else
        throw new ForbiddenError('Not allow to create')
}

const updateBooking = async (bookingId, bookingData) => {
    const result = Booking.findByIdAndUpdate(bookingId, bookingData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new NotFoundException('Not allow to update')
}

const addServices = async (bookingId, serviceId) => {
    const booking = await Booking.findById(bookingId)
    if(!booking)
        throw new NotFoundException('Not found booking to add service')
    const service = await Service.findById(serviceId)
    if(!service)
        throw new NotFoundException('Not found service')
    const newService = new ServiceBooked({
        serviceId: service.id,
        price: service.price
    })
    booking.services.push(newService)
    const result = await booking.save()
    if(result)
        return result
    else
        throw new ForbiddenError('Cannot add service')
}

const deleteBooking = async (bookingId) => {
    const result = Booking.findByIdAndDelete(bookingId)
    if(result)
        return result
    else
        throw new NotFoundException('Not allow to delete')
}

const getBookingByBusinessId = async (businessId) => {
    const locations = await Location.find({ ownerId: businessId });
    const locationIds = locations.map(location => location._id);
    const rooms = await Room.find({ locationId: { $in: locationIds } });
    const roomIds = rooms.map(room => room._id);
    const bookings = await Booking.find({ roomId: { $in: roomIds } });
    return bookings;
};

const getRevenueByMonth = async (month, year) => {
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
    const endDate = new Date(year, month, 1); // Ngày đầu tiên của tháng tiếp theo

    const result = await Booking.aggregate([
        {
            $match: {
                dateBooking: {
                    $gte: startDate,
                    $lt: endDate,
                },
            },
        },
        {
            $group: {
                _id: null, // Không group theo trường nào, chỉ tổng hợp toàn bộ
                totalRevenue: { $sum: "$totalPrice" }, // Tổng doanh thu
                totalBookings: { $sum: 1 }, // Tổng số booking
            },
        },
    ]);

    if (result.length > 0) {
        return {
            totalRevenue: result[0].totalRevenue,
            totalBookings: result[0].totalBookings,
        };
    } else {
        return {
            totalRevenue: 0,
            totalBookings: 0,
        };
    }
};

const getBookingRevenueByMonthForBusiness = async (businessId, month, year) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('business ID: ', businessId);
  
    try {
      // Bước 1: Tìm tất cả các Room thuộc businessId qua Location
      const locations = await Location.find({ ownerId: businessId });
      console.log('Locations:', locations); // Kiểm tra nếu không có location
  
      const locationIds = locations.map(location => location._id);
      console.log('Location IDs:', locationIds);
  
      const rooms = await Room.find({ locationId: { $in: locationIds } });
      console.log('Rooms:', rooms); // Kiểm tra xem có phòng không
  
      const roomIds = rooms.map(room => room._id);
      console.log('Room IDs:', roomIds);
  
      // Bước 2: Tìm tất cả các Booking cho các Room của businessId trong tháng
      const bookings = await Booking.aggregate([
        { 
          $match: {
            dateBooking: {
              $gte: startDate,
              $lt: endDate,
            },
            roomId: { $in: roomIds },
          }
        },

        {
          $group: {
            _id: null,  // Nhóm tất cả bookings lại với nhau
            totalRevenue: { $sum: "$totalPrice" },
            totalBookings: { $sum: 1 },
          }
        }
      ]);
  
      console.log('Bookings Result:', bookings); // Kiểm tra kết quả bookings
  
      if (bookings.length > 0) {
        return {
          totalRevenue: bookings[0].totalRevenue,
          totalBookings: bookings[0].totalBookings,
        };
      } else {
        return {
          totalRevenue: 0,
          totalBookings: 0,
        };
      }
    } catch (error) {
      console.log('Error:', error);
      throw new Error("Error retrieving revenue data: " + error.message);
    }
  };
  
module.exports = {
    updateStatusBooking,
    getAllBooking,
    getBookingById,
    getBookingByUserId,
    getBookingByLocationId,
    getBookingByBusinessId,
    createBooking,
    updateBooking,
    addServices,
    deleteBooking,
    getRevenueByMonth,
    getBookingRevenueByMonthForBusiness,
}