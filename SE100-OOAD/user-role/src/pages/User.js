import { Routes, Route, Link, useLocation, Outlet, Locationm, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import '../styles/User.css';

function User() {
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const getUser = async () => {
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

    useEffect(() => {
        getUser();
    }, []);

    const LogOut = async () => {
        // alert('hi')
        // try {
        //     const response = await fetch("http://localhost:3000/logout", {
        //       method: "GET", // hoặc "GET" tùy thuộc vào API
        //     });

        //     if (response.ok) {
        //       alert('hi')
        //       console.log("Đăng xuất thành công!");
        //       navigate("/"); // Điều hướng về trang chủ
        //       localStorage.removeItem('authToken');
        //     } else {
        //       console.error("Đăng xuất thất bại!");
        //     }
        //   } catch (error) {
        //     console.error("Lỗi:", error);
        //   }
        // setActiveSubMenu((prev) => (prev === index ? null : index));
        localStorage.removeItem("authToken");
        navigate("/");
    };

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
                        <img className="user_avt_img" src={user.userAvatar||"/images/default_avt.jpg"} alt="User Avatar" />
                        <div className="edit_avt_btn">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                    </div>
                    <span className="user_name">{user.userName}</span>
                </div>
                <ul className="user_menu">
                    {/* Menu với submenu 1 */}
                    <li className="li_row_angle">
                        <div
                            className={`user_menu_row row_angle ${path === "/user/account" ? "current_user_row" : ""}`}
                            onClick={() => toggleSubMenu(0)}
                        >
                            <i className="fa-regular fa-user user_menu_icon"></i>
                            <span className="user_menu_title">Tài khoản của bạn</span>
                            <i className="fa-solid fa-angle-down user_menu_icon_angle"></i>
                        </div>
                        <ul className={`user_sub_menu ${activeSubMenu === 0 ? "active" : ""}`}>
                            <li>
                                <Link
                                    to="/user/account/info"
                                    className={`user_sub_menu_row ${location.pathname === "/user/account/info" ? "current_user_row" : ""
                                        }`}
                                >
                                    <i className="fa-solid fa-pencil user_sub_menu_icon"></i>
                                    <span className="user_sub_menu_title">Thông tin cá nhân</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/user/account/passwork"
                                    className={`user_sub_menu_row ${location.pathname === "/user/account/passwork" ? "current_user_row" : ""
                                        }`}
                                >
                                    <i className="fa-solid fa-lock user_sub_menu_icon"></i>
                                    <span className="user_sub_menu_title">Thay đổi mật khẩu</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link
                            to="/user/notification"
                            className={`user_menu_row ${location.pathname === "/user/notification" ? "current_user_row" : ""
                                }`}
                            onClick={() => closeAllSubMenus()}
                        >
                            <i className="fa-regular fa-bell user_menu_icon"></i>
                            <span className="user_menu_title">Thông báo</span>
                        </Link>
                    </li>
                    {/* Menu với submenu 2 */}
                    <li className="li_row_angle">
                        <div
                            className={`user_menu_row row_angle ${path === "/user/storage" ? "current_user_row" : ""}`}
                            onClick={() => toggleSubMenu(1)}
                        >
                            <i className="fa-solid fa-layer-group user_menu_icon"></i>
                            <span className="user_menu_title">Lưu trữ</span>
                            <i className="fa-solid fa-angle-down user_menu_icon_angle"></i>
                        </div>
                        <ul className={`user_sub_menu ${activeSubMenu === 1 ? "active" : ""}`}>
                            <li>
                                <Link to="/user/storage/historybooking"
                                    className={`user_sub_menu_row ${location.pathname === "/user/storage/historybooking" ? "current_user_row" : ""}`}
                                >
                                    <i className="fa-regular fa-clipboard user_sub_menu_icon"></i>
                                    <span className="user_sub_menu_title">Lịch sử đặt phòng</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/storage/chat"
                                    className={`user_sub_menu_row ${location.pathname === "/user/storage/chat" ? "current_user_row" : ""}`}
                                >
                                    <i class="fa-solid fa-comment-dots user_sub_menu_icon"></i>
                                    <span className="user_sub_menu_title">Lịch sử trao đổi</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/storage/collection"
                                    className={`user_sub_menu_row ${location.pathname === "/user/storage/collection" ? "current_user_row" : ""}`}
                                >
                                    <i class="fa-solid fa-heart user_sub_menu_icon"></i>
                                    <span className="user_sub_menu_title">Bộ sưu tập</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Menu không có submenu */}
                    <li className="li_row_logout">
                        <div className="user_menu_row logout">
                            <i className="fa-solid fa-angles-left user_menu_icon"></i>
                            <span className="user_menu_title" onClick={LogOut}>Đăng xuất</span>
                        </div>

                    </li>
                </ul>
            </div>
            {/* Vùng render các trang con của User */}
            <Outlet />
        </div>
    );
}


export default User;