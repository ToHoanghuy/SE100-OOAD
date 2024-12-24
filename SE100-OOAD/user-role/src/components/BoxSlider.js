import React, { useState, useRef, useEffect } from 'react';
import Box from '../components/Box';
import TypeWritting from '../components/TypeWritting';

function BoxSlider() {
    const [focusIndex, setFocusIndex] = useState(0);//lưu vị trí của focus hiện tại
    const [boxWidth, setBoxWidth] = useState(0);//lưu độ rộng của box bình thường

    const boxRefs = useRef([]); // Để lưu trữ các ref cho từng Box

    const boxData = [
        { name: "Hà Nội", imgSrc: "/images/hanoi.jpg" },
        { name: "Ninh Bình", imgSrc: "/images/ninhbinh.jpg" },
        { name: "Quảng Ninh", imgSrc: "/images/quangninh.jpg" },
        { name: "Thừa Thiên Huế", imgSrc: "/images/hue.jpg" },
        { name: "Nam Định", imgSrc: "/images/namdinh.jpg" },
    ];

    useEffect(() => {
        if (boxRefs.current[1]) {
            setBoxWidth(boxRefs.current[1].offsetWidth); // Cập nhật chiều rộng vào state
        }
    }, []);//chỉ chạy 1 lần đầu 

    const moveBox = (index) => {
        if (index > focusIndex && focusIndex < boxData.length - 1) {
            moveRight();
        } else if (index != 0 && index == focusIndex) {
            moveLeft();
        }
    };

    const moveRight = () => {
        let currentIndex = -1;
        boxRefs.current.forEach((box, index) => {
            box.style.transform = `translateX(${(index - currentIndex) * -boxWidth * (focusIndex + 1)}px) translateX(${-(window.innerWidth * 0.08 * 0.55 * (focusIndex + 1))}px)`;
            currentIndex++;
        });
        setFocusIndex((prev) => prev + 1);
    };

    const moveLeft = () => {
        let currentIndex = -1;
        boxRefs.current.forEach((box, index) => {
            box.style.transform = `translateX(${(index - currentIndex) * -boxWidth * (focusIndex - 1)}px) translateX(${-(window.innerWidth * 0.08 * 0.55 * (focusIndex - 1))}px)`;
            currentIndex++;
        });
        setFocusIndex((prev) => prev - 1);
    };

    return (
        <div>
            <div className="all">
                <div className="slogan">
                    <span className="name">Travel Social</span>
                    {/* <span className="describe typewriter">Hãy bắt đầu những trãi nghiệm mới</span> */}
                    <TypeWritting classNameValue={'describe'} content={'Hãy bắt đầu những trãi nghiệm mới'} />
                    <button className="show">
                        <span>Show more</span>
                    </button>
                </div>
                <div className="box-slider">
                    {boxData.map((box, index) => (
                        <Box
                            key={index}
                            name={box.name}
                            imgSrc={box.imgSrc}
                            isFocus={index === focusIndex} // Nếu là focusIndex thì isFocus = true
                            onHover={() => moveBox(index)}
                            ref={(el) => (boxRefs.current[index] = el)}
                        />
                    ))}
                </div>
            </div>
            <div className="change_button">
                <button className="left_arrow" onClick={() => { if (focusIndex !== 0) { moveLeft(); } }}>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button className="right_arrow" onClick={() => { if (focusIndex !== boxData.length - 1) { moveRight(); } }}>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>

    );
}

export default BoxSlider;