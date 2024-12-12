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
    const province = [
        { name: "Vũng Tàu", imgSrc: "/images/vungtau.jpg", region: "Nam Bộ" },
        { name: "Hà Nội", imgSrc: "/images/hanoi.jpg", region: "Bắc Bộ" },
        { name: "Ninh Bình", imgSrc: "/images/ninhbinh.jpg", region: "Bắc Bộ" },
        { name: "Quảng Ninh", imgSrc: "/images/quangninh.jpg", region: "Bắc Bộ" },
        { name: "Thừa Thiên Huế", imgSrc: "/images/hue.jpg", region: "Trung Bộ" },
        { name: "Nam Định", imgSrc: "/images/namdinh.jpg", region: "Bắc Bộ" },
        { name: "Vũng Tàu", imgSrc: "/images/vungtau.jpg", region: "Nam Bộ" },
        { name: "Hà Nội", imgSrc: "/images/hanoi.jpg", region: "Bắc Bộ" },
        { name: "Ninh Bình", imgSrc: "/images/ninhbinh.jpg", region: "Bắc Bộ" },
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

    return (
        <div className="discover_container">
            <div className="display_frame">
                <h2 className="container_tilte OpacityEffect">Khám phá Việt Nam</h2>
                <div className="region_btn OpacityEffect">
                    <button class="selected_region_btn Water_Drop_Effect" onclick="SelectRegion(this)"
                        onmouseover="createRipple(event)">Bắc Bộ</button>
                    <button class="unselected_region_btn Water_Drop_Effect" onclick="SelectRegion(this)"
                        onmouseover="createRipple(event)">Trung Bộ</button>
                    <button class="unselected_region_btn Water_Drop_Effect" onclick="SelectRegion(this)">Nam Bộ</button>
                </div>

                <div className="card_ele_slider" ref={sliderRef}>
                    {province.map((pro, index) => (
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
                    {showNextButton && (
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