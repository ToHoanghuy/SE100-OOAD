import React, { useState, useRef, useEffect } from 'react';

function RatingBar({value, percentage}) {
    return (
        <div class="rating_bar_container OpacityEffect" >
            <div class="rating_bar_value"><span>{value}</span><i class="fa-solid fa-star"></i></div>
            <div class="rating_bar">
                <div class="fill_raiting_bar"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <span class="raiting_percentage">{percentage}%</span>
        </div>
    )
}

export default RatingBar;