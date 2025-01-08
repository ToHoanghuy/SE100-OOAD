import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, { useState, useRef, useEffect } from 'react';
import '../styles/User.css';
import UserInfoFile from '../components/UserInfoFile';
import Swal from "sweetalert2";

function UserInfo() {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [selectedGender, setSelectedGender] = useState(0); // 0: Nam, 1: Nữ, 2: Khác

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

    const [userData, setUserData] = useState({
        username: "Hiếu Nghĩa cute hong",
        email: "hieunghia@gmail.com",
        phone: "0983290954",
        dob: "04-08-2004",
        address: "KTX hiện đại bậc nhất Đông Nam Á",
    });

    const [isEditing, setIsEditing] = useState({
        username: false,
        email: false,
        phone: false,
        dob: false,
        address: false,
    });

    const handleEdit = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: true,
        }));
        setIsButtonActive(true);
    };

    const handleChange = (field, value) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleGenderClick = (gender) => {
        if (gender !== selectedGender) {
            setSelectedGender(gender)
            setIsButtonActive(true) // Kích hoạt nút "Cập nhật" khi có thay đổi
        }
    };

    const handleUpdate = () => {
        Swal.fire({
            title: 'Thành Công',
            text: 'Cập nhật thông tin thành công!',
            icon: 'success',
            confirmButtonText: 'Tiếp tục',
            customClass: {
                confirmButton: 'custom_swal_button' // Tên lớp tùy chỉnh
            }
        });
        setIsEditing({
            username: false,
            email: false,
            phone: false,
            dob: false,
            address: false,
        });
    };

    return (
        <div class="user_section">
            <Helmet>
                <title>Travel Social | Thông Tin Cá Nhân</title>
            </Helmet>
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Thông tin cá nhân</span>
            </div>
            <div className="user_content_section user_section_frame">
                <UserInfoFile
                    label="Tên người dùng"
                    type="text"
                    value={user.userName}
                    placeholder="Hãy nhập tên"
                    isEditing={isEditing.username}
                    onEdit={() => handleEdit("username")}
                    onChange={(value) => handleChange("username", value)}
                />
                <UserInfoFile
                    label="Email"
                    type="email"
                    value={user.userEmail}
                    placeholder="Cập nhật email"
                    isEditing={isEditing.email}
                    onEdit={() => handleEdit("email")}
                    onChange={(value) => handleChange("email", value)}
                />
                <UserInfoFile
                    label="Số điện thoại"
                    type="text"
                    value={user.userPhoneNumber||''}
                    placeholder="Cập nhật số điện thoại"
                    isEditing={isEditing.phone}
                    onEdit={() => handleEdit("phone")}
                    onChange={(value) => handleChange("phone", value)}
                />
                <UserInfoFile
                    label="Ngày sinh"
                    type="date"
                    value={user.userDateOfBirth||''}
                    placeholder="Cập nhật ngày sinh"
                    isEditing={isEditing.dob}
                    onEdit={() => handleEdit("dob")}
                    onChange={(value) => handleChange("dob", value)}
                    dob={true}
                />
                {/* <div className="input_user_frame OpacityEffect">
                    <label>Giới tính</label>
                    <div className="file_checkbox_user">
                        <div className="file_checkbox"
                            onClick={() => handleGenderClick(0)}
                        >
                            <i className={`fa-regular ${selectedGender === 0 ? "fa-circle-dot" : "fa-circle"} check_gender`}></i>
                            <span>Nam</span>
                        </div>
                        <div className="file_checkbox"
                            onClick={() => handleGenderClick(1)}
                        >
                            <i className={`fa-regular ${selectedGender === 1 ? "fa-circle-dot" : "fa-circle"} check_gender`}></i>
                            <span>Nữ</span>
                        </div>
                        <div className="file_checkbox"
                            onClick={() => handleGenderClick(2)}
                        >
                            <i className={`fa-regular ${selectedGender === 2 ? "fa-circle-dot" : "fa-circle"} check_gender`}></i>
                            <span>Khác</span>
                        </div>
                    </div>
                </div> */}
                <UserInfoFile
                    label="Địa chỉ"
                    type="text"
                    value={user.userAddress||''}
                    placeholder="Cập nhật địa chỉ"
                    isEditing={isEditing.address}
                    onEdit={() => handleEdit("address")}
                    onChange={(value) => handleChange("address", value)}
                />

                <div className="button_user_frame OpacityEffect">
                    <button
                        id="edit_info_btn"
                        className={`update_info ${isButtonActive ? "editing_btn" : "no_editing_btn"} Water_Drop_Effect`}
                        onClick={handleUpdate}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;