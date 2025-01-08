import React, { useState, useRef, useEffect } from 'react';
import { getFacilityIconClass } from '../function/functionEffect';
import { formatPrice } from '../function/formatPrice';
import Swal from "sweetalert2";

function RoomInfo({ room, quantityRoom, setQuantityRoom, choiceRoom }) {
    const [quantity, setQuantity] = useState(0);
    // const maxRooms = 3; // Số phòng trống
    // const price=  ''
    // const getRoom = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/user/getbyid/${localStorage.getItem("authToken")}`);
    //         const data = await response.json();
    //         // console.log('User :',data.data)
    //         if (data.isSuccess) {
    //             setUser(data.data);
    //         } else {
    //             console.error(data.error);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         // setLoading(false);
    //     }
    // };
    // console.log(room.facility)


    const increment = () => {
        if (quantity < room.quantity) {
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
            if (value > room.quantity) {
                // alert(room.quantity)
                value = room.quantity;
            }
            setQuantity(value);
        }
    };

    const booking = () => {
        // if(quantity ==0)
        // {
        //     Swal.fire({
        //         title: 'Chọn phòng thất bại',
        //         text: 'Bạn chưa chọn số lượng!',
        //         icon: 'error',
        //         confirmButtonText: 'Tiếp tục',
        //         customClass: {
        //             confirmButton: 'custom_swal_button' 
        //         }
        //     });
        // }else{
        console.log('ok: ', quantityRoom)
        setQuantityRoom(quantityRoom.map(ele =>
            ele.id === room._id ? { ...ele, quantity_value: quantity } : ele
        ));
        if(quantity >0)
        {
            choiceRoom()
        }
        // }

    };

    return (
        <div class="room_info">
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
                        <i class="fa-solid fa-hand-holding-heart"></i>Tiện nghi
                    </span>
                    <div class="room_service_detail">
                        {room.facility.map((facility, index) => (
                            <div class="room_service_item service_ele">
                                <i className={getFacilityIconClass(facility.name)}></i>
                                <span class="service_name">{facility.name}</span>
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
                        <span className="vacant_room">Còn {room.quantity} phòng trống</span>
                    </div>
                </div>
            </div>
            <div class="book_now">
                <div className='room_name'>
                    <i class="fa-solid fa-door-open"></i>
                    {room.name}</div>
                <div class="room_price">
                    <span class="room_price_text">Giá</span>
                    <span class="room_price_value">VNĐ {formatPrice(room.pricePerNight)}</span>
                    <button class="booking_btn" onClick={booking}>Chọn</button>
                </div>
                {/* <button class="booking_btn" onClick={booking}>Đặt ngay</button> */}
            </div>
        </div>
    )
}

export default RoomInfo;