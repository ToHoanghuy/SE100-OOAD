import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
// import { formatPrice } from '../function/formatPrice';
import { toggleFavorite, formatRating, formatPrice } from '../function/functionEffect';

// const CardInfo = forwardRef(({ name, imgSrc, pro, rating, reviews, discount, originalPrice, discountPrice, favrorited,path }, ref) => {
const CardInfo = forwardRef(({ ele, favrorited }, ref) => {
    const [isFavorited, setIsFavorited] = useState(favrorited);
    const [minPrice, setMinPrice] = useState('')
    const [rooms, setRooms] = useState([]);

    const image="/images/detail/detail1.jpg";
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
    useEffect(() => {
        getRooms();
    }, []);

    useEffect(() => {
        if(rooms)
        {
            if (rooms.length > 0) {
                const minPriceValue = Math.min(...rooms.map(room => room.pricePerNight));
                setMinPrice(minPriceValue);
            }
        }

    }, [rooms]);

    return (
        <Link to={`/detail/${ele._id}`} className="card_ele OpacityEffect" ref={ref}>
            <div className="card_info">
                <span className="card_discount">
                    <span className="card_discount_value">
                        <span className="card_discount_symbol">-</span>0<span class="card_discount_symbol">%</span>
                    </span>
                </span>
                <button className="card_prefer" onClick={(e) => toggleFavorite(isFavorited, setIsFavorited, e)}>
                    <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
                </button>
                <img className="card_info_img" src={ele?.image?.[0]?.url || '/images/default_location_img.jpg'} />
                <span className="card_info_name">{ele.name}</span>
                <span className="card_info_dst"><i className="fa-solid fa-location-dot"></i>{ele.address}</span>
                <div className="card_info_race">
                    <div className="card_info_star"><i className="fa-solid fa-star"></i><span>{formatRating(ele.rating)}</span></div>
                    <span>lượt đánh giá</span>
                </div>
                <div className="card_info_price">
                    {/* <del className="original_price">VND {formatPrice(0)}</del> */}
                    <span className="original_price">Chỉ từ</span>
                    <span className="discount_price">VND {formatPrice(minPrice)}</span>
                </div>
            </div>
        </Link>
    );
});

export default CardInfo;