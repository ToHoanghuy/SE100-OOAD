import React, { useState, useRef, useEffect } from 'react';
import Box from '../components/Box';
import TypeWritting from '../components/TypeWritting';

function BoxSlider() {
    const [focusIndex, setFocusIndex] = useState(0);//lưu vị trí của focus hiện tại
    const [boxWidth, setBoxWidth] = useState(0);//lưu độ rộng của box bình thường

    const boxRefs = useRef([]); // Để lưu trữ các ref cho từng Box

    const boxData = [
        // { name: "Hà Nội", imgSrc: "/images/hanoi.jpg" },
        // { name: "Ninh Bình", imgSrc: "/images/ninhbinh.jpg" },
        // { name: "Quảng Ninh", imgSrc: "/images/quangninh.jpg" },
        // { name: "Thừa Thiên Huế", imgSrc: "/images/hue.jpg" },
        // { name: "Nam Định", imgSrc: "/images/namdinh.jpg" },

        { name: "Hà Nội", imgSrc: "/images/hanoi.jpg" },
        { name: "Ninh Bình", imgSrc: "/images/ninhbinh.jpg" },
        { name: "Quảng Ninh", imgSrc: "/images/quangninh.jpg" },
        { name: "Nghệ An", imgSrc: "/images/nghean.jpg" },
        { name: "Lào Cai", imgSrc: "/images/laocai.jpg" },
        { name: "Nam Định", imgSrc: "/images/namdinh.jpg" },
        { name: "Điện Biên", imgSrc: "/images/dienbien.jpg" },

        { name: "Thừa Thiên Huế", imgSrc: "/images/hue.jpg" },
        { name: "Đà Nẵng", imgSrc: "/images/danang.jpg" },
        { name: "Phú Yên", imgSrc: "/images/phuyen.jpg" },
        { name: "Đắk Lắk", imgSrc: "/images/daklak.jpg" },
        { name: "Quảng Nam", imgSrc: "/images/quangnam.jpg" },

        { name: "Vũng Tàu", imgSrc: "/images/vungtau.jpg" },
        { name: "Cần Thơ", imgSrc: "/images/cantho.jpg" },
        { name: "Trà Vinh", imgSrc: "/images/travinh.jpg" },
        { name: "Đồng Tháp", imgSrc: "/images/dongthap.jpg" },
        { name: "Bạc Liêu", imgSrc: "/images/baclieu.jpg" },
    ];

    const [randomBoxData, setRandomBoxData] = useState([]);
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    useEffect(() => {
        // Lấy 5 phần tử ngẫu nhiên chỉ một lần khi component mount
        const randomData = shuffleArray(boxData).slice(0, 5);
        setRandomBoxData(randomData);
    }, []); // Chỉ chạy 1 lần khi component mount


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
                    {/* {boxData.map((box, index) => (
                        <Box
                            key={index}
                            name={box.name}
                            imgSrc={box.imgSrc}
                            isFocus={index === focusIndex} // Nếu là focusIndex thì isFocus = true
                            onHover={() => moveBox(index)}
                            ref={(el) => (boxRefs.current[index] = el)}
                        />
                    ))} */}
                    {(randomBoxData.length === 0 ? boxData.slice(0, 5) : randomBoxData).map((box, index) => (
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