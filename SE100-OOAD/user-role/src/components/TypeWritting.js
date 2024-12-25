import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function TypeWritting({ classNameValue, content }) {

    const location = useLocation();
    const typeWritter = useRef(null);

    const typeEffect = (element, text, speed) => {
        return new Promise((resolve) => {
            element.textContent = '';  // Xóa nội dung cũ
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    resolve();  // Khi hoàn thành việc gõ chữ
                }
            }
            typeWriter();
        });
    };

    useEffect(() => {
        var element= typeWritter.current;
        let texts = [];

        texts.push(element.textContent);  // Lưu lại nội dung ban đầu của phần tử
        // Dùng Promise để chạy hiệu ứng gõ chữ tuần tự
        const applyTypeEffect = async () => {
          
            await typeEffect(element, texts[0], 65);
        };
        applyTypeEffect(); // Gọi hàm áp dụng hiệu ứng gõ chữ

    }, [location]);

    return (
        <span className={classNameValue} ref={typeWritter}>
            {content}
        </span>
    );
}

export default TypeWritting;