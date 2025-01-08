import React from 'react';
import { FaBell, FaArrowDown } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../store/slides/userSlide';
import { Link, useNavigate } from 'react-router-dom';


const Header = ({ mainTitle,subTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('dispatch: ', dispatch);  // Log out dispatch to see if it's available
  const userInfo = useSelector((state) => state.user.userInfo);
  const [userData, setUserDataa] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('userId');
      console.log('log in header: ',userId);
      try {
        console.log('abc');
        const response = await fetch(`http://localhost:3000/user/getbyid/${userId}`);
        const data = await response.json();
        dispatch(setUserData(data.data));
        setUserDataa(data.data);
        console.log('usdata: ',data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'GET',
        credentials: 'include', // Include cookies in request
      });

      if (response.ok) {
        console.log('Logged out successfully');
        localStorage.removeItem('userId'); // Clear user data from localStorage
        navigate('/'); // Redirect to login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

    return (
      <div className="dashboard-header">
        <div class="header-section1">
        <div className="header-container">
          <h1 className="main-title">{mainTitle}</h1>
          {subTitle && <h2 className="sub-title">{subTitle}</h2>}
        </div>
          <div className="notification-icon bg-gray-100 p-3 rounded-lg">
            <FaBell />
          </div>
        <div className="admin-info items-center space-x-2 border rounded-lg p-2" onClick={() => setShowMenu(!showMenu)} >
          <img

            src={userData?.userAvatar || require('../assets/images/avt.png')}
            alt="Admin Avatar"
            className="admin-avatar"
          />            
          <div className="admin-details">
              <div class="font-semibold flex">
              {userData?.userName || 'Loading...'}
                  <IoIosArrowDown/>
              </div>
              <div class="text-gray-500 text-sm">
                Quản trị viên
              </div>
            </div>
            {showMenu && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 w-40">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Đăng xuất
              </button>
            </div>
          )}
          </div>
          
        </div>
        
      </div>
    );
  };
  export default Header;