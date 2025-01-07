import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import TypeWritting from '../components/TypeWritting';
import FileInputEmail from '../components/FileInputEmail';
import FileInputPasswork from '../components/FileInputPasswork';
import '../styles/Login.css';

function Register() {

    const [showSecondText, setShowSecondText] = useState(false);

    useEffect(() => {
        // Đặt độ trễ 65 giây để hiển thị văn bản thứ hai
        const timer = setTimeout(() => {
            setShowSecondText(true);
        }, 3000); // 65000ms = 65s

        // Dọn dẹp bộ đếm thời gian khi component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="root">
            <Helmet>
                <title>Travel Social | Đăng Ký</title>
            </Helmet>
            <Link to="/" className="comeback">
                <i className="fa-solid fa-angles-left"></i>
                <span className="comeback_text"> Quay lại</span>
            </Link>
            <div className="left_side_frame"></div>
            <div className="register_container">
                <div className="login_title OpacityEffect">
                    <img className="login_logo" src="/images/logo.png" />
                    <span className="login_title_text">Đăng ký</span>
                </div>
                <TypeWritting classNameValue={'login_welcome_text'} content={'Hãy bắt đầu hành trình mới cùng Travel Social'} />
                {!showSecondText && (<TypeWritting classNameValue={'login_desc_text'} />)}{/* này là để giữ vị trí cho TypeWritting ở dưới tạm thời thôi */}
                {showSecondText && (
                    <TypeWritting classNameValue={'login_desc_text'} content={'Vui lòng điền thông tin để tiến hành đăng ký'} />
                )}
                <FileInputEmail/>
                <FileInputPasswork/>
                <FileInputPasswork labelInput={"Nhập lại mật khẩu"}/>
                <button className="button_frame login_button Water_Drop_Effect" onmouseover="createRipple(event)" onclick="createRipple(event)"> Đăng ký ngay</button>
                <div className="back_to_login">
                    <hr/><Link to="/login">Bạn đã có tài khoản?</Link ><hr/>
                </div>
            </div>
        </div>
    );
}

export default Register;