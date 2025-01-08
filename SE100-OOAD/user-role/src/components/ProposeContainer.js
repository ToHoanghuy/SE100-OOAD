import React, { useState, useRef, useEffect } from 'react';
import CardInfo from '../components/CardInfo';
// import HomePage from '../pages/HomePage';

function ProposeContainer({ title, locations }) {
    // const [locations, setLocations] = useState([]);
    // const [randomLocations, setRandomLocations] = useState([]); // State để lưu 16 location ngẫu nhiên
    // const [loading, setLoading] = useState(true);

    // const getAllLocations = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3000/alllocation");
    //         const data = await response.json();

    //         if (data.isSuccess) {
    //             setLocations(data.data); // Set data locations
    //         } else {
    //             console.error(data.error);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false); // Đặt loading về false sau khi hoàn tất
    //     }
    // };

    // useEffect(() => {
    //     getAllLocations();
    // }, []);

    // // Lấy 16 location ngẫu nhiên
    // useEffect(() => {
    //     if (locations.length > 0) {
    //         const randomLocations = locations
    //             .sort(() => 0.5 - Math.random()) // Trộn ngẫu nhiên
    //             .slice(0, 8); // Lấy 16 phần tử đầu tiên
    //         setRandomLocations(randomLocations);
    //     }
    // }, [locations]);

    const sliderRef = useRef(null);
    const cardRefs = useRef([]);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showPrevButton, setShowPrevButton] = useState(false);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const endValue = 4;

    // const handleMovePrev = () => {
    //     const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
    //     const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;

    //     if (currentCardIndex > 0) {
    //         if (currentCardIndex === 1) {
    //             setShowPrevButton(false);
    //         }
    //         setShowNextButton(true);
    //         const newIndex = currentCardIndex - 1;
    //         setCurrentCardIndex(newIndex);
    //         cardRefs.current.forEach((card, i) => {
    //             card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
    //         });
    //     }
    // }
    // const handleMoveNext = () => {
    //     const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
    //     const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;
    //     if (currentCardIndex <= cardRefs.current.length - endValue - 1) {
    //         if (currentCardIndex === cardRefs.current.length - endValue - 1) {
    //             setShowNextButton(false);
    //         }
    //         setShowPrevButton(true);

    //         const newIndex = currentCardIndex + 1;
    //         setCurrentCardIndex(newIndex);
    //         cardRefs.current.forEach((card, i) => {
    //             card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
    //         });
    //     }
    // }
    const handleMovePrev = () => {
        const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
        const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;
        const step = 4; // Số lượng phần tử di chuyển mỗi lần
    
        if (currentCardIndex > 0) {
            const newIndex = Math.max(currentCardIndex - step, 0); // Đảm bảo không vượt quá chỉ số đầu tiên
            setCurrentCardIndex(newIndex);
    
            if (newIndex === 0) {
                setShowPrevButton(false);
            }
            setShowNextButton(true);
    
            cardRefs.current.forEach((card) => {
                card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
            });
        }
    };
    
    const handleMoveNext = () => {
        const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
        const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;
        const step = 4; // Số lượng phần tử di chuyển mỗi lần
        const maxIndex = cardRefs.current.length - endValue; // Chỉ số tối đa có thể di chuyển
    
        if (currentCardIndex <= maxIndex) {
            const newIndex = Math.min(currentCardIndex + step, maxIndex); // Đảm bảo không vượt quá chỉ số cuối
            setCurrentCardIndex(newIndex);
    
            if (newIndex === maxIndex) {
                setShowNextButton(false);
            }
            setShowPrevButton(true);
    
            cardRefs.current.forEach((card) => {
                card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
            });
        }
    };
    

    // const element = [
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false, path: "Ho-Coc-Camping-Vung-Tau-Ho-Coc-Camping-Vung-Tau" },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: true },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/vungtau.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    // ];

    if(locations)
    {
    return (
        <div className='propose_container'>
            <div className="display_frame">
                <h2 className="container_tilte OpacityEffect">{title}</h2>
                <div className="card_ele_slider" ref={sliderRef}>
                    { locations.map((ele, index) => (
                        <CardInfo
                            key={index}
                            ele={ele}
                            favrorited={false}
                            // path={ele.path}
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
}

export default ProposeContainer;