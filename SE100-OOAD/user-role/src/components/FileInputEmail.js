import React, { useState, useRef, useEffect } from 'react';

function FileInputEmail({ value, onChange, checkNull, setCheckEmail }) {
    const [inputContent, setInputContent] = useState(value);
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setInputContent(e.target.value);
        onChange(e.target.value);
        setCheckEmail(true);
    };

    const handleDelete = (e) => {
        if (inputContent) {
            setInputContent('');
            inputRef.current.focus();
        }
    };
    // console.log(checkNull)

    // useEffect(() => {
        
    // }, []);

    return (
        <div className="input_frame OpacityEffect">
            <div className="file_input">
                <label onClick={() => inputRef.current.focus()}>Email</label>
                <input type="email" placeholder="Nhập email của bạn"
                    value={inputContent}
                    onChange={handleChange}
                    ref={inputRef} />
                <span className="icon_frame"><i className="fa-solid fa-x" onClick={handleDelete}></i></span>
            </div>
            <span className={`login_note ${!checkNull ? 'error_text' : ''}`}>{!checkNull && 'Email không được để trống'}</span>
        </div>
    );
}

export default FileInputEmail;