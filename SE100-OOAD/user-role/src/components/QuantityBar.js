import React, { useState } from 'react';

function QuantityBar({ toggleOption, showOptions, selectionBtnRef, selectionOptionRef }) {
    const [inputValue, setInputValue] = useState('');

    const choiceOption = (event) => {
        const value = event.target.innerText; // Lấy innerText của option đã click
        setInputValue(value); // Cập nhật giá trị input
    };

    const quantityData = [
        { quantity: "1 người - 1 phòng" },
        { quantity: "2 người - 1 phòng" },
        { quantity: "3 người - 1 phòng" },
        { quantity: "4 người - 1 phòng" },
    ];

    return (
        <div className="quantity">
            <div className="selection_btn"
                onClick={toggleOption}
                ref={selectionBtnRef}
            >
                <img src="/images/logo/person.png" />
                <input className="input_text" type="text" placeholder="Số người - 1 phòng" readOnly
                    value={inputValue}/>
                <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="selection_option" ref={selectionOptionRef}>
                <div className="option_describe">Các địa điểm được ưa thích</div>
                {quantityData.map((data,index) => (
                    <div  key={index} className="option" onClick={choiceOption}>
                        {data.quantity}
                    </div>
                ))}
            </div>
        </div>


    );

};

export default QuantityBar;