import React, { useState, useRef, useEffect } from 'react';
import '../styles/WhiteMenuBar.css';
import { Link, useNavigate } from 'react-router-dom';

function MenuBar() {
    const [user, setUser] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [subUserMenu, setSubUserMenu] = useState(false);
    const userRef = useRef(null);

    const getUser = async (e) => {
        try {
            const response = await fetch(`http://localhost:3000/user/getbyid/${localStorage.getItem("authToken")}`);
            const data = await response.json();
            // console.log('User :',data.data)
            if (data.isSuccess) {
                setUser(data.data);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    };


    const handleOpenSubUserMenu = () => {
        setSubUserMenu(!subUserMenu);
    };
    const handleClickOutside = (e) => {
        e.preventDefault();
        // Kiểm tra nếu click không nằm trong menu
        if ((userRef.current && !userRef.current.contains(e.target))) {
            setSubUserMenu(false); // Đóng menu
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("authToken"));
        getUser();
    }, [localStorage.getItem("authToken")]);

    return (
        <div className="menu_bar">
            <div className="left_side">
                <div className="logo">
                    <img src="/images/logo.png" />
                </div>
                <Link to='/' className="menu_bar_text current_page">Trang Chủ</Link>
                <Link className="menu_bar_text">Địa điểm</Link>
                <span className="menu_bar_text">Giới thiệu</span>
            </div>
            <div className="right_side">
                <div className="round_frame">
                    <img className="national_area" src="/images/vietnam.png" />
                </div>
                <div className="round_frame">
                    <div className="contact "><i className="fa-solid fa-headphones"></i></div>
                </div>
                {!isLoggedIn &&
                    <div className="login_user_container">
                        <Link to='/login' className="login_button_text">Đăng nhập</Link>
                        <Link to='/register' className="menu_bar_text">Đăng ký</Link>
                    </div>
                }
                {isLoggedIn &&
                    <div className="personal_frame">
                        <div className="bell_frame">
                            <i className="fa-regular fa-bell"></i>
                            <span className="bell_note">1</span>
                        </div>
                        <div className="user_frame" ref={userRef} onClick={handleOpenSubUserMenu}>
                            <img className="user_avt_bar" src="/images/default_avt.jpg" />
                            <div className="user_name_bar" >{user.userName}</div>
                            <i className="fa-solid fa-angle-down"></i>
                            {subUserMenu &&
                                <div className='sub_user_menu'>
                                    <Link to='/user/account/info' className='sub_user_menu_row'>
                                        <i class="fa-solid fa-user"></i>
                                        <span>Thông tin cá nhân</span>
                                    </Link>
                                    <Link to='user/storage/favorite' className='sub_user_menu_row'>
                                        <i class="fa-solid fa-heart"></i>
                                        <span>Bộ sưu tập</span>
                                    </Link >
                                    <Link to='user/storage/historybooking' className='sub_user_menu_row'>
                                        <i class="fa-solid fa-clipboard"></i>
                                        <span>Lịch sử đặt phòng</span>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                }
                <div className="side_bar"><i className="fa-solid fa-bars"></i></div>
            </div>
        </div>
    );
}

export default MenuBar;