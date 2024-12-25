import React, { useState, useRef, useEffect } from 'react';

function ResidenceBar({ toggleOption, showOptions, selectionBtnRef, selectionOptionRef }) {
    const [inputValue, setInputValue] = useState('');
    const optionRefs = useRef([]);

    const residenceData = [
        { residence: "Khách sạn", iconClass: "fa-hotel" },
        { residence: "Homestay", iconClass: "fa-house-chimney" },
        { residence: "Guesshome", iconClass: "fa-house-user" },
    ];

    const [selectedResidenceOptions, setSelectedResidenceOptions] = useState([]);
    const inputRef = useRef(null);

    const deleteOption = (event) => {
        optionRefs.current.forEach((ref) => {
        //Xóa hiệu ứng chọn cho các option
            if (ref && ref.classList.contains('selected')) {
                ref.classList.remove('selected');  // Xóa class 'selected' nếu có
            }
        });
        setSelectedResidenceOptions([])
    };

    const choiceOption = (event) => {
        event.stopPropagation();
        const optionText = event.target.innerText;
        // Kiểm tra xem lựa chọn đã được chọn trước đó chưa
        if (selectedResidenceOptions.includes(optionText)) {
            // Nếu đã chọn, thì xóa khỏi danh sách
            const newSelection = selectedResidenceOptions.filter(item => item !== optionText);
            event.target.classList.remove('selected');
            setSelectedResidenceOptions(newSelection);
        } else {
            // Nếu chưa được chọn, thêm vào danh sách
            event.target.classList.add('selected');
            setSelectedResidenceOptions(prevState => [...prevState, optionText]);
        }
    };

    //Để cập nhật input khi value thay đổi 
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = selectedResidenceOptions.length > 0
                ? selectedResidenceOptions.join(', ')
                : '';
        }
    }, [selectedResidenceOptions]);

    return (
        <div className="residence">
            <div className="selection_btn"
                onClick={toggleOption}
                ref={selectionBtnRef}
            >
                <img src="/images/logo/house.png" />
                <input className="input_text" type="text" placeholder="Loại lưu trú"
                    readOnly
                    ref={inputRef}
                />
                <i
                    className={`fa-solid ${selectedResidenceOptions.length > 0 ? 'fa-x' : 'fa-angle-down'}`}
                    onClick={() => {
                        if (selectedResidenceOptions.length > 0) {
                            deleteOption();
                        }
                    }}
                ></i>
            </div>

            <div className="selection_option" ref={selectionOptionRef}>
                <div className="option_describe">Bạn có thể chọn nhiều hơn 1</div>
                {residenceData.map((data, index) => (
                    <div key={index} 
                        className="option" 
                        ref={(el) => (optionRefs.current[index] = el)}
                        onClick={choiceOption}
                    >
                        <i className={`fa-solid ${data.iconClass}`}></i>
                        {data.residence}
                    </div>
                ))}

            </div>
        </div>
    );

};

export default ResidenceBar;