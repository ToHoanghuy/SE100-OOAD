import React, { useState, useRef, useEffect } from 'react';

function FileInputPasswork({labelInput="Mật khẩu"}) {
    const [inputContent, setInputContent] = useState();
    const [inputNote, setInputNote] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const inputRef = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputContent(value);

        if (value.length < 6) {
            setInputNote("Mật khẩu phải từ 6 đến 15 kí tự.");
        } else {
            setInputNote("");
        }
    };

    const handleEyeClick = () => {
        if (inputContent.trim() !== "") {
            setShowPassword(!showPassword);
            if (!showPassword) {
                setTimeout(() => {
                    setShowPassword(false);
                }, 1000);
            }
        }
    };

    return (
        <div className="input_frame OpacityEffect">
            <div className="file_input" >
                <label onClick={() => inputRef.current.focus()}>{labelInput}</label>
                <input className="input_password" placeholder="Nhập mật khẩu"
                    type={showPassword ? "text" : "password"}
                    value={inputContent}
                    onChange={handleChange}
                    ref={inputRef} />
                <span className="icon_frame" onClick={handleEyeClick}>
                    <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </span>
            </div>
            <span className="login_note">{inputNote}</span>
        </div>
    );
}

export default FileInputPasswork;