import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../function/functionEffect';

function BookingHistoryEle({ booking, key, name, imgSrc, startDate, endDate, status, path }) {
    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const statusMessages = {
        pending: "Đang chờ xử lý",
        canceled: "Đã hủy",
        complete: "Hoàn thành",
        confirm: "Đã xác nhận"
    };

    return (
        <Link to={`/detail/${path}`} key={key} className='booking_ele'
        >
            <div className="booking_ele_left">
                <img src={booking.imageUrl} alt={booking.locationName} />
            </div>
            <div className="booking_ele_right">
                <span className="history_booking_name">{booking.locationName}</span>
                <div className="history_booking_date">
                    <span>{formatDate(booking.checkinDate)}</span>
                    <span className='line'>-</span>
                    <span>{formatDate(booking.checkoutDate)}</span>
                </div>
                <div className="history_booking_status">
                    <span>Tình trạng: </span>
                    <span
                        className={
                            booking.status === "pending"
                                ? "status_pending"
                                : booking.status === "canceled"
                                    ? "status_canceled"
                                    : booking.status === "complete"
                                        ? "status_complete"
                                        : booking.status === "confirm"
                                            ? "status_confirm"
                                            : "status_processing" // Default to processing if none match
                        }
                    >{statusMessages[booking.status]}</span>
                </div>
                {/* <button
                    className={`history_booking_btn ${status === "Đang xử lý" ? "btn_cancel" : "btn_rebook"
                        }`}

                    onClick={(e) => handleClick(e)}
                >
                    {status === "Đang xử lý" ? "Hủy" : "Đặt lại"}
                </button> */}

            </div>
        </Link>
    );
}

export default BookingHistoryEle;