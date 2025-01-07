import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate  } from 'react-router-dom';
import Swal from "sweetalert2";
import TypeWritting from '../components/TypeWritting';
import FileInputEmail from '../components/FileInputEmail';
import FileInputPasswork from '../components/FileInputPasswork';
import '../styles/Login.css';
// import Cookies from "js-cookie";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSecondText, setShowSecondText] = useState(false);

    const [checkEmail, setCheckEmail] = useState(true);
    const [checkPassword, setCheckPassword] = useState(true);
    const navigate = useNavigate();

    // const handleLogin2 = async () => {
    //     alert('hi')
    // }
    const handleLogin = async () => {
        console.log('email: ', email)
        console.log('password: ', password)

        if (!email) setCheckEmail(false)
        else setCheckEmail(true)

        if (!password) setCheckPassword(false);
        else setCheckPassword(true)
        if (email && password) 
        {
            try {
                const response = await fetch("http://localhost:3000/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "userEmail": email,
                        "userPassword": password,
                    }),
                    // credentials: 'include', // Để gửi và nhận cookie
                });
                const data = await response.json();
                console.log("data", data)
                
                if (response.ok)
                {
                    
                    if (data.data) {
                        localStorage.setItem('authToken', data.data);
                    }
                    Swal.fire({
                        title: 'Đăng nhập',
                        text: 'Thành công',
                        icon: 'success',
                        // confirmButtonText: 'Tiếp tục',
                        timer: 1500, // Tự động đóng sau 2 giây
                        showConfirmButton: false, // Ẩn nút xác nhận
                    });
                    navigate("/");
                }
            }
            catch (error) {
                console.error("Login error: An error occurred. Please try again");
            }
        }
        console.log(localStorage.getItem("authToken"));
    };


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
            <Helmet>
                <title>Travel Social | Đăng Nhập</title>
            </Helmet>
            <Link to="/" class="comeback">
                <i class="fa-solid fa-angles-left"></i>
                <span class="comeback_text"> Quay lại</span>
            </Link>
            <form className="login_container">
                {/* <div className="login_container"> */}
                <div class="login_title OpacityEffect">
                    <img class="login_logo" src="/images/logo.png" />
                    <span class="login_title_text">Đăng nhập</span>
                </div>
                <TypeWritting classNameValue={'login_welcome_text'} content={'Chào mừng bạn trở lại với Travel Social'} />
                {!showSecondText && (<TypeWritting classNameValue={'login_desc_text'} />)}{/* này là để giữ vị trí cho TypeWritting ở dưới tạm thời thôi */}
                {showSecondText && (
                    <TypeWritting classNameValue={'login_desc_text'} content={'Vui lòng đăng nhập để tiếp tục'} />
                )}
                <FileInputEmail value={email} onChange={setEmail} checkNull={checkEmail} setCheckEmail={setCheckEmail}/>
                <FileInputPasswork value={password} onChange={setPassword} checkNull={checkPassword} setCheckPassword={setCheckPassword}/>
                <div class="sub_input OpacityEffect">
                    <div class="remember_password">
                        <input type="checkbox" class="remember_password_checkbox" />
                        <span class="remember_password_text">Nhớ mật khẩu</span>
                    </div>
                    <div class="forgot_password">
                        <a class="forgot_password_text">Quên mật khẩu?</a>
                    </div>
                </div>
                <button class="button_frame login_button Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onClick={handleLogin}> Đăng nhập ngay</button>
                <div class="input_other OpacityEffect">
                    <hr />Hoặc<hr />
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
                {/* </div> */}
            </form>
        </div>
    );
}

export default Login;