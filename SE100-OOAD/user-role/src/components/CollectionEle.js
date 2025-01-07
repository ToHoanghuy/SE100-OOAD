import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../function/functionEffect';
import '../styles/Collection.css';

function CollectionEle ({ ele, key }) {
    // const handleClick = (event) => {
    //     event.stopPropagation();
    //     event.preventDefault();
    // };


    return (
        <Link 
        // to={`/detail/${path}`} 
        key={key} className='booking_ele'
        >
            <div className="booking_ele_left">
                <img src={ele?.image[0]?.url} alt={ele.name} />
            </div>
            <div className="booking_ele_right">
                <span className="favorite_name">{ele.name}</span>


            </div>
        </Link>
    );
}

export default CollectionEle;