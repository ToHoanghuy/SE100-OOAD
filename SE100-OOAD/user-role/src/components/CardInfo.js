import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../function/formatPrice';

const CardInfo = forwardRef(({ name, imgSrc, pro, rating, reviews, discount, originalPrice, discountPrice, favrorited,path }, ref) => {

    const [isFavorited, setIsFavorited] = useState(favrorited);

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setIsFavorited(!isFavorited);
    };

    // const formatPrice = (price) => {
    //     return new Intl.NumberFormat('vi-VN').format(price);
    // };

    return (
        <Link to={`/detail/${path}`} className="card_ele OpacityEffect" ref={ref}>
            <div className="card_info">
                <span className="card_discount">
                    <span className="card_discount_value">
                        <span className="card_discount_symbol">-</span>{discount}<span class="card_discount_symbol">%</span>
                    </span>
                </span>
                <button className="card_prefer" onClick={handleHeartClick}>
                    <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
                </button>
                <img className="card_info_img" src={imgSrc} />
                <span className="card_info_name">{name}</span>
                <span className="card_info_dst"><i className="fa-solid fa-location-dot"></i>{pro}</span>
                <div className="card_info_race">
                    <div className="card_info_star"><i className="fa-solid fa-star"></i><span>{rating}</span></div>
                    <span>{reviews} lượt đánh giá</span>
                </div>
                <div className="card_info_price">
                    <del className="original_price">VND {formatPrice(originalPrice)}</del>
                    <span className="discount_price">VND {formatPrice(discountPrice)}</span>
                </div>
            </div>
        </Link>
    );
});

export default CardInfo;