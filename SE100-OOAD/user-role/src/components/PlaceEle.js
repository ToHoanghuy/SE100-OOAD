import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../function/formatPrice';
import { toggleFavorite, formatRating, getIconClass, renderStars } from '../function/functionEffect';

// function PlaceEle({ name, imgSrc, pro, rating, reviews, discount, originalPrice, discountPrice, favrorited,path }) {
//     const [isFavorited, setIsFavorited] = useState(favrorited);

//     return (
//         <Link to={`/detail/${path}`} className='place_ele OpacityEffect'>
//             <div className='place_ele_img'>
//                 <img src={imgSrc} />
//                 <div className='place_ele_heart' onClick={(e) => toggleFavorite(isFavorited, setIsFavorited, e)}>
//                     {/* <i class="fa-solid fa-heart"></i> */}
//                     <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
//                 </div>
//             </div>
//             <div className='place_ele_detail'>
//                 <div className='place_ele_detail_left_side'>
//                     <span className='place_ele_name'>{name}</span>
//                     <div className='place_ele_star'>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-regular fa-star"></i>
//                     </div>
//                     <div className='place_ele_province'>
//                         <i className="fa-solid fa-location-dot"></i>
//                         <span>{pro}</span>
//                     </div>
//                     <div className='place_ele_service_frame'>
//                         <div className='place_service_ele'>
//                             <span>1 phòng ngủ</span>
//                         </div>
//                         <div className='place_service_ele'>
//                             <span>1 phòng bếp</span>
//                         </div>
//                         <div className='place_service_ele'>
//                             <span>Ban công</span>
//                         </div>
//                         <div className='place_service_ele'>
//                             <span>16m2</span>
//                         </div>
//                         <div className='place_service_ele'>
//                             <span>1 giường đôi</span>
//                         </div>
//                         <div className='place_service_ele'>
//                             <span>wifi 24/7</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='place_ele_detail_right_side'>
//                     <div className='place_ele_raiting'>
//                         <div className='place_ele_review'>
//                             <span className='place_ele_rank'>Tốt</span>
//                             <span className='place_ele_number_of_reivews'>{reviews} đánh giá</span>
//                         </div>
//                         <span className='place_ele_raiting_value'>{rating}</span>
//                     </div>
//                     <div className='place_ele_booking'>
//                         <div className='place_ele_discount_frame'>
//                             <del className='place_ele_original_price'>VNĐ {formatPrice(originalPrice)}</del>
//                             <div className='place_ele_discount_value'>{discount}%</div>
//                         </div>
//                         <span className='place_ele_discount_price'>VNĐ {formatPrice(discountPrice)}</span>
//                         <button className='place_ele_btn'>Đặt phòng</button>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

function PlaceEle({ ele, showHeart, path, favrorited }) {
    const [isFavorited, setIsFavorited] = useState(favrorited);
    const [minPrice, setMinPrice] = useState('')
    const [rooms, setRooms] = useState([]);
    const [location, setLocation] = useState([]);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);

    // useEffect(() => {
    //     window.scrollTo(0, 0.5);
    //     window.scrollTo(0, 0);
    // }, []);

    const getRooms = async () => {
        try {
            const response = await fetch(`http://localhost:3000/room/getbylocationid/${ele._id}`);
            const data = await response.json();
            if (data.isSuccess) {
                setRooms(data.data);
            } else {
                // console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    };
    const getLocation = async () => {
        try {
            const response = await fetch(`http://localhost:3000/locationbyid/${path}`);
            const data = await response.json();
            if (data.isSuccess) {
                console.log('location: ', data.data);
                setLocation(data.data);
            } else {
                // console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    };
    const getServices = async () => {
        try {
            const response = await fetch(`http://localhost:3000/service/location/${path}`);
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
            const response = await fetch(`http://localhost:3000/review/location/${path}`);
            const result = await response.json();
            if (response.ok && result.isSuccess) {
                setReviews(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);

    useEffect(() => {
        getServices();
        getReviews();
        getLocation();

    }, [rooms]);

    useEffect(() => {
        if (rooms) {
            if (rooms?.length > 0) {
                const minPriceValue = Math.min(...rooms.map(room => room.pricePerNight));
                setMinPrice(minPriceValue);
            }
        }

    }, [rooms]);

    return (
        <Link to={`/detail/${path}`} className='place_ele OpacityEffect'>
            <div className='place_ele_img'>
                <img src={location.image?.[0]?.url} />

                <div className='place_ele_heart' onClick={(e) => toggleFavorite(isFavorited, setIsFavorited, e)}>
                    <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
                </div>

            </div>
            <div className='place_ele_detail'>
                <div className='place_ele_detail_left_side'>
                    <span className='place_ele_name'>{location.name}</span>
                    <div className='place_ele_star'>
                        {/* <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i> */}
                        {renderStars(location.rating || [])}
                    </div>
                    <div className='place_ele_province'>
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{location.address}</span>
                    </div>
                    <div className='place_ele_service_frame'>
                        {/* services. */}
                        {services.map((service, index) => (
                            <div key={index} className="place_service_ele">
                                <i className={getIconClass(service?.name)}></i>
                                <span>
                                    {service?.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='place_ele_detail_right_side'>
                    <div className='place_ele_raiting'>
                        <div className='place_ele_review'>
                            <span className='place_ele_rank'>Tốt</span>
                            <span className='place_ele_number_of_reivews'>{reviews?.length || 0} đánh giá</span>
                        </div>
                        <span className='place_ele_raiting_value'>{formatRating(location?.rating)}</span>
                    </div>
                    <div className='place_ele_booking'>
                        <div className='place_ele_discount_frame'>
                            {/* <del className='place_ele_original_price'>VNĐ {formatPrice(100)}</del> */}
                            <span className='place_ele_original_price'>Chỉ từ</span>
                            <div className='place_ele_discount_value'>0%</div>
                        </div>
                        <span className='place_ele_discount_price'>VNĐ {formatPrice(
                                                                        ele?.reduce((min, current) => 
                                                                        current.pricePerNight < min.pricePerNight ? current : min
                                                                        ).pricePerNight
                                                                    )}</span>
                        <button className='place_ele_btn'>Đặt phòng</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}


export default PlaceEle;