import React, { useState, useRef, useEffect } from 'react';

function Comment({ userName, userRating, commentContent, avatarSrc }) {
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<i key={i} className="fa-solid fa-star"></i>);  // Sao solid
            } else {
                stars.push(<i key={i} className="fa-regular fa-star"></i>);  // Sao regular
            }
        }
        return stars;
    };
    
    return (
        <div className="comment OpacityEffect">
            <div className="comment_left_side">
                <div className="user_avt">
                    <img src={avatarSrc} alt="User Avatar" />
                </div>
            </div>
            <div className="comment_right_side">
                <span className="user_name">{userName}</span>
                <div className="user_raiting previous_review" data-userraiting={userRating}>
                    {renderStars(userRating)}{/* Render rating bằng stars ở đây */}
                </div>
                <span className="comment_content">{commentContent}</span>
            </div>
        </div>
    )
}

export default Comment;