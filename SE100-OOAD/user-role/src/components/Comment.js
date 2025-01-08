import React, { useState, useRef, useEffect } from 'react';

// function Comment({ userName, userRating, commentContent, avatarSrc }) {
function Comment({ review }) {
    const [sender, setSender] = useState([]);

    const getSender = async (senderId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/getbyid/${senderId}`);
            const result = await response.json();
            if (response.ok && result.isSuccess) {
                console.log('Sender: ', result.data);
                setSender(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getSender(review.senderId);
    }, []);

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

    if (sender && review) {
        return (
            <div className="comment OpacityEffect">
                <div className="comment_left_side">
                    <div className="user_avt">
                        <img src={sender.userAvatar || '/images/default_avt.jpg'} alt="User Avatar" />
                    </div>
                </div>
                <div className="comment_right_side">
                    <span className="user_name">{sender.userName}</span>
                    <div className="user_raiting previous_review" data-userraiting={review.rating}>
                        {renderStars(review.rating)}{/* Render rating bằng stars ở đây */}
                    </div>
                    <span className="comment_content">{review.review}</span>
                </div>
            </div>
        )
    }
}

export default Comment;