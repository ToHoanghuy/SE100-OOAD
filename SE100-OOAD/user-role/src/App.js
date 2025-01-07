import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/Contact';
import Detail from './pages/Detail';
import User from './pages/User';
import UserInfo from './pages/UserInfo';
import UserPasswork from './pages/UserPasswork';
import HistoryBooking from './pages/HistoryBooking';
import ChatPage from './pages/ChatPage';
import Notification from './pages/Notification';
import Favorite from './pages/Favorite';
import Booking from './pages/Booking';

import './styles/styleForAll.css';


// import WhiteMenuBar from '../components/WhiteMenuBar.js'; 

import WhiteMenuBar from './components/WhiteMenuBar';

function App() {

  const location = useLocation();
  const backToTop = useRef(null);

  useEffect(() => {
   
    window.scrollTo(0, 0);    
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {

      const zoomElements = document.querySelectorAll('.zoomEffect');
      zoomElements.forEach((zoom) => {
        const rect = zoom.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0 && !zoom.classList.contains('visible')) {
          zoom.classList.add('visible');
        }
      });

      const opacityElements = document.querySelectorAll('.OpacityEffect');
      opacityElements.forEach((opacity) => {
        const rect = opacity.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0 && !opacity.classList.contains('showOpacity')) {
          opacity.classList.add('showOpacity');
        }
      });

      const screenHeight = window.innerHeight;
      var back_To_Top = backToTop.current;

      if (window.scrollY >= screenHeight) {
        back_To_Top.style.transform = `translateX(0)`;
      } else {
        back_To_Top.style.transform = `translateX(${130}%)`;
      }
    };


    window.addEventListener('scroll', handleScroll);// Lắng nghe sự kiện scroll và load
    handleScroll();

    return () => {// Cleanup sự kiện khi component bị unmounted
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className="App">
      <div class="back_to_top Water_Drop_Effect" onClick={handleBackToTop} ref={backToTop}>
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
      </div>
      <nav>
        <WhiteMenuBar />
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/detail' element={<Detail />} /> */}
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/user" element={<User />}>
          <Route index element={<Navigate to="account/info" replace />} />
          <Route path="account/info" element={<UserInfo />} />
          <Route path="account/passwork" element={<UserPasswork />} />
          <Route path="notification" element={<Notification />} />
          <Route path="storage/historybooking" element={<HistoryBooking />} />
          <Route path="storage/chat" element={<ChatPage />} />
          <Route path="storage/favorite" element={<Favorite />} />
          {/* <Route path="settings" element={<UserSettings />} /> */}
        </Route>
        <Route path="/booking" element={<Booking/>} />
      </Routes>

    </div>
  );
}

export default App;