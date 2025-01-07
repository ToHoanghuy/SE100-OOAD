import React, { useState, useRef, useEffect } from 'react';
// import {Link} from 'react-router-dom';
import Card from '../components/Card';
import HomePage from '../pages/HomePage';

function DiscoverContainer() {

    const cardRefs = useRef([]);
    const sliderRef = useRef(null);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState('Bắc Bộ');
    const [filteredProvinces, setFilteredProvinces] = useState([]);

    const province = [
        { name: "Hà Nội", imgSrc: "/images/hanoi.jpg", region: "Bắc Bộ" },
        { name: "Ninh Bình", imgSrc: "/images/ninhbinh.jpg", region: "Bắc Bộ" },
        { name: "Quảng Ninh", imgSrc: "/images/quangninh.jpg", region: "Bắc Bộ" },
        { name: "Nghệ An", imgSrc: "/images/nghean.jpg", region: "Bắc Bộ" },
        { name: "Lào Cai", imgSrc: "/images/laocai.jpg", region: "Bắc Bộ" },
        { name: "Nam Định", imgSrc: "/images/namdinh.jpg", region: "Bắc Bộ" },
        { name: "Điện Biên", imgSrc: "/images/dienbien.jpg", region: "Bắc Bộ" },

        { name: "Thừa Thiên Huế", imgSrc: "/images/hue.jpg", region: "Trung Bộ" },
        { name: "Lâm Đồng", imgSrc: "/images/lamdong.jpg", region: "Trung Bộ" },
        { name: "Đà Nẵng", imgSrc: "/images/danang.jpg", region: "Trung Bộ" },
        { name: "Phú Yên", imgSrc: "/images/phuyen.jpg", region: "Trung Bộ" },
        { name: "Đắk Lắk", imgSrc: "/images/daklak.jpg", region: "Trung Bộ" },
        { name: "Quảng Nam", imgSrc: "/images/quangnam.jpg", region: "Trung Bộ" },
        { name: "Bình Thuận", imgSrc: "/images/binhthuan.jpg", region: "Trung Bộ" },

        { name: "Vũng Tàu", imgSrc: "/images/vungtau.jpg", region: "Nam Bộ" },
        { name: "Thành phố Hồ Chí Minh", imgSrc: "/images/tphcm.jpg", region: "Nam Bộ" },
        { name: "Trà Vinh", imgSrc: "/images/travinh.jpg", region: "Nam Bộ" },
        { name: "Cần Thơ", imgSrc: "/images/cantho.jpg", region: "Nam Bộ" },
        { name: "Bạc Liêu", imgSrc: "/images/baclieu.jpg", region: "Nam Bộ" },
        { name: "Đồng Tháp", imgSrc: "/images/dongthap.jpg", region: "Nam Bộ" },
       
        { name: "Cà Mau", imgSrc: "/images/camau.jpg", region: "Nam Bộ" },
        

    ];

    const endValue = 5;

    const handleMovePrev = () => {
        const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
        const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;

        if (currentCardIndex > 0) {
            if (currentCardIndex === 1) {
                setShowPrevButton(false);
            }
            setShowNextButton(true);

            const newIndex = currentCardIndex - 1;
            setCurrentCardIndex(newIndex);

            cardRefs.current.forEach((card, i) => {
                card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
            });
        }
    }

    const handleMoveNext = () => {
        const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
        const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;

        if (currentCardIndex <= cardRefs.current.length - endValue - 1) {
            if (currentCardIndex === cardRefs.current.length - endValue - 1) {
                setShowNextButton(false);
            }
            setShowPrevButton(true);

            const newIndex = currentCardIndex + 1;
            setCurrentCardIndex(newIndex);
            cardRefs.current.forEach((card, i) => {
                card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
            });
        }
    }

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
    };

    useEffect(() => {
        // alert(selectedRegion)
        if (selectedRegion) {

            const filtered = province.filter((pro) => pro.region === selectedRegion);
            setFilteredProvinces(filtered);
        }
    }, [selectedRegion]);



    return (
        <div className="discover_container">
            <div className="display_frame">
                <h2 className="container_tilte OpacityEffect">Khám phá Việt Nam</h2>
                <div className="region_btn OpacityEffect">
                    {/* <button class="selected_region_btn Water_Drop_Effect" onclick="SelectRegion(this)"
                        onmouseover="createRipple(event)">Bắc Bộ</button>
                    <button class="unselected_region_btn Water_Drop_Effect" onclick="SelectRegion(this)"
                        onmouseover="createRipple(event)">Trung Bộ</button>
                    <button class="unselected_region_btn Water_Drop_Effect" onclick="SelectRegion(this)">Nam Bộ</button>
                     */}
                    <button
                        className={selectedRegion === 'Bắc Bộ' ? 'selected_region_btn Water_Drop_Effect' : 'unselected_region_btn Water_Drop_Effect'}
                        onClick={() => handleRegionSelect('Bắc Bộ')}
                    >
                        Bắc Bộ
                    </button>
                    <button
                        className={selectedRegion === 'Trung Bộ' ? 'selected_region_btn Water_Drop_Effect' : 'unselected_region_btn Water_Drop_Effect'}
                        onClick={() => handleRegionSelect('Trung Bộ')}
                    >
                        Trung Bộ
                    </button>
                    <button
                        className={selectedRegion === 'Nam Bộ' ? 'selected_region_btn Water_Drop_Effect' : 'unselected_region_btn Water_Drop_Effect'}
                        onClick={() => handleRegionSelect('Nam Bộ')}
                    >
                        Nam Bộ
                    </button>

                </div>

                <div className="card_ele_slider " ref={sliderRef}>
                    {filteredProvinces.map((pro, index) => (
                        <Card
                            key={index}
                            name={pro.name}
                            imgSrc={pro.imgSrc}
                            ref={(el) => (cardRefs.current[index] = el)}
                        />
                    ))}
                </div>
          
                <div className="card_button OpacityEffect">
                    {showPrevButton && (
                        <button className="card_button_prev" onClick={handleMovePrev}>
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    )}
                    {showNextButton && filteredProvinces.length > 5 && (
                        <button className="card_button_next" onClick={handleMoveNext}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    )}
                </div>

            </div>
        </div>
    );

}

export default DiscoverContainer;