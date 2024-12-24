import React, { useState } from 'react';

function LocationBar({ toggleOption, showOptions, selectionBtnRef, selectionOptionRef }) {
    const [inputValue, setInputValue] = useState('');

    const choiceOption = (event) => {
        const value = event.target.innerText; // Lấy innerText của option đã click
        setInputValue(value); // Cập nhật giá trị input
    };

    const locationData = [
        { location: "Lựa chọn 1" },
        { location: "Lựa chọn 2" },
        { location: "Lựa chọn 3" },
        { location: "Lựa chọn 4" },
    ];

    return (
        <div className="location">
            <div className="selection_btn"
                onClick={toggleOption}
                ref={selectionBtnRef}
            >
                <img src="/images/logo/Location.png" />
                <input className="input_text" type="text" placeholder="Bạn ơi mình đi đâu thế?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} /
                >
                <i className="fa-solid fa-x" onclick={(e) => setInputValue('')}></i>
            </div>

            <div className="selection_option" ref={selectionOptionRef}>
                <div className="option_describe">Các địa điểm được ưa thích</div>
                {locationData.map((data,index) => (
                    <div  key={index} className="option" onClick={choiceOption}>
                        <img src="/images/logo/Location_sub.png" alt="Option 2" />
                        {data.location}
                    </div>
                ))}
            </div>
        </div>


    );

};

export default LocationBar;