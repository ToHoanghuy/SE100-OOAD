import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DateTimeBar from '../components/DateTimeBar';
import QuantityBar from '../components/QuantityBar';
import Swal from "sweetalert2";

function BookingSearchBar({ setRooms, setRoomStatus, setCheckInDate, setCheckOutDate }) {
    const { detailId } = useParams();

    const [showOptions, setShowOptions] = useState([false, false]); // Mảng trạng thái cho các dropdown
    const selectionOptionRefs = useRef([]); // Mảng ref cho selectionOption
    const selectionBtnRefs = useRef([]); // Mảng ref cho selectionBtn

    const [searchTerm, setSearchTerm] = useState([]);

    const [inputFrom, setInputFrom] = React.useState('');
    const [inputTo, setInputTo] = React.useState('');

    const [bookings, setBookings] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    // const [alreadyBookings, setAlreadyBookings] = useState([]);


    // const getRooms = async (alreadyBookings) => {
    //     console.log('data lọc: ', alreadyBookings);
    //     try {
    //         const response = await fetch(`http://localhost:3000/room/getbylocationid/${detailId}`);
    //         const result = await response.json();

    //         if (response.ok && result.isSuccess) {
    //             var available=[];
    //             for(let i=0;i< result.data.length; i++)
    //             {
    //                 // console.log('room: ', alreadyBookings[0])
    //                 var quantity=0;
    //                 for(let j=0;j <alreadyBookings.length;j++)
    //                 {
    //                     // console.log('go', alreadyBookings[j].items)
    //                     for(let l=0;l<alreadyBookings[j].items.length;l++)
    //                     {
    //                         if(result.data[i]._id===alreadyBookings[j].items[l].roomId)
    //                         {
    //                             quantity = quantity+alreadyBookings[j].items[l].quantity

    //                         }
    //                     }
    //                 }
    //                 console.log('go', quantity)
    //                 if(result.data[i].quantity-quantity >0) available.push(result.data[i])
    //             }
    //             // console.log('available ', available)
    //             // setAvailableRooms(available)
    //             setRooms(available)
    //             if(available.length>0) setRoomStatus('Còn phòng')
    //             else setRoomStatus('Hết phòng')
    //         } else {
    //             console.error(result.error || 'Failed to fetch data');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // const getBookings = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/booking/getbylocationid/${detailId}`);
    //         const result = await response.json();
    //         if (response.ok && result.isSuccess) {
    //             const bookingData=result.data;
    //             console.log('data: ', bookingData);
    //             setBookings(result.data);  // Gán dữ liệu vào state

    //             var userCheckin = new Date(inputFrom);
    //             userCheckin.setHours(userCheckin.getHours() + 13);
    //             var userCheckout = new Date(inputTo);
    //             userCheckout.setHours(userCheckout.getHours() + 12);

    //             const filteredBookings = bookingData.filter(booking => 
    //                 (userCheckin >= new Date(booking.checkinDate) && userCheckin <= new Date(booking.checkoutDate)) ||
    //                 (userCheckout >= new Date(booking.checkinDate) && userCheckout <= new Date(booking.checkoutDate))
    //             );
    //             // console.log('data lọc: ', filteredBookings);
    //             getRooms(filteredBookings);
    //             // setAlreadyBookings(filteredBookings);
    //             // for(let i=0; i< bookingData.length;i++)
    //             // {
    //             //     console.log('test', bookingData[0])
    //             // }
    //         } else {
    //             console.error(result.error || 'Failed to fetch data');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    const getRooms = async (alreadyBookings) => {
        // console.log('Dữ liệu lọc: ', alreadyBookings);
        try {
            const response = await fetch(`http://localhost:3000/room/getbylocationid/${detailId}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                // const availableRooms = result.data.filter(room => {
                //     const bookedQuantity = alreadyBookings.reduce((total, booking) => {
                //         const roomQuantity = booking.items.reduce((itemTotal, item) => {
                //             return item.roomId === room._id ? itemTotal + item.quantity : itemTotal;
                //         }, 0);
                //         return total + roomQuantity;
                //     }, 0);

                //     return room.quantity - bookedQuantity > 0;
                // });

                const availableRooms = result.data
                    .map(room => {
                        const bookedQuantity = alreadyBookings.reduce((total, booking) => {
                            const roomQuantity = booking.items.reduce((itemTotal, item) => {
                                return item.roomId === room._id ? itemTotal + item.quantity : itemTotal;
                            }, 0);
                            return total + roomQuantity;
                        }, 0);

                        // Tính số lượng phòng còn lại
                        const remainingQuantity = room.quantity - bookedQuantity;

                        // Trả về phòng với số lượng còn lại (nếu có)
                        return remainingQuantity > 0
                            ? { ...room, quantity: remainingQuantity }
                            : null;
                    })
                    .filter(room => room !== null);

                console.log('Room: ', availableRooms)
                setRooms(availableRooms);

                setRoomStatus(availableRooms.length > 0 ? 'Còn phòng' : 'Hết phòng');
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getBookings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/booking/getbylocationid/${detailId}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                const bookingData = result.data;
                console.log('Dữ liệu: ', bookingData);

                const userCheckin = new Date(inputFrom);
                userCheckin.setHours(userCheckin.getHours() + 13);
                
                const userCheckout = new Date(inputTo);
                userCheckout.setHours(userCheckout.getHours() + 12);

                setCheckInDate(userCheckin.toISOString())
                setCheckOutDate(userCheckout.toISOString())
                const filteredBookings = bookingData.filter(booking =>
                    (userCheckin >= new Date(booking.checkinDate) && userCheckin <= new Date(booking.checkoutDate)) ||
                    (userCheckout >= new Date(booking.checkinDate) && userCheckout <= new Date(booking.checkoutDate))
                );

                getRooms(filteredBookings);
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleSearch = () => {
        if (inputFrom && inputTo) {
            getBookings();
        }
        else {
            // alert('Bạn phải nhập cả ngày đến và ngày về')
            Swal.fire({
                title: 'Tìm kiếm thất bại',
                text: 'Bạn phải nhập cả ngày đến và ngày về!',
                icon: 'error',
                confirmButtonText: 'Tiếp tục',
                customClass: {
                    confirmButton: 'custom_swal_button' 
                }
            });
        }
    };

    const toggleOption = (index) => {
        setShowOptions(prevState => {
            const newState = [...prevState];

            newState.forEach((_, i) => {
                if (i !== index) {
                    selectionOptionRefs.current[i].style.display = 'none';
                    newState[i] = false; // Đóng dropdown ở các index khác
                }
            });

            newState[index] = !newState[index]; // Đảo ngược trạng thái cho index cụ thể
            if (selectionOptionRefs.current[index]) {
                if (newState[index]) {
                    // Khi mở dropdown
                    selectionOptionRefs.current[index].style.display = 'block';
                    const rect = selectionBtnRefs.current[index].getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    if (rect.bottom > windowHeight / 2) {
                        //option xuất hiện trên btn
                        selectionOptionRefs.current[index].style.top = 'auto';
                        selectionOptionRefs.current[index].style.bottom = `calc(100% + 10px)`; // Cách button 10px
                        const icon = selectionBtnRefs.current[index].querySelector('.fa-solid.fa-angle-down');
                        if (icon) {
                            icon.classList.remove("fa-angle-down");
                            icon.classList.add("fa-angle-up");
                        }
                    } else {
                        selectionOptionRefs.current[index].style.bottom = 'auto';
                        selectionOptionRefs.current[index].style.top = `calc(100% + 5px)`; // Cách button 5px
                        const icon = selectionBtnRefs.current[index].querySelector('.fa-solid.fa-angle-up');
                        if (icon) {
                            icon.classList.remove("fa-angle-up");
                            icon.classList.add("fa-angle-down");
                        }
                    }
                } else {
                    // Khi đóng dropdown
                    selectionOptionRefs.current[index].style.display = 'none';
                }
            }
            return newState; // Trả về trạng thái mới
        });
    };

    //dùng useEffect để khi click vào bất kì vị trí trong window để ẩn selection option
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInside = event.target.closest('.selection_btn');
            const dateTime = event.target.closest('.date_time .selection_option');
            // Nếu click ra ngoài .selection_btn và .selection_option
            if (!isClickInside && !dateTime) {
                setShowOptions(prevState => {
                    const newState = [...prevState];
                    newState.forEach((_, i) => {
                        // alert('hi');
                        selectionOptionRefs.current[i].style.display = 'none';
                        newState[i] = false; // Đóng dropdown ở các index khác
                    });
                    return newState;
                });
            }
        };
        // Thêm sự kiện khi component được mount
        document.addEventListener('click', handleClickOutside);
        // Dọn dẹp sự kiện khi component bị unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // if(inputFrom)console.log('from :', new Date(inputFrom).toISOString())
        // if(inputTo)console.log('to :', new Date(inputTo).toISOString())

        // if(inputFrom && inputTo)
        // {
        //     const from = new Date(inputFrom);
        //     from.setHours(from.getHours() + 13);
        //     const to = new Date(inputTo);
        //     to.setHours(to.getHours() + 12);

        //     console.log('from :', new Date(from).toLocaleString())
        //     console.log('to :', new Date(to).toLocaleString())
        // }

        // console.log('to :', new Date('2024-12-30T14:00:00.000Z').toLocaleString())

        // console.log('from :', inputFrom)
        // console.log('to :', inputTo)

    }, [inputFrom, inputTo]);
    // console.log('from :', new Date('2024-12-28T10:00:00.000Z').getTime())

    return (
        <div className="booking_search_bar OpacityEffect">
            <DateTimeBar
                setFrom={setInputFrom}
                setTo={setInputTo}
                toggleOption={() => toggleOption(0)}
                showOptions={showOptions[0]}
                selectionBtnRef={(el) => selectionBtnRefs.current[0] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[0] = el} // Gán ref động cho selectionOption
            />
            <QuantityBar
                toggleOption={() => toggleOption(1)}
                showOptions={showOptions[1]}
                selectionBtnRef={(el) => selectionBtnRefs.current[1] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[1] = el} // Gán ref động cho selectionOption
            />
            <button class="booking_search_btn" onClick={handleSearch}>Tìm kiếm</button>
        </div>
    );

};

export default BookingSearchBar;