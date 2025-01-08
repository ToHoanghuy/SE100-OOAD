import React, { useState, useRef, useEffect } from 'react';
import ReactFlatpickr from 'react-flatpickr';
// import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";


function UserInfoFile({ label, type, value, placeholder, isEditing, onEdit, onChange, dob, calendar }) {

    const inputRef = useRef(null); // Tạo ref cho ô input
    const flatpickrRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus(); // Trỏ vào ô input
            // Kiểm tra nếu kiểu input là text hoặc password để sử dụng setSelectionRange
            if (type === "text") {
                inputRef.current.setSelectionRange(value.length, value.length); // Đặt con trỏ cuối chuỗi
            }
        }
    }, [isEditing, type, value]); // Theo dõi isEditing, type và value

    useEffect(() => {
        if (isEditing && flatpickrRef.current) {
            flatpickrRef.current.flatpickr.open(); // Gọi phương thức open() từ flatpickr
        }
    }, [isEditing]);

    const handleDateChange = (date) => {
        onChange(date[0]); // Cập nhật ngày vào giá trị của props
    };

    return (
        <div className="input_user_frame OpacityEffect">
            <label>{label}</label>
            <div className="file_input_user">
                {type === "date" ? (
                    <ReactFlatpickr
                        ref={flatpickrRef}
                        value={value}  // Truyền value vào ReactFlatpickr
                        onChange={handleDateChange} // Cập nhật giá trị khi thay đổi
                        placeholder={placeholder}
                        options={{
                            dateFormat: 'd-m-Y',
                            theme: 'airbnb',
                            disableMobile: true,
                        }} 
                        disabled={!isEditing} // Chỉ cho phép chọn ngày khi isEditing là true
                        />
                ) : (
                    <input
                        ref={inputRef}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        readOnly={!isEditing}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}

                <i className={`fa-regular fa-pen-to-square ${isEditing === true ? "editing_icon" : ""}`}
                    onClick={onEdit}
                ></i>
            </div>

        </div>
    );
}

export default UserInfoFile;