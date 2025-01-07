import React, { useState, useRef, useEffect } from 'react';

function FileInputPasswork({labelInput="Mật khẩu", value, onChange, checkNull, setCheckPassword}) {
    const [inputContent, setInputContent] = useState(value);
    const [inputNote, setInputNote] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const inputRef = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputContent(value);
        setCheckPassword(true);

        if (value.length < 6) {
            setInputNote("Mật khẩu phải từ 6 đến 15 kí tự.");
        } else {
            setInputNote("");
        }
        onChange(e.target.value);
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

    useEffect(() => {
        if (!checkNull) {
          setInputNote("Mật khẩu không được để trống bạn");
        } else {
          setInputNote("");
        }
      }, [checkNull]);
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
            <span className={`login_note ${!checkNull ? 'error_text' : ''}`}>{inputNote}</span>
        </div>
    );
}

export default FileInputPasswork;