import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TypeWritting from '../components/TypeWritting';
import FileInputEmail from '../components/FileInputEmail';
import FileInputPasswork from '../components/FileInputPasswork';
import '../styles/Login.css';

function Login() {

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
        <div class="root">
            <Link to="/" class="comeback">
                <i class="fa-solid fa-angles-left"></i>
                <span class="comeback_text"> Quay lại</span>
            </Link>
            <div className="login_container">
                <div class="login_title OpacityEffect">
                    <img class="login_logo" src="/images/logo.png" />
                    <span class="login_title_text">Đăng nhập</span>
                </div>
                <TypeWritting classNameValue={'login_welcome_text'} content={'Chào mừng bạn trở lại với Travel Social'} />
                {!showSecondText && (<TypeWritting classNameValue={'login_desc_text'} />)}{/* này là để giữ vị trí cho TypeWritting ở dưới tạm thời thôi */}
                {showSecondText && (
                    <TypeWritting classNameValue={'login_desc_text'} content={'Vui lòng đăng nhập để tiếp tục'} />
                )}
                <FileInputEmail />
                <FileInputPasswork />
                <div class="sub_input OpacityEffect">
                    <div class="remember_password">
                        <input type="checkbox" class="remember_password_checkbox" />
                        <span class="remember_password_text">Nhớ mật khẩu</span>
                    </div>
                    <div class="forgot_password">
                        <a class="forgot_password_text">Quên mật khẩu?</a>
                    </div>
                </div>
                <Link to="/user" class="button_frame login_button Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)"> Đăng nhập ngay</Link>
                <div class="input_other OpacityEffect">
                    <hr/>Hoặc<hr />
                </div>
                <Link to="/register" class="button_frame register_button Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)"> Tạo tài khoản</Link>
                <button class="button_frame platform_button google_btn Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)">
                    <img src="/images/logo/google_logo.png" />
                    <span>Đăng nhập bằng Google</span>
                </button>
                <a class="button_frame platform_button facebook_btn Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)">
                    <img src="/images/logo/facebook_logo.png" />
                    <span>Đăng nhập bằng Facebook</span>
                </a>
            </div>
        </div>
    );
}

export default Login;