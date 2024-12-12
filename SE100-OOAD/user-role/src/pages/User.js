import { Routes, Route, Link, useLocation, Outlet, Location } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import '../styles/User.css';

function User() {
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const location = useLocation();

    const toggleSubMenu = (index) => {
        setActiveSubMenu((prev) => (prev === index ? null : index));
    };

    const closeAllSubMenus = () => {
        setActiveSubMenu(null);
    };

    const path = location.pathname.split('/').slice(0, 3).join('/');
    useEffect(() => {
        if (path === "/user/account") {
            setActiveSubMenu(0);
        } 
    }, [location.pathname]);

    return (
        <div>
            <div className="user_bar">
                <div className="avt_container">
                    <div className="avt_frame">
                        <img className="user_avt_img" src="/images/avt.jpg" alt="User Avatar" />
                        <div className="edit_avt_btn">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                    </div>
                    <span className="user_name">Hiếu Nghĩa cute</span>
                </div>
                <ul className="user_menu">
                    <li className="li_row_angle">
                        <div className={`user_menu_row row_angle ${path === "/user/account" ? "current_user_row" : ""}`}
                            onClick={() => toggleSubMenu(0)}>
                            <i className="fa-regular fa-user user_menu_icon"></i>
                            <span className="user_menu_title">Tài khoản của bạn</span>
                            <i className="fa-solid fa-angle-down user_menu_icon_angle"></i>
                        </div>
                        <ul className={`user_sub_menu ${activeSubMenu === 0 ? "active" : ""}`}>
                            <li>
                                <Link to="/user/account/info"
                                    className={`user_sub_menu_row ${location.pathname === "/user/account/info" ? "current_user_row" : ""}`}
                                >
                                    <i className="fa-solid fa-pencil user_sub_menu_icon"></i>
                                    <span className="user_sub_menu_title">Thông tin cá nhân</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/account/passwork"
                                    className={`user_sub_menu_row ${location.pathname === "/user/account/passwork" ? "current_user_row" : ""}`}
                                >
                                    <i className="fa-solid fa-lock user_sub_menu_icon"></i>
                                    <span className="user_sub_menu_title">Thay đổi mật khẩu</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/user/notification"
                            className={`user_menu_row ${location.pathname === "/user/notification" ? "current_user_row" : ""}`}
                            onClick={() => closeAllSubMenus()}
                        >
                            <i className="fa-regular fa-bell user_menu_icon"></i>
                            <span className="user_menu_title">Thông báo</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/booking"
                            className={`user_menu_row ${location.pathname === "/user/booking" ? "current_user_row" : ""}`}
                            onClick={() => closeAllSubMenus()}>
                            <i className="fa-regular fa-clipboard user_menu_icon"></i>
                            <span className="user_menu_title">Lịch sử đặt phòng</span>
                        </Link>
                    </li>
                    <li className="li_row_logout">
                        <a href="Login.html" className="user_menu_row logout">
                            <i className="fa-solid fa-angles-left user_menu_icon"></i>
                            <span className="user_menu_title">Đăng xuất</span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* Vùng render các trang con của User */}
            <Outlet />
        </div>
    );
}

export default User;
