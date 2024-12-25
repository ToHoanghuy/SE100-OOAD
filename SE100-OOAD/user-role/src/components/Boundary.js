import React, { useState, useRef, useEffect } from 'react';

function Boundary({boundary, onBoundaryClick }) {
    const handleClick = (index) => {
        // Gọi hàm từ props để xử lý logic
        onBoundaryClick(index);
    };

    return (
        <div class="boundary_container">
            <span className={`boundary_ele ${boundary === 1 ? 'current_boundary' : ''}`} onClick={() => handleClick(1)}>Tổng quan</span>
            <span className={`boundary_ele ${boundary === 2 ? 'current_boundary' : ''}`} onClick={() => handleClick(2)}>Thông tin phòng trống</span>
            <span className={`boundary_ele ${boundary === 3 ? 'current_boundary' : ''}`} onClick={() => handleClick(3)}>Đánh giá của khách hàng</span>
        </div>
    )
}

export default Boundary;