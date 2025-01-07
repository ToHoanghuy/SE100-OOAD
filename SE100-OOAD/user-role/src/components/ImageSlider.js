import React, { useState, useEffect } from 'react';

const images = [
    '/images/family1.jpg',
    '/images/family2.jpg',
    '/images/family3.jpg'
];

const ImageSlider = () => {
    const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2]); // Ba index cho ba đối tượng

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndexes((prevIndexes) => {
                return prevIndexes.map(index => (index + 1) % images.length); // Tăng index và quay lại từ đầu nếu cần
            });
        }, 3000); // Thay đổi hình ảnh sau mỗi 3 giây

        return () => clearInterval(interval); // Clean up interval
    }, []);

    return (
        <div className="note_container">
            <div className="residence_frame">
                {currentIndexes.map((index, i) => (
                    <div key={i} className="residence_note zoomEffect">
                        <img src={images[index]} alt={`Random Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;