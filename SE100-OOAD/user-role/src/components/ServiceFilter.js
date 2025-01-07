import React, { useState, useRef, useEffect, forwardRef } from 'react';

function ServiceFilter({name}) {
    const [isCheck, setIsCheck] = useState(false);
    const toggleCheck = () => {
        setIsCheck(!isCheck);
    };
    
    return (
        <div className='service_filter_row'>
            <i onClick={toggleCheck} className={`fa-regular ${isCheck ? 'fa-square-check' : 'fa-square'}`}></i>
            <span>{name}</span>
        </div>
    );
};

export default ServiceFilter;