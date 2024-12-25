import React, { useState, useRef, useEffect } from 'react';
import CardInfo from '../components/CardInfo';
// import HomePage from '../pages/HomePage';

function ProposeContainer({ title }) {

    const sliderRef = useRef(null);
    const cardRefs = useRef([]);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showPrevButton, setShowPrevButton] = useState(false);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const endValue = 4;

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

    const element = [
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false,path:"Ho-Coc-Camping-Vung-Tau-Ho-Coc-Camping-Vung-Tau" },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:true },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
        { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
    ];

    return (
        <div className='propose_container'>
            <div className="display_frame">
                <h2 className="container_tilte OpacityEffect">{title}</h2>
                <div className="card_ele_slider" ref={sliderRef}>
                    {element.map((ele, index) => (
                        <CardInfo
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
                            path={ele.path}
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

export default ProposeContainer;