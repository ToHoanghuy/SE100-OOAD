import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/SearchPage.css';
import SearchBar from '../components/SearchBar';
import PlaceEle from '../components/PlaceEle';
import ServiceFilter from '../components/ServiceFilter';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import { formatPrice } from '../function/formatPrice';


function SearchPage() {
    const element = [
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false, path: "Ho-Coc-Camping-Vung-Tau-Ho-Coc-Camping-Vung-Tau" },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: true },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    ];

    const [cost, setCost] = useState([500000, 3000000]);
    const [raiting, setRaiting] = useState(1);
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const handleToggleService = (serviceName, isSelected) => {
        setSelectedServices((prevServices) => {
            console.log(selectedServices);
            if (isSelected) {
                // Thêm dịch vụ nếu được chọn
                return [...prevServices, serviceName];
            } else {
                // Loại bỏ dịch vụ nếu bị bỏ chọn
                return prevServices.filter((service) => service !== serviceName);
            }
        });
    };
    const handleChange = (event, newValue) => {
        setCost(newValue);
    
        console.log('cost: ',cost);
    };

    const valuetext = (value) => {
        return `VNĐ ${value}`;
    };

    const [starClick, setStarClick] = useState(0);  // Quản lý trạng thái sao đã được click
    const [starValue, setStarValue] = useState(null);
    const handleMouseOver = (index) => {
        if (starClick === 0) {
            setStarValue(index + 1); // Thay đổi giá trị sao khi hover
        }
        setRaiting(index + 1);
        console.log(index+ 1);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            // Xác định trạng thái sao dựa vào starValue
            let starClass
            if (i > 0) {
                starClass = 'fa-regular fa-star';
                if (starValue !== null && i < starValue) {
                    starClass = 'fa-solid fa-star'; // Sao solid
                }
            }
            else {
                starClass = 'fa-solid fa-star';
            }

            stars.push(
                <i
                    key={i}
                    className={starClass + " user_star"}
                    onMouseOver={() => handleMouseOver(i)}
                // onClick={() => handleClick(i)}
                ></i>
            );

        }
        return stars;
    };

    const handleSearch = (searchParams) => {
        console.log('Search Params:', searchParams); // Debug xem searchParams gửi gì
    
        // Chuyển searchParams thành query string
        const queryString = new URLSearchParams(searchParams).toString();
    
        // Gọi API với phương thức GET
        fetch(`http://localhost:3000/search?${queryString}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Xử lý kết quả API
                setSearchQuery(data);
                console.log('Search Results:', data);
            })
            .catch((error) => {
                console.error('Error during fetch:', error);
            });
    };
    

    return (
        <div className='search_page_root'>
            <div className='search_page_bar_container'>
                <div className='search_bar_frame_container'>
                    <SearchBar
                    cost={cost} 
                    rating={raiting} 
                    services={selectedServices} 
                    onSearch={handleSearch} 
                    />
                </div>
                <div class="breadcrumb_container">
                    <Link to='/' class="breadcrumb_ele">Trang Chủ</Link>
                    <i class="fa-solid fa-angle-right breadcrumb_angle current_breadcumb"></i>
                    <a class="breadcrumb_ele current_breadcumb">Vũng Tàu</a>
                </div>
            </div>
            <div className='search_page_body_cotainer'>
                <div className="display_frame">
                    <div className='filter_bar'>
                        <div className='filter_bar_title'>
                            <img src="/images/logo/filter.png" />
                            <span>Chọn lọc theo</span>
                        </div>
                        <div className='filter_row'>
                            <span className='filter_row_name'>Ngân sách của bạn</span>
                            <div className='cost_filter'>
                                <div className='filter_value'>
                                    <span className='cost_from'>VNĐ {formatPrice(cost[0])}</span>-<span className='cost_to'>VNĐ {formatPrice(cost[1])}</span>
                                </div>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={cost}
                                    onChange={handleChange}
                                    // valueLabelDisplay="off"
                                    min={0}
                                    max={10000000}
                                    step={100000}
                                />
                            </div>
                        </div>
                        <div className='filter_row'>
                            <span className='filter_row_name'>Dịch vụ & Tiện nghi</span>
                            <div className='service_filter'>
                                {/* <div className='service_filter_row'><i class="fa-regular fa-square"></i><span>Wifi miễn phí</span></div>
                                <div className='service_filter_row'><i class="fa-regular fa-square"></i><span>Hủy phòng hoàn tiền 24h</span></div>
                                <div className='service_filter_row'><i class="fa-regular fa-square"></i><span>Hệ thống cách âm</span></div> */}
                                <ServiceFilter name='Wifi miễn phí' onToggleService={handleToggleService} />
                                <ServiceFilter name='Hủy phòng hoàn tiền 24h' onToggleService={handleToggleService} />
                                <ServiceFilter name='Hệ thống cách âm' onToggleService={handleToggleService}/>
                            </div>
                        </div>
                        <div className='filter_row'>
                            <span className='filter_row_name'>Xếp hạng</span><span className='filter_value'>&gt; {raiting} sao</span>
                            <div className="raiting_filter">
                                {renderStars()} {/* Render sao */}
                            </div>

                        </div>
                    </div>
                    <div className='place_container'>
                        <div className='place_frame'>
                            {searchQuery.map((ele, index) => (
                                <PlaceEle
                                    key={index}
                                    name={ele.name}
                                    imgSrc={ele.imgSrc}
                                    pro={ele.pro}
                                    rating={ele.rating}
                                    reviews={ele.reviews}
                                    discount={ele.discount}
                                    originalPrice={ele.originalPrice}
                                    discountPrice={ele.discountPrice}
                                    favrorited={ele.favrorited}
                                    path={ele._id}
                                    ele = {ele.matchingRooms}
                                    showHert={false}
                                // ref={(el) => (cardRefs.current[index] = el)}
                                />

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;