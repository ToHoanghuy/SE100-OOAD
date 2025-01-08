import { Routes, Route, Link, useLocation, Outlet, useSearchParams } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { getIconClass, formatRating, formatPrice, formatDate } from '../function/functionEffect';
import Swal from "sweetalert2";
import '../styles/Booking.css';

function Booking() {
    const location = useLocation();
    const [step, setStep] = useState(1);

    //Step 1:
    const [bookingData, setBookingData] = useState([]);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [total, setTotal] = useState('');
    const [night, setNight] = useState('');
    const [locationId, setLocationId] = useState('');

    const [hotel, setHotel] = useState('');
    const [services, setServices] = useState([]);

    const getLocationInfo = async () => {
        try {
            const response = await fetch(`http://localhost:3000/locationbyid/${locationId}`);
            const data = await response.json();
            if (data.isSuccess) {
                setHotel(data.data);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
        }
    };
    const getServices = async () => {
        try {
            const response = await fetch(`http://localhost:3000/service/location/${locationId}`);
            const result = await response.json();
            if (response.ok && result.isSuccess) {
                setServices(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = [];
        var checkinValue;
        var checkoutValue;

        // Lấy tất cả các thông số trong URL.
        let currentItem = {};
        urlParams.forEach((value, key) => {
            if (key === 'checkin' || key === 'checkout' || key === 'totalprice' || key === 'location') {
                switch (key) {
                    case 'checkin':
                        checkinValue = value;
                        break;
                    case 'checkout':
                        checkoutValue = value;
                        break;
                    case 'totalprice':
                        setTotal(value);
                        break;
                    case 'location':
                        setLocationId(value);
                        break;
                    default:
                        break;
                }
            }
            else {
                currentItem[key] = value;
                if (key === 'quantity_value') {
                    data.push({ ...currentItem });
                    currentItem = {};
                }
            }
        });
        setBookingData(data);

        if (checkinValue && checkoutValue) {
            const differenceInHours = (new Date(checkoutValue) - new Date(checkinValue)) / (1000 * 60 * 60);
            const night_value = Math.round(differenceInHours / 24);

            setNight(night_value)
            setCheckInDate(checkinValue)
            setCheckOutDate(checkoutValue)
        }
    }, [location.search]);

    useEffect(() => {
        if (locationId) {
            getLocationInfo();
            getServices();
        }
    }, [locationId]);



    //Step 2:
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/getbyid/${localStorage.getItem("authToken")}`);
            const data = await response.json();
            if (data.isSuccess) {
                // setUser(data.data);
                setCustomerName(data.data.userName)
                setEmail(data.data.userEmail)
                setPhone(data.data.userPhoneNumber)
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    };
    useEffect(() => {
        if (step == 2) getUser();
    }, [step]);

    //Step 3:
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handleSelect = (index) => {
        setSelectedPayment(index);
    };

    const createBooking = async (localTime, items, userId) => {
        const url = "http://localhost:3000/booking/createbooking";
        const body = {
            checkinDate: checkInDate,
            checkoutDate: checkOutDate,
            dateBooking: localTime,
            userId: userId,
            items: items
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body), 
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else {
                // alert('thành công')
                Swal.fire({
                    title: 'Hoàn thành đặt phòng',
                    text: 'Bạn đã đặt phòng thành công',
                    icon: 'success',
                    timer: 1500, // Tự động đóng sau 2 giây
                    showConfirmButton: false, // Ẩn nút xác nhận
                });
                window.history.back();
                window.scrollTo(0, 0);
            }
            const data = await response.json(); // Parse kết quả trả về JSON
            console.log("Booking created successfully:", data);
        } catch (error) {
            console.error("Error creating booking:", error.message);
        }
    };



    const handleBooking = () => {
        if(selectedPayment)
        {
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000; // Offset tính bằng milliseconds
            const localTime = new Date(now - offset).toISOString(); // Điều chỉnh theo giờ địa phương
            const items = bookingData.map(item => ({
                roomId: item.id,
                quantity: parseInt(item.quantity_value, 10), // Chuyển quantity_value sang số nguyên
                nights: night // Thêm giá trị mặc định
            }));
            // alert(localStorage.getItem("authToken"))
            createBooking(localTime, items, localStorage.getItem("authToken"))
        }
        // else{
        //     Swal.fire({
        //         title: 'Hoàn thành ',
        //         text: 'Bạn đã đặt phòng thành công',
        //         icon: 'success',
        //         timer: 1500, // Tự động đóng sau 2 giây
        //         showConfirmButton: false, // Ẩn nút xác nhận
        //     });
        // }
        
    };


    return (
        <div className='booking_section'>
            <div className='display_frame'>
                <div className='step_circle_frame'>
                    <div className='step_circle_div taken_step'
                        onClick={step > 1 ? () => setStep(1) : null}>
                        <div className='step_circle'><i class="fa-solid fa-book"></i></div>
                        <span>Chi tiết đặt phòng</span>
                    </div>
                    <div className={`angles ${step >= 2 ? 'current_step' : 'next_step'}`}
                    >
                        <i class="fa-solid fa-angles-right"></i>
                    </div>
                    <div className={`step_circle_div ${step >= 2 ? 'taken_step' : 'untaken_step'}`}
                        onClick={step > 2 ? () => setStep(2) : null}>
                        <div className='step_circle '><i class="fa-regular fa-id-card"></i></div>
                        <span>Thông tin cá nhân</span>
                    </div>
                    <div className={`angles ${step >= 3 ? 'current_step' : 'next_step'}`}>
                        <i class="fa-solid fa-angles-right"></i>
                    </div>
                    <div className={`step_circle_div ${step >= 3 ? 'taken_step' : 'untaken_step'}`}>
                        <div className='step_circle '><i class="fa-solid fa-money-check-dollar"></i></div>
                        <span>Thanh toán</span>
                    </div>
                </div>
                {step === 1 && hotel &&
                    <div className='booking_step_frame'>
                        <div className='booking_info_frame'>
                            <div className='booking_info booking_location_info'>
                                <div className='booking_location_top'>
                                    <div className='booking_location_top_left'>
                                        <img src={hotel?.image?.[0]?.url || '/images/default_location_img.jpg'} />
                                    </div>
                                    <div className='booking_location_top_right'>
                                        <span className='booking_title'>{hotel.name}</span>
                                        <div class="booking_address"><i class="fa-solid fa-location-dot"></i><span>{hotel.address}</span></div>
                                        <div class="booking_rating">
                                            <i class="fa-solid fa-star"></i>
                                            <span>{formatRating(hotel.rating)}</span>
                                        </div>
                                        <div className='booking_service'>
                                            {services.map((service, index) => (
                                                <div className='booking_service_ele'>
                                                    <i className={getIconClass(service.name)}></i>
                                                    {/* <i className="fa-solid fa-location-dot"></i> */}
                                                    <span>{service.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* <div className='booking_location_price'>VNĐ 5.000.000</div> */}
                                    </div>
                                </div>
                                <div className='booking_location_bottom'>
                                    {bookingData.map((room, index) => (
                                        <div key='index' className='booking_room'>
                                            <div className='booking_room_name'>{room.name}</div>
                                            {/* <div className='booking_room_faclity'>
                                                <div className='booking_service_ele'>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <span>ads</span>
                                                </div>
                                               
                                                <div className='booking_service_ele'>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <span>adsadssssssssssssss</span>
                                                </div>
                                                <div className='booking_service_ele'>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <span>adsadssssssssssssss</span>
                                                </div>
                                                <div className='booking_service_ele'>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <span>adsadssssssssssssss</span>
                                                </div>
                                                <div className='booking_service_ele'>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <span>adsadssssssssssssss</span>
                                                </div>
                                            </div> */}
                                            <div className='booking_location_price'>VNĐ {formatPrice(room.price)}</div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className='booking_info booking_detail_info'>
                                {/* <div className='booking_detail_top'> */}
                                <span className='booking_title booking_detail_top_title'>Chi tiết phòng của bạn</span>
                                <div className='booking_detail_time'>
                                    <span className='type_date'>Nhận phòng: </span>
                                    <span className='date_value'>{formatDate(checkInDate)}</span>
                                </div>
                                <div className='booking_detail_time'>
                                    <span className='type_date'>Trã phòng: </span>
                                    <span className='date_value'>{formatDate(checkOutDate)}</span>
                                </div>
                                <div className='booking_detail'>
                                    <div className='booking_detail_flex'>
                                        <span className='booking_title'>Tổng thời gian:</span>
                                        <span className='booking_value'>{night} đêm</span>
                                    </div>
                                </div>

                                {bookingData.map((room, index) => (
                                    <div className='booking_detail'>
                                        <span className='booking_title'>{room.name}</span>
                                        <div className='booking_detail_flex'>
                                            <span className='booking_title'>Số lượng phòng:</span>
                                            <span className='booking_value'>{room.quantity_value}</span>
                                        </div>
                                        <div className='booking_location_price'>VNĐ {formatPrice(room.price * room.quantity_value)}</div>
                                    </div>
                                ))}
                                <div className='booking_total_price'>
                                    <span className='booking_total_title'>Tổng cộng</span>
                                    <span className='booking_total_value'>VNĐ {formatPrice(total)}</span>
                                </div>

                            </div>
                        </div>
                        <div className='booking_btn_frame'>
                            <button onClick={() => setStep(2)}>Tiếp theo</button>
                        </div>
                    </div>
                }
                {step === 2 &&
                    <div className='booking_step_frame2'>
                        <div className='booking_info booking_user_info'>
                            <span className='booking_title booking_user_title'>Thông tin liên hệ của bạn</span>
                            <div className='user_booking_input_frame'>
                                <label>Tên người dùng</label>
                                <div className='user_booking_input'>
                                    <input type='text'
                                        value={customerName}
                                        onChange={(event) => setCustomerName(event.target.value)}
                                        placeholder='Tên của bạn'
                                    />
                                </div>
                            </div>
                            <div className='user_booking_input_frame_split'>
                                <div className='user_booking_input_frame'>
                                    <label>Email</label>
                                    <div className='user_booking_input'>
                                        <input type='email'
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            placeholder='Email của bạn' />
                                    </div>
                                </div>
                                <div className='user_booking_input_frame'>
                                    <label>Số điện thoại</label>
                                    <div className='user_booking_input'>
                                        <input type='phone'
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                            placeholder='Số điện thoại của bạn' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='booking_btn_frame'>
                            <button onClick={() => setStep(1)}>Quay lại</button>
                            <button onClick={() => setStep(3)}>Tiếp theo</button>
                        </div>
                    </div>
                }
                {step === 3 &&
                    <div className='booking_step_frame'>
                        <div className='booking_info_frame'>
                            <div className='booking_info booking_bill'>
                                <span className='booking_title booking_detail_top_title'>Đơn giá</span>
                                {bookingData.map((room, index) => (
                                    <div className='booking_detail'>
                                        <span className='booking_title'>{room.name}</span>
                                        <div className='booking_detail_flex'>
                                            <span className='booking_title'>Số lượng phòng:</span>
                                            <span className='booking_value'>{room.quantity_value}</span>
                                        </div>
                                        <div className='booking_location_price'>VNĐ {formatPrice(room.price * room.quantity_value)}</div>
                                    </div>
                                ))}
                                <div className='booking_total_price'>
                                    <span className='booking_total_title'>Tổng cộng</span>
                                    <span className='booking_total_value'>VNĐ {formatPrice(total)}</span>
                                </div>
                            </div>
                            <div className='booking_info booking_payment'>
                                <span className='booking_title booking_detail_top_title'>Phương thức thanh toán</span>
                                <div className='payment_method'>
                                    <div className='payment_method_ele'>
                                        <i className={
                                            selectedPayment === 1
                                                ? "fa-regular fa-circle-check"
                                                : "fa-regular fa-circle"}
                                            onClick={() => handleSelect(1)}
                                        ></i>
                                        <div>Thẻ ngân hàng</div>
                                    </div>
                                    <div className='payment_method_ele'>
                                        <i className={
                                            selectedPayment === 2
                                                ? "fa-regular fa-circle-check"
                                                : "fa-regular fa-circle"}
                                            onClick={() => handleSelect(2)}
                                        ></i>
                                        <div>MOMO</div>
                                    </div>
                                    <div className='payment_method_ele'>
                                        <i className={
                                            selectedPayment === 3
                                                ? "fa-regular fa-circle-check"
                                                : "fa-regular fa-circle"}
                                            onClick={() => handleSelect(3)}
                                        ></i>
                                        <div>Trực tiếp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='booking_info booking_qr'>
                            </div>
                        </div>
                        <div className='booking_btn_frame'>
                            <button onClick={() => setStep(2)}>Quay lại</button>
                            <button onClick={handleBooking}>Đặt phòng</button>
                        </div>
                    </div>
                }
            </div>
            {/* <i class="fa-solid fa-address-book"></i>
            <i class="fa-regular fa-id-card"></i> */}
        </div>
    );
}

export default Booking;