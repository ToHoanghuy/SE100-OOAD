import React, { useState, useRef, useEffect } from 'react';
import { getIconClass } from '../function/functionEffect';
import { formatPrice } from '../function/formatPrice';
import Swal from "sweetalert2";

function RoomInfo({ services }) {
    const [quantity, setQuantity] = useState(0);
    const maxRooms = 3; // Số phòng trống
    const price= 7500000

    const increment = () => {
        if (quantity < maxRooms) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }

    };

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleChange = (e) => {
        let value = e.target.value;
        // Kiểm tra nếu giá trị không phải là số hoặc rỗng, thì gán lại "0"
        if (/^[0-9]*$/.test(value) || value === "") {
            // setQuantity(value === "" ? 0 : parseInt(value));
            value = value === "" ? 0 : parseInt(value);
            // Nếu giá trị lớn hơn maxRooms, đặt giá trị bằng maxRooms
            if (value > maxRooms) {
                value = maxRooms;
            }
            setQuantity(value);
        }
    };

    const booking = () => {
        if(quantity ==0)
        {
            Swal.fire({
                title: 'Thất bại',
                text: 'Bạn chưa chọn số lượng!',
                icon: 'error',
                confirmButtonText: 'Tiếp tục',
                customClass: {
                    confirmButton: 'custom_swal_button' 
                }
            });
        }
    };

    return (
        <div class="room_info OpacityEffect">
            <div class="room_info_detail">
                <div class="room_facilities">
                    <div class="room_facilities_ele">
                        <img src="/images/logo/frontbed.png" />
                        <span>1 giường lớn</span>
                    </div>
                    <div class="room_facilities_ele">
                        <i class="fa-solid fa-house"></i>
                        <span>Diện tích: 16m<sup>2</sup></span>
                    </div>
                </div>
                <div class="room_service">
                    <span class="room_service_title">
                        <i class="fa-solid fa-hand-holding-heart"></i>Dịch vụ
                    </span>
                    <div class="room_service_detail">
                        {services.map((service, index) => (
                            <div class="room_service_item service_ele">
                                <i className={getIconClass(service.id)}></i>
                                <span class="service_name">{service.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="room_quantity">
                    <span>Chọn số lượng</span>
                    <div className="quantity_container">
                        <div className="quantity_button">
                            <button className="quantity_btn" onClick={decrement}>-</button>
                            <input
                                type="text"
                                className="value-box"
                                value={quantity}
                                onChange={handleChange}
                            />
                            <button className="quantity_btn" onClick={increment}>+</button>
                        </div>
                        <span className="vacant_room">Còn {maxRooms} phòng trống</span>
                    </div>
                </div>
            </div>
            <div class="book_now">
                <div class="room_price">
                    <span class="room_price_text">Giá</span>
                    <span class="room_price_value">VNĐ {formatPrice(price)}</span>
                </div>
                <button class="booking_btn" onClick={booking}>Đặt ngay</button>
            </div>
        </div>
    )
}

export default RoomInfo;