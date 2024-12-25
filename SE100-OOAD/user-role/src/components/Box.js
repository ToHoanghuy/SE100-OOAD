// import React from 'react';
import React, { forwardRef } from 'react';

const Box = forwardRef(({ name, imgSrc, isFocus, onHover }, ref) => {
    return (
        <div
            ref={ref} // Gán ref đúng cách
            className={isFocus ? 'box-focus' : 'box'}
            onMouseOver={onHover}
        >
            <div className="box-inner zoomEffect">
                <span className="province-name">{name}</span>
                <img className="img1" src={imgSrc} alt={name} />
            </div>
        </div>
    );
});

export default Box;