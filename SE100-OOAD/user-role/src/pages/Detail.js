import React, { useState, useRef, useEffect } from 'react';
import '../styles/Detail.css';
import GalleryPopUp from '../components/GalleryPopUp';
import BookingSearchBar from '../components/BookingSearchBar';
import RoomInfo from '../components/RoomInfo';
import { getIconClass, toggleFavorite } from '../function/functionEffect';
import Boundary from '../components/Boundary';
import RatingBar from '../components/RatingBar';
import YourComment from '../components/YourComment';
import Comment from '../components/Comment';

function Detail() {

    const [isFavorited, setIsFavorited] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [clickImg, setClickImg] = useState(0);
    const overviewInfoRef = useRef(null);
    const bookingRef = useRef(null);
    const customerReviewsRef = useRef(null);
    const scrollBoundaryRef = useRef(null);
    const [boundary, setBoundary] = useState(1);

    const detailData = [
        {
            name: "The Sóng Apartment - Bear Homestay Vũng Tàu",
            address: "28 Đường Thi Sách, Vũng Tàu, Việt Nam",
            province: "Vũng Tàu",
            raiting: 4.5,
            reviews: 355,
            services: [
                { id: 1, name: 'Wifi miễn phí' },
                { id: 2, name: 'Nhà hàng' },
                { id: 3, name: 'Bồn tắm' },
                { id: 4, name: 'Hồ bơi' },
                { id: 5, name: 'Gần biển' },
            ],
            images: [
                "/images/detail/detail1.jpg",
                "/images/detail/detail2.jpg",
                "/images/detail/detail3.jpg",
                "/images/detail/detail4.jpg",
                "/images/detail/detail5.jpg",
                "/images/detail/detail6.jpg",
                "/images/detail/detail7.jpg",
                "/images/detail/detail8.jpg",
                "/images/detail/detail9.jpg",
                "/images/detail/detail10.jpg",
                "/images/detail/detail11.jpg",
                "/images/detail/detail12.jpg",
                "/images/detail/detail13.jpg",
                "/images/detail/detail14.jpg",
                "/images/detail/detail15.jpg",
                "/images/detail/detail16.jpg"
            ]
        }
    ];

    const ratings = [
        { value: 5, percentage: 50 },
        { value: 4, percentage: 60 },
        { value: 3, percentage: 30 },
        { value: 2, percentage: 0 },
        { value: 1, percentage: 0 },
    ];

    const comments = [
        {
            userName: "Bé Nghĩa nè",
            userRating: 3,
            commentContent:
                "adssssssssssssssssssss fdsfdssdfsdf",
            avatarSrc: "/images/avt.jpg",
        },
        {
            userName: "Bé Nghĩa nè",
            userRating: 4,
            commentContent:
                "The location was perfect. The staff was friendly. Our bed was comfy. The pool was fresh with a great view. The breakfast was delicious! We had a hot tub on our balcony which was awesome.",
            avatarSrc: "/images/avt.jpg",
        },
        // Thêm các bình luận khác ở đây
    ];

    const closePopup = () => {
        setShowPopup(false);
        document.body.style.overflow = 'auto';
    };
    const openPopup = (index) => {
        setShowPopup(true);
        setClickImg(index);
        document.body.style.overflow = 'hidden'; // Tắt cuộn trang khi mở popup
    };

    //Click đọc nhiều hơn
    const [expanded, setExpanded] = useState(false);
    const handleReadMoreClick = () => {
        setExpanded(prevState => !prevState);
    };

    //Render tình trạng phòng
    const [status, setStatus] = useState(null);
    useEffect(() => {
        const statusValue = 1; // giả sử lấy giá trị này từ API hoặc dữ liệu động khác
        if (statusValue === 1) {
            setStatus({
                text: "Còn phòng",
                color: '#199904'
            });
        } else {
            setStatus({
                text: "Hết phòng",
                color: '#F24B4B'
            });
        }
    }, []);

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

    const detail = detailData[0];
    return (
        <div className='root_detail'>
            <div
                ref={scrollBoundaryRef}
                className="scroll_boundary"
                style={{
                    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                    // transition: "transform 0.3s ease-in-out", 
                }}>
                <Boundary boundary={boundary} onBoundaryClick={handleBoundaryClick} />
            </div>
            {showPopup && <GalleryPopUp images={detail.images} closePopup={closePopup} clickImg={clickImg} />}
            <div class="detail_bar_container">
                <div class="breadcrumb_container">
                    <a class="breadcrumb_ele">Trang Chủ</a>
                    <i class="fa-solid fa-angle-right breadcrumb_angle"></i>
                    <a class="breadcrumb_ele">{detail.province}</a>
                    <i class="fa-solid fa-angle-right breadcrumb_angle current_breadcumb"></i>
                    <a class="breadcrumb_ele current_breadcumb">{detail.name}</a>
                </div>
                <Boundary boundary={boundary} onBoundaryClick={handleBoundaryClick} />
            </div>
            <div class="overview_info_container" ref={overviewInfoRef}>
                <div class="display_frame">
                    <div class="travel_title_container OpacityEffect">
                        <span class="place_name">{detail.name}</span>
                        <div class="travel_title_info">
                            <img src="/images/logo/Location.png" />
                            <span class="detail_text">{detail.address}</span>
                        </div>
                        <div class="travel_title_info">
                            <i class="fa-solid fa-star"></i>
                            <span class="detail_text">{detail.raiting} ({detail.reviews} Reviews)</span>
                        </div>
                        <div class="overview_function_btn">
                            <button className="heart_btn"  onClick={() => toggleFavorite(isFavorited, setIsFavorited)}>
                                <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
                            </button>
                            <button class="booking_btn" onClick={() => handleBoundaryClick(2)}>Đặt ngay</button>
                        </div>
                    </div>
                    <div class="gallery_container">
                        <div class="main_pic">
                            <img class="place_img OpacityEffect" src={detail.images[0]} onClick={() => openPopup(0)} />
                        </div>
                        <div class="side_pic">
                            <img class="place_img OpacityEffect" src={detail.images[1]} onClick={() => openPopup(1)} />
                            <img class="place_img OpacityEffect" src={detail.images[2]} onClick={() => openPopup(2)} />
                        </div>
                        <div class="below_pic">
                            <img class="place_img OpacityEffect" src={detail.images[3]} onClick={() => openPopup(3)} />
                            <img class="place_img OpacityEffect" src={detail.images[4]} onClick={() => openPopup(4)} />
                            <img class="place_img OpacityEffect" src={detail.images[5]} onClick={() => openPopup(5)} />
                            <img class="place_img OpacityEffect" src={detail.images[6]} onClick={() => openPopup(6)} />
                            <img class="place_img OpacityEffect" src={detail.images[7]} onClick={() => openPopup(7)} />
                        </div>
                    </div>
                    <div class="other_info_container OpacityEffect">
                        <div class="top_other_info_container">

                        </div>
                        <div class="map_container">
                            <img src="/images/map.png" />
                        </div>
                    </div>
                    <div class="overview_service_container OpacityEffect">
                        {detail.services.map((service, index) => (
                            <div key={index} className="overview_service_item service_ele">
                                <i className={getIconClass(service.id)}></i>
                                <span className="service_name">
                                    {service.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="desc_container OpacityEffect">
                        <div className={`description ${expanded ? 'expanded' : ''}`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero.
                            <br />
                            Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum.
                        </div>
                        <div className="readmore-btn" onClick={handleReadMoreClick}>
                            <span>{expanded ? 'Show less' : 'Read more'}</span>
                            <i className={`fa-solid ${expanded ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="booking_container" ref={bookingRef}>
                <div class="display_frame">
                    <h2 class="detail_container_tilte OpacityEffect">Thông tin phòng trống</h2>
                    <BookingSearchBar />

                    <div class="room_status OpacityEffect">
                        <span class="room_status_text">Tình trạng:</span>
                        <span className="room_status_value" style={{ color: status?.color }}>
                            {status?.text}
                        </span>
                    </div>
                    <div class="room_info_container">
                        <RoomInfo services={detail.services} />
                        <RoomInfo services={detail.services} />
                    </div>
                </div>
            </div>
            <div class="customer_reviews_container" ref={customerReviewsRef}>
                <div class="display_frame">
                    <h2 class="detail_container_tilte OpacityEffect">Đánh giá của khách hàng</h2>
                    <div class="rating_container OpacityEffect">
                        <div class="rating_overview OpacityEffect">
                            <span class="raiting_value">4.0</span>
                            <div class="raiting_star">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <span class="number_of_reviews">100 lượt đánh giá</span>
                        </div>
                        <div class="rating_detail">
                            {ratings.map((rating, index) => (
                                <RatingBar key={index} value={rating.value} percentage={rating.percentage} />
                            ))}
                        </div>
                    </div>
                    <div class="comment_container">
                        <YourComment />
                        {comments.map((comment, index) => (
                            <Comment
                                key={index}
                                userName={comment.userName}
                                userRating={comment.userRating}
                                commentContent={comment.commentContent}
                                avatarSrc={comment.avatarSrc}
                            />
                        ))}
                        <button class="show_more_comment OpacityEffect">Xem thêm đánh giá khác
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;