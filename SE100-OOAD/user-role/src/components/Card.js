import React, { useState, useRef, useEffect, forwardRef } from 'react';


const Card = forwardRef(({ name, imgSrc }, ref) => {
    return (
        <div className="card_ele province_card OpacityEffect" ref={ref}>
            <img className="card_img" src={imgSrc}/>
            <span className="discover_card_name">{name}</span>
        </div>
    );
});

export default Card;