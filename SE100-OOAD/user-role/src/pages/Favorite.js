import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import '../styles/Collection.css';

function Favorite() {

    const gradients = [
        "linear-gradient(45deg, #FFD1DC, #FFE5B4)", // Hồng phấn sáng -> Cam nhạt
        "linear-gradient(45deg, #CDEFFD, #D4FCE4)", // Xanh nhạt -> Xanh lá tươi
        "linear-gradient(45deg, #D3E5FF, #D4F1FC)", // Xanh da trời -> Xanh biển tươi
        "linear-gradient(45deg,rgb(255, 250, 198),rgb(255, 237, 191))",  // Vàng nhạt -> Kem tươi
        "linear-gradient(45deg,rgb(255, 230, 254),rgb(240, 223, 255))", // Hồng tím -> Tím nhạt
      ];
    
      // Hàm lấy màu gradient dựa trên thứ tự
      const getGradient = (index) => {
        return gradients[index % gradients.length];
      };

    return (
        <div class="user_section">
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Yêu thích</span>
            </div>
            <div className="user_content_section user_section_frame">
                <div className='all_collection'>
                    <div className='collection_frame add_collection'>
                        <i class="fa-solid fa-plus"></i>
                        <span>Thêm mới</span>
                    </div>
                    <div className='collection_frame collection'
                    style={{background: getGradient(0),}}>
                        sadsd
                    </div>
                    <div className='collection_frame collection'
                    style={{background: getGradient(1),}}>
                        sadsd
                    </div>
                    <div className='collection_frame collection'
                    style={{background: getGradient(2),}}>
                        sadsd
                    </div>
                    <div className='collection_frame collection'
                    style={{background: getGradient(3),}}>
                        sadsd
                    </div>
                    <div className='collection_frame collection'
                    style={{background: getGradient(4),}}
                    >
                        sadsd
                    </div>
                    <div className='collection_frame collection'
                    style={{background: getGradient(5),}}
                    >
                        sadsd
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Favorite;