import React, { useState, useRef, useEffect } from 'react';
import '../styles/HistoryBooking.css';
import BookingHistoryEle from '../components/BookingHistoryEle.js';

function HistoryBooking() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('Tất cả');

    const [tickets, setTickets] = useState([]);
    const [locationId, setLocationId] = useState(null);

    const fetchRoomDetails = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:3000/room/getbyid/${roomId}`);
            const result = await response.json();

            if (result && result.isSuccess) {
                return result.data;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching room details for roomId: ${roomId}`, error);
            return null;
        }
    };
    const fetchLocationDetails = async (locationId) => {
        try {
            const response = await fetch(`http://localhost:3000/locationbyid/${locationId}`);
            const result = await response.json();

            if (result && result.isSuccess) {
                return result.data;
            }
            return null;
        } catch (error) {
            console.error(
                `Error fetching location details for locationId: ${locationId}`,
                error
            );
            return null;
        }
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/booking/getbyuserid/${localStorage.getItem(
                        "authToken"
                    )}`
                );
                const result = await response.json();

                if (result.isSuccess && result.data) {
                    const ticketWithNames = await Promise.all(
                        result.data.map(async (ticket) => {
                            const room = await fetchRoomDetails(ticket.items[0]?.roomId);

                            const location =
                                room && room.locationId
                                    ? await fetchLocationDetails(room.locationId)
                                    : null;

                            const imageUrl =
                                location && location.image && location.image?.[0]?.url
                                    ? location.image?.[0].url
                                    : "https://via.placeholder.com/150";

                            setLocationId(room.locationId);

                            return {
                                ...ticket,
                                locationName: location ? location.name : "Unknown Location",
                                imageUrl: imageUrl,
                            };
                        })
                    );
                    setTickets(ticketWithNames);
                    // console.log('data ', ticketWithNames)
                } else {
                    console.error("API returned an error:", result.error);
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();

    }, []);

    const bookingHistory = [
        {
            id: 1,
            name: "Ho Coc Camping, Vung Tau",
            imgSrc: "/images/detail/detail2.jpg",
            startDate: "26/07/2024",
            endDate: "30/07/2024",
            status: "Đang xử lý",
            path: "ho-coc-camping-vung-tau",
        },
        {
            id: 2,
            name: "Mui Ne Resort, Phan Thiet",
            imgSrc: "/images/detail/detail3.jpg",
            startDate: "15/08/2024",
            endDate: "18/08/2024",
            status: "Hoàn thành",
            path: "mui-ne-resort-phan-thiet",
        },
        {
            id: 3,
            name: "Saigon Pearl, Ho Chi Minh City",
            imgSrc: "/images/detail/detail4.jpg",
            startDate: "01/09/2024",
            endDate: "05/09/2024",
            status: "Đang xử lý",
            path: "saigon-pearl-ho-chi-minh-city",
        },
        {
            id: 4,
            name: "Da Lat Flower Hotel, Da Lat",
            imgSrc: "/images/detail/detail5.jpg",
            startDate: "10/10/2024",
            endDate: "15/10/2024",
            status: "Đang xử lý",
            path: "da-lat-flower-hotel-da-lat",
        },
    ];

    // Filter data based on selected status
    const filteredBookings = tickets.filter((booking) => {
        if (filterStatus === 'Tất cả') return true;  // Trả về tất cả nếu filter là "Tất cả".
        if (filterStatus === 'Đang xử lý') return booking.status === 'pending';  // Nếu filter là "Đang xử lý", chỉ lọc trạng thái "pending".
        if (filterStatus === 'Đã hủy') return booking.status === 'canceled';  // Nếu filter là "Đã hủy", chỉ lọc trạng thái "cancelled".
        if (filterStatus === 'Hoàn thành') return booking.status === 'complete';  // Nếu filter là "Đã hoàn thành", chỉ lọc trạng thái "complete".
        if (filterStatus === 'Đã xác nhận') return booking.status === 'confirm';  // Nếu filter là "Đã xác nhận", chỉ lọc trạng thái "confirm".
        return false;
    });

    // Toggle filter dropdown
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Handle clicking outside to close the filter
    const handleClickOutside = (e) => {
        if (isFilterOpen && !e.target.closest('.filter')) {
            setIsFilterOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isFilterOpen]);

    if (tickets) {
        return (
            <div className="user_section">
                <div className="user_title_section user_section_frame">
                    <span className="OpacityEffect">Lịch sử đặt phòng</span>
                </div>
                <div className="user_content_section user_section_frame">
                    <div className="filter_section">
                        <div className='filter'>
                            <span
                                className={
                                    filterStatus === "Đang chờ xử lý"
                                        ? "status_pending"
                                        : filterStatus === "Đã hủy"
                                            ? "status_canceled"
                                            : filterStatus === "Hoàn thành"
                                                ? "status_complete"
                                                : filterStatus === "Đã xác nhận"
                                                    ? "status_confirm"
                                                    : "status_processing" // Default to processing if none match
                                }
                            >
                                {filterStatus}
                            </span>
                            <i className="fa-solid fa-list" onClick={toggleFilter}></i>
                        </div>
                        {isFilterOpen && (
                            <div className='booking_filter_selection'>
                                <div className='filter_option' onClick={() => setFilterStatus('Tất cả')}>Tất cả</div>
                                <div className='filter_option status_pending' onClick={() => setFilterStatus('Đang xử lý')}>Đang chờ xử lý</div>
                                <div className='filter_option status_complete' onClick={() => setFilterStatus('Hoàn thành')}>Hoàn thành</div>
                                <div className='filter_option status_canceled' onClick={() => setFilterStatus('Đã hủy')}>Đã hủy</div>
                                <div className='filter_option status_confirm' onClick={() => setFilterStatus('Đã xác nhận')}>Đã xác nhận</div>
                            </div>
                        )}
                    </div>
                    <div className="user_booking_frame">
                        {filteredBookings.map((booking, index) => (
                            <BookingHistoryEle
                                key={index}
                                booking={booking}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryBooking;