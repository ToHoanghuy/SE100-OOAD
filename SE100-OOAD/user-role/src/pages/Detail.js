import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/Detail.css';
import GalleryPopUp from '../components/GalleryPopUp';
import BookingSearchBar from '../components/BookingSearchBar';
import RoomInfo from '../components/RoomInfo';
import { getIconClass, toggleFavorite, formatRating, formatPrice } from '../function/functionEffect';
import Boundary from '../components/Boundary';
import RatingBar from '../components/RatingBar';
import YourComment from '../components/YourComment';
import Comment from '../components/Comment';
import ChatPopUp from '../components/ChatPopUp';
import Swal from 'sweetalert2';

function Detail() {
    const { detailId } = useParams();
    const link = useLocation();

    const [location, setLocation] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [collections, setCollections] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [roomStatus, setRoomStatus] = useState('');
    const [ratings, setRatings] = useState([]);

    const [services, setServices] = useState([]);
    const [countReviews, setCountReviews] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [checkInDate, setCheckInDate] = useState([]);
    const [checkOutDate, setCheckOutDate] = useState([]);
    // const [selectedRoom, setSelectedRoom] = useState([]);

    const getDetailLocation = async () => {
        try {
            const response = await fetch(`http://localhost:3000/locationbyid/${detailId}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                setLocation(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getRooms = async () => {
        try {
            const response = await fetch(`http://localhost:3000/room/getbylocationid/${detailId}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                setRooms(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getService = async () => {
        try {
            const response = await fetch(`http://localhost:3000/service/location/${detailId}`);
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

    const getReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3000/review/location/${detailId}`);
            const result = await response.json();
    
            if (response.ok && result.isSuccess) {
                const reviews = result.data;
                setReviews(reviews);
                setCountReviews(reviews.length); // Gán tổng số đánh giá
    
                // Tính số lượng đánh giá cho từng mức sao
                const ratingCounts = [0, 0, 0, 0, 0]; // Mảng lưu số lượng đánh giá từ 1 đến 5 sao
                reviews.forEach(review => {
                    if (review.rating >= 1 && review.rating <= 5) {
                        ratingCounts[review.rating - 1] += 1; // Tăng số lượng đánh giá tương ứng
                    }
                });
    
                // Tính tỷ lệ phần trăm cho từng mức sao
                const totalReviews = reviews.length;
                const ratings = ratingCounts.map((count, index) => ({
                    index: index + 1, // Số sao
                    percentage: totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(0) : 0, // Tỷ lệ phần trăm
                }));
    
                setRatings(ratings); // Cập nhật state ratings
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getCollections = async () => {
        try {
            const response = await fetch(`http://localhost:3000/collection/getbyuserid/${localStorage.getItem("authToken")}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                setCollections(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getDetailLocation();
        getReviews();
        getService();
        getRooms();
        getCollections();
    }, []);

    const [isFavorited, setIsFavorited] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showChatPopUp, setChatPopUp] = useState(false);

    const [clickImg, setClickImg] = useState(0);

    const overviewInfoRef = useRef(null);
    const bookingRef = useRef(null);
    const customerReviewsRef = useRef(null);
    const scrollBoundaryRef = useRef(null);
    const choiceRoomRef = useRef(null);
    const [showMap, setShowMap] = useState(false);

    const handleMapClick = () => {
        setShowMap(true);
    };

    const handleCloseMap = () => {
        setShowMap(false);
    };

    const [boundary, setBoundary] = useState(1);


    const tongleChatPopUp = () => {
        setChatPopUp(!showChatPopUp);
        // document.body.style.overflow = 'hidden';
    };
    const closeChatPopUp = () => {
        setChatPopUp(false);
        // document.body.style.overflow = 'auto';
    };

    const closePopup = () => {
        setShowPopup(false);
        document.body.style.overflow = 'auto';
    };
    const openPopup = (index) => {
        setShowPopup(true);
        setClickImg(index);
        document.body.style.overflow = 'hidden'; // Tắt cuộn trang khi mở popup
    };

    const choiceRoom = () => {
        var targetPosition;
        targetPosition = choiceRoomRef.current.offsetTop - 2 * scrollBoundaryRef.current.offsetHeight;
        if (targetPosition) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    //Click đọc nhiều hơn
    const [expanded, setExpanded] = useState(false);
    const handleReadMoreClick = () => {
        setExpanded(prevState => !prevState);
    };

    //Render tình trạng phòng
    const [status, setStatus] = useState(null);
    // useEffect(() => {
    //     const statusValue = 1; // giả sử lấy giá trị này từ API hoặc dữ liệu động khác
    //     if (statusValue === 1) {
    //         setStatus({
    //             text: "Còn phòng",
    //             color: '#199904'
    //         });
    //     } else {
    //         setStatus({
    //             text: "Hết phòng",
    //             color: '#F24B4B'
    //         });
    //     }
    // }, []);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 550) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        // Cleanup listener khi component bị hủy
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const [quantity, setQuantity] = useState([]);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        var array = [];

        for (let i = 0; i < availableRooms.length; i++) {
            var select = { id: availableRooms[i]._id, name: availableRooms[i].name, price: availableRooms[i].pricePerNight, quantity_value: 0 };
            array.push(select)
        }
        setQuantity(array)
    }, [availableRooms]);

    const [total, setTotal] = useState(0);
    useEffect(() => {

        let totalPrice = 0;
        for (let i = 0; i < quantity.length; i++) {
            // alert('hi')
            totalPrice += (quantity[i].price * quantity[i].quantity_value)
        }
        if (totalPrice > 0) {
            setSelected(true);

        } else {
            setSelected(false);
        }
        setTotal(totalPrice)

    }, [quantity]);

    //Hàm để xử lí click vào boundary
    const handleBoundaryClick = (index) => {
        if (index) {
            var targetPosition;
            if (index == 1) targetPosition = overviewInfoRef.current.offsetTop;
            else if (index == 2) targetPosition = bookingRef.current.offsetTop - scrollBoundaryRef.current.offsetHeight;
            else if (index == 3) targetPosition = customerReviewsRef.current.offsetTop - scrollBoundaryRef.current.offsetHeight;
            if (targetPosition) {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            setBoundary(index)
        }
    };
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const queryParams = new URLSearchParams();

        quantity.forEach(item => {
            if (item.quantity_value > 0) {
                queryParams.append('id', item.id);
                queryParams.append('name', item.name);
                queryParams.append('price', item.price);
                queryParams.append('quantity_value', item.quantity_value);
            }
        });
        queryParams.append('checkin', checkInDate)
        queryParams.append('checkout', checkOutDate)
        queryParams.append('totalprice', total)
        queryParams.append('location', detailId)
        navigate(`/booking?${queryParams.toString()}`);
    };

    const [showModal, setShowModal] = useState(false);

    const handleClickCollection = () => {
        // alert('hi')
        setShowModal(!showModal)
    }
    const handleChoiceCollection = () => {
        alert('gọi API')
        // setShowModal(!showModal)
    }
    const [isInputVisible, setIsInputVisible] = useState(false); // Quản lý trạng thái hiển thị ô nhập
    const [collectionName, setCollectionName] = useState(''); // Quản lý giá trị ô nhập
    const containerRef = useRef(null);

    const handleClickCreate = () => {
        // Nếu có tên bộ sưu tập hợp lệ, thực hiện tạo
        if (collectionName.trim()) {
            Swal.fire({
                title: 'Bạn muốn tạo bộ sưu tập?',
                text: 'Vui lòng xác nhận',
                icon: 'question',
                showCancelButton: true,  // Hiển thị nút hủy
                confirmButtonText: 'Tạo', // Văn bản cho nút xác nhận
                cancelButtonText: 'Không', // Văn bản cho nút hủy
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Tiếp tục!', 'Tạo thành công', 'success');

                } else if (result.isDismissed) {
                    // Khi người dùng chọn "Không"
                    Swal.fire('Hủy bỏ!', 'Bạn đã chọn hủy bỏ', 'info');
                }
            });
            setIsInputVisible(false);
            setCollectionName(""); // Reset giá trị
        } else {
            setIsInputVisible(false);
            setCollectionName(""); // Reset giá trị
        }

    };
    const handleEnterCreate = () => {
        // Nếu có tên bộ sưu tập hợp lệ, thực hiện tạo
        if (collectionName.trim()) {
            Swal.fire('Tiếp tục!', 'Tạo thành công', 'success');
            setIsInputVisible(false);
            setCollectionName(""); // Reset giá trị
        }
    };

    const handleKeyDown = (e) => {
        // Chỉ gọi handleCreate khi nhấn Enter
        if (e.key === 'Enter') {
            handleEnterCreate();
        }
    };

    const handleInputChange = (e) => {
        if (e.key !== 'Enter') {
            setCollectionName(e.target.value);
        }
    };


    if (location) {
        return (
            <div className='root_detail'>
                <Helmet>
                    <title>Travel Social | {location.name || ''} </title>
                </Helmet>
                <div className="chat_button"
                    onClick={() => tongleChatPopUp()}
                >
                    <i className="fa-solid fa-comment-dots"></i>
                </div>
                <div
                    ref={scrollBoundaryRef}
                    className="scroll_boundary"
                    style={{
                        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                        // transition: "transform 0.3s ease-in-out", 
                    }}>
                    <Boundary boundary={boundary} onBoundaryClick={handleBoundaryClick} />
                </div>
                {showPopup && <GalleryPopUp name={location.name} images={location?.image} closePopup={closePopup} clickImg={clickImg} />}
                {showChatPopUp && <ChatPopUp closeChatPopUp={closeChatPopUp} />}
                <div className="detail_bar_container">
                    <div className="breadcrumb_container">
                        <a className="breadcrumb_ele">Trang Chủ</a>
                        {/* <i className="fa-solid fa-angle-right breadcrumb_angle"></i>
                    <a className="breadcrumb_ele">{detail.province}</a> */}
                        <i className="fa-solid fa-angle-right breadcrumb_angle current_breadcumb"></i>
                        <a className="breadcrumb_ele current_breadcumb">{location.name}</a>
                    </div>
                    <Boundary boundary={boundary} onBoundaryClick={handleBoundaryClick} />
                </div>

                <div className="overview_info_container" ref={overviewInfoRef}>
                    <div className="display_frame">
                        <div className="travel_title_container OpacityEffect">
                            <span className="place_name">{location.name}</span>
                            <div className="travel_title_info">
                                <img src="/images/logo/Location.png" />
                                <span className="detail_text">{location.address}</span>
                            </div>
                            <div className="travel_title_info">
                                <i className="fa-solid fa-star"></i>
                                <span className="detail_text">{formatRating(location.rating)} ( Reviews)</span>
                            </div>
                            <div className="overview_function_btn">
                                <button className="heart_btn" onClick={handleClickCollection}>
                                    <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
                                </button>
                                {showModal &&
                                    <div className='collection_pop_up'>
                                        {/* <div className='collection_pop_up_title'>chọn bộ sưu tập</div> */}
                                        <ul>
                                            <li className='add_new_collection_li'>
                                                <div className='add_new_collection'
                                                    onClick={!isInputVisible ? () => setIsInputVisible(true) : null}
                                                >
                                                    {!isInputVisible && (
                                                        <>
                                                            <i className="fa-solid fa-plus"></i>
                                                            <span>Bộ sưu tập mới</span>
                                                        </>
                                                    )}
                                                    {isInputVisible && (
                                                        <
                                                            input
                                                            type="text"
                                                            autoFocus
                                                            placeholder="Nhập tên"
                                                            value={collectionName}
                                                            onChange={handleInputChange}
                                                            onBlur={handleClickCreate} // Xử lý khi click ra ngoài
                                                            onKeyDown={handleKeyDown} // Xử lý khi nhấn Enter
                                                        />
                                                    )}
                                                </div>
                                            </li>
                                            {collections.map((ele, index) => (
                                                <li >
                                                    <i class="fa-regular fa-circle" onClick={handleChoiceCollection}></i>
                                                    <span>{ele.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                <button className="booking_btn" onClick={() => handleBoundaryClick(2)}>Đặt ngay</button>
                            </div>
                        </div>
                        <div className="gallery_container">

                            <div className="main_pic">
                                <img className="place_img OpacityEffect" src={location?.image?.[0]?.url || '/images/default_location_img.jpg'}
                                    // onClick={() => openPopup(0)} 
                                    onClick={location?.image?.[0]?.url ? () => openPopup(0) : undefined}
                                />
                            </div>
                            <div className="side_pic">
                                <img className="place_img OpacityEffect" src={location?.image?.[1]?.url || '/images/default_location_img.jpg'}
                                    onClick={location?.image?.[1]?.url ? () => openPopup(1) : undefined}
                                />
                                <img className="place_img OpacityEffect" src={location?.image?.[2]?.url || '/images/default_location_img.jpg'}
                                    onClick={location?.image?.[2]?.url ? () => openPopup(2) : undefined}
                                />
                            </div>
                            <div className="below_pic">
                                <img className="place_img OpacityEffect" src={location?.image?.[3]?.url || '/images/default_location_img.jpg'}
                                    onClick={location?.image?.[3]?.url ? () => openPopup(3) : undefined}
                                />
                                <img className="place_img OpacityEffect" src={location?.image?.[4]?.url || '/images/default_location_img.jpg'}
                                    onClick={location?.image?.[4]?.url ? () => openPopup(4) : undefined}
                                />
                                <img className="place_img OpacityEffect" src={location?.image?.[5]?.url || '/images/default_location_img.jpg'}
                                    onClick={location?.image?.[5]?.url ? () => openPopup(5) : undefined}
                                />
                                <img className="place_img OpacityEffect" src={location?.image?.[6]?.url || '/images/default_location_img.jpg'}
                                    onClick={location?.image?.[6]?.url ? () => openPopup(6) : undefined}
                                />
                                <img className="place_img OpacityEffect" src={location?.image?.[7]?.url || '/images/default_location_img.jpg'}
                                    onClick={location?.image?.[7]?.url ? () => openPopup(7) : undefined}
                                />
                            </div>
                        </div>

                        <div className="other_info_container OpacityEffect">
                            <div className="top_other_info_container">

                            </div>
                            <div className="map_container">

                                <img style={{ cursor: "pointer", width: "100%", height: "auto" }} onClick={handleMapClick} src="/images/map.png" />
                            </div>
                        </div>
                        <div className="overview_service_container OpacityEffect">
                            {services.map((service, index) => (
                                <div key={index} className="overview_service_item service_ele">
                                    <i className={getIconClass(service.name)}></i>
                                    <span className="service_name">
                                        {service.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="desc_container OpacityEffect">
                            <div className={`description ${expanded ? 'expanded' : ''}`}>
                                {location.description}
                            </div>
                            <div className="readmore-btn" onClick={handleReadMoreClick}>
                                <span>{expanded ? 'Show less' : 'Read more'}</span>
                                <i className={`fa-solid ${expanded ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="booking_container" ref={bookingRef}>
                    <div className="display_frame">
                        <h2 className="detail_container_tilte OpacityEffect">Thông tin phòng trống</h2>
                        <BookingSearchBar setRooms={setAvailableRooms} setRoomStatus={setRoomStatus} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} />

                        {roomStatus &&
                            <div className="room_status">
                                <span className="room_status_text">Tình trạng:</span>
                                <span className={roomStatus === 'Còn phòng' ? 'available' : 'sold_out'}>
                                    {roomStatus}
                                </span>
                            </div>
                        }
                        <div className="room_info_container">
                            {/* <RoomInfo services={detail.services} />
                            <RoomInfo services={detail.services} /> */}
                            {availableRooms.map((room, index) => (
                                <RoomInfo
                                    key={index}
                                    room={room}
                                    quantityRoom={quantity}
                                    setQuantityRoom={setQuantity}
                                    choiceRoom={choiceRoom}
                                />
                            ))}
                            <div ref={choiceRoomRef}>
                                {selected &&

                                    <div className='choice_room' >
                                        <div className='choice_room_header'>Phòng đã chọn</div>
                                        <div className='choice_room_body'>
                                            <div className='choice_room_left'>
                                                {quantity.map((room, index) => (
                                                    // Kiểm tra điều kiện
                                                    room.quantity_value > 0 && (
                                                        <div key={index} className='choice_room_ele'>
                                                            <span className='room_name'>{room.name}</span>
                                                            <span className='choice_room_quantity'>{room.quantity_value} phòng</span>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                            <div className='choice_room_right'>
                                                <span class="total_price_value">VNĐ {formatPrice(total)}</span>
                                                <button onClick={handleSubmit} type='submit' class="create_booking_btn">Đặt ngay</button>
                                            </div>
                                        </div>
                                    </div>

                                } </div>
                        </div>
                    </div>
                </form>
                <div className="customer_reviews_container" ref={customerReviewsRef}>
                    <div className="display_frame">
                        <h2 className="detail_container_tilte OpacityEffect">Đánh giá của khách hàng</h2>
                        <div className="rating_container OpacityEffect">
                            <div className="rating_overview OpacityEffect">
                                <span className="raiting_value">{formatRating(location.rating)}</span>
                                {/* <div className="raiting_star">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </div> */}
                                <div className="raiting_star">
                                    {Array.from({ length: 5 }, (_, index) => {
                                        if (index < Math.floor(location.rating)) {
                                            // Hiển thị sao đầy (solid)
                                            return <i key={index} className="fa-solid fa-star"></i>;
                                        } else if (index < location.rating) {
                                            // Hiển thị sao nửa (half)
                                            return <i key={index} className="fa-solid fa-star-half-stroke"></i>;
                                        } else {
                                            // Hiển thị sao rỗng (regular)
                                            return <i key={index} className="fa-regular fa-star"></i>;
                                        }
                                    })}
                                </div>
                                <span className="number_of_reviews">{countReviews} lượt đánh giá</span>
                            </div>
                            <div className="rating_detail">
                                {ratings.map((rating, index) => (
                                    <RatingBar key={index} value={rating.index} percentage={rating.percentage} />
                                ))}
                            </div>
                        </div>
                        <div className="comment_container">
                            <YourComment />
                            {reviews.map((review, index) => (
                                <Comment
                                    key={index}
                                    review={review}
                                />
                            ))}
                            <button className="show_more_comment OpacityEffect">Xem thêm đánh giá khác
                            </button>
                        </div>
                    </div>
                </div>
                {showMap && (
                    <div className="modal_overlay" onClick={handleCloseMap}>
                        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31383.239171865847!2d107.48594181070591!3d10.508156585966674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175bd73c30f60a1%3A0x951e30bb705cd7c3!2zTcOAVSBDYW1waW5nIC0gQ-G6r20gVHLhuqFpIEjhu5MgQ-G7kWM!5e0!3m2!1sen!2s!4v1736102711020!5m2!1sen!2s"
                                width="1000"
                                height="650"
                                allowFullScreen
                                loading="lazy"
                                style={{ border: 0 }}
                            ></iframe>
                            <button style={{ cursor: "pointer", width: "100%", height: "auto" }} onClick={handleCloseMap} >
                                Close Map
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default Detail;