import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../function/formatPrice';
import { toggleFavorite } from '../function/functionEffect';

function PlaceEle({ name, imgSrc, pro, rating, reviews, discount, originalPrice, discountPrice, favrorited,path }) {
    const [isFavorited, setIsFavorited] = useState(favrorited);

    return (
        <Link to={`/detail/${path}`} className='place_ele OpacityEffect'>
            <div className='place_ele_img'>
                <img src={imgSrc} />
                <div className='place_ele_heart' onClick={(e) => toggleFavorite(isFavorited, setIsFavorited, e)}>
                    {/* <i class="fa-solid fa-heart"></i> */}
                    <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
                </div>
            </div>
            <div className='place_ele_detail'>
                <div className='place_ele_detail_left_side'>
                    <span className='place_ele_name'>{name}</span>
                    <div className='place_ele_star'>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div className='place_ele_province'>
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{pro}</span>
                    </div>
                    <div className='place_ele_service_frame'>
                        <div className='place_service_ele'>
                            <span>1 phòng ngủ</span>
                        </div>
                        <div className='place_service_ele'>
                            <span>1 phòng bếp</span>
                        </div>
                        <div className='place_service_ele'>
                            <span>Ban công</span>
                        </div>
                        <div className='place_service_ele'>
                            <span>16m2</span>
                        </div>
                        <div className='place_service_ele'>
                            <span>1 giường đôi</span>
                        </div>
                        <div className='place_service_ele'>
                            <span>wifi 24/7</span>
                        </div>
                    </div>
                </div>
                <div className='place_ele_detail_right_side'>
                    <div className='place_ele_raiting'>
                        <div className='place_ele_review'>
                            <span className='place_ele_rank'>Tốt</span>
                            <span className='place_ele_number_of_reivews'>{reviews} đánh giá</span>
                        </div>
                        <span className='place_ele_raiting_value'>{rating}</span>
                    </div>
                    <div className='place_ele_booking'>
                        <div className='place_ele_discount_frame'>
                            <del className='place_ele_original_price'>VNĐ {formatPrice(originalPrice)}</del>
                            <div className='place_ele_discount_value'>{discount}%</div>
                        </div>
                        <span className='place_ele_discount_price'>VNĐ {formatPrice(discountPrice)}</span>
                        <button className='place_ele_btn'>Đặt phòng</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PlaceEle;