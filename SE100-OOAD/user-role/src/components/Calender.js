import React, { useState, useRef, useEffect } from 'react';

function Calender({value, onDateSelect}) {
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const days1Ref = useRef(null);

    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
    const currentMonth = new Date().getMonth(); // tháng hiện tại (0-11)
    const currentYear = new Date().getFullYear(); // năm hiện tại

    const calendarRef = useRef();

    const generateCalendar = (month, year) => {
        const dayContainer = calendarRef.current;
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const days = [];
        let days_of_week_index = 0
        for (let i = 0; i < firstDay; i++) {
            days.push(<span key={`empty-${i}`}></span>);
            if (days_of_week_index === 6) days_of_week_index = 0
            else days_of_week_index++
        }

        const today = new Date()
        let day = 1
        for (let i = 1; i <= totalDays; i++) {
            // const day_of_week_value = daysOfWeek[days_of_week_index]

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                days.push(
                    <span key={i} className={`day_after day_today dayi`}
                    onClick={() => onDateSelect(`${i}/${month + 1}/${year}`)}
                    >{i}</span>
                );
            }
            else {

                if (day < today.getDate() && month <= today.getMonth() && year === today.getFullYear()) {
                    days.push(
                        <span key={i} className="day_before dayi"
                        >{i}</span>
                    );
                }
                else {
                    days.push(
                        <span
                            key={i}
                            className={`day_after dayi`}
                            onClick={() => onDateSelect(`${i}/${month + 1}/${year}`)}
                        >{i}</span>
                    );
                }
            }
            if (days_of_week_index === 6) days_of_week_index = 0
            else days_of_week_index++
            day++;
        }
        return days;
    };

    return (
        <div className="user_selection_option">
            <div className="calendar" ref={calendarRef}>
                <div className="calendar-header">
                    <span className="month-year">{`${months[calendarMonth]} ${calendarYear}`}</span>
                    <button className='month_btn' onclick="PreMonth(event)" >
                        <i className={`fa-solid fa-angle-left ${calendarMonth === currentMonth && calendarYear === currentYear ? 'icon-hidden' : 'icon-move'}`} onClick={() => {
                        if (!(calendarMonth === currentMonth && calendarYear === currentYear)) {
                            setCalendarMonth(calendarMonth === 0 ? 11 : calendarMonth - 1)
                            setCalendarYear(calendarMonth === 0 ? calendarYear - 1 : calendarYear)
                            // setdataCalendar(dataCalendar - 1)
                        }
                    }}></i>
                    </button>

                    <button className='month_btn' >
                        <i className="fa-solid fa-angle-right icon-move" onclick="NextMonth(event)" onClick={() => {
                        setCalendarMonth(calendarMonth === 11 ? 0 : calendarMonth + 1);
                        setCalendarYear(calendarMonth === 11 ? calendarYear + 1 : calendarYear);
                        // setdataCalendar(dataCalendar1 + 1)
                    }}></i>
                    </button>

                </div>
                <div className="calendar-body">
                    <div className="weekdays">
                        <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
                    </div>
                    <div className="days">
                        {generateCalendar(calendarMonth, calendarYear)}
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Calender;