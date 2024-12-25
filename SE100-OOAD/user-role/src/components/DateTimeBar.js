import React, { useState, useRef, useEffect } from 'react';

function DateTimeBar({ toggleOption, showOptions, selectionBtnRef, selectionOptionRef }) {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const [calendarMonth1, setCalendarMonth1] = useState(new Date().getMonth());
    const [calendarMonth2, setCalendarMonth2] = useState(calendarMonth1 === 11 ? 0 : calendarMonth1 + 1);

    const [calendarYear1, setCalendarYear1] = useState(new Date().getFullYear());
    const [calendarYear2, setCalendarYear2] = useState(calendarMonth1 === 11 ? calendarYear1 + 1 : calendarYear1);

    const currentMonth = new Date().getMonth(); // tháng hiện tại (0-11)
    const currentYear = new Date().getFullYear(); // năm hiện tại

    const [iconId, setIconId] = useState("icon-left-hidden");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const days1Ref = useRef(null);
    const days2Ref = useRef(null);

    const [dataCalendar1, setdataCalendar1] = useState(0);
    const [dataCalendar2, setdataCalendar2] = useState(1);

    const [inputFrom, setinputFrom] = useState(null);
    const [inputTo, setinputTo] = useState(null);

    const leftCalendarRef = useRef();
    const rightCalendarRef = useRef();

    const handleDateSelect = (date, month, year, event, calenderIndex, daysOfWeekValue) => {
        const element = event.target;
        if (!startDate) {
            setStartDate({ date, month, year, calenderIndex, daysOfWeekValue });
            setinputFrom(daysOfWeekValue + ", " + date + "/" + (month + 1) + "/" + year)
        }
        else {
            if (!endDate) {
                if (date === startDate.date && month === startDate.month && year === startDate.year) {
                    setStartDate(null)
                    setinputFrom('')
                }
                else {
                    if (date > startDate.date && month === startDate.month && year === startDate.year
                        || month > startDate.month && year === startDate.year
                        || year > startDate.year) {
                        setEndDate({ date, month, year, calenderIndex, daysOfWeekValue });
                        setinputTo(daysOfWeekValue + ", " + date + "/" + (month + 1) + "/" + year)
                    }
                    else {
                        setEndDate(startDate)
                        setinputTo(startDate.daysOfWeekValue + ", " + startDate.date + "/" + (startDate.month + 1) + "/" + startDate.year)
                        setStartDate({ date, month, year, calenderIndex, daysOfWeekValue })
                        setinputFrom(daysOfWeekValue + ", " + date + "/" + (month + 1) + "/" + year)
                    }
                }
            }
            else {
                if (date === startDate.date && month === startDate.month && year === startDate.year) {
                    setStartDate(endDate)
                    setinputFrom(endDate.daysOfWeekValue + ", " + endDate.date + "/" + (endDate.month + 1) + "/" + endDate.year)
                    setEndDate(null)
                    setinputTo('')
                }
                else if (date === endDate.date && month === endDate.month && year === endDate.year) {
                    setEndDate(null)
                    setinputTo('')
                }
                else {
                    setStartDate({ date, month, year, calenderIndex, daysOfWeekValue })
                    setinputFrom(daysOfWeekValue + ", " + date + "/" + (month + 1) + "/" + year)
                    setEndDate(null)
                    setinputTo('')
                }
            }
        }
    };

    const dayContainer1 = days1Ref.current;
    const dayContainer2 = days2Ref.current;

    const handleDayBetween = (event, day, month, year, ele_cal_index) => {
        if (startDate && !endDate) {
            const span1 = dayContainer1.querySelectorAll('.dayi');
            const span2 = dayContainer2.querySelectorAll('.dayi');
            const calendar1Index = parseInt(dayContainer1.dataset.calendar);
            const calendar2Index = parseInt(dayContainer2.dataset.calendar);

            function updateBackground(span, startIdx, endIdx, color) {
                for (let i = startIdx; i <= endIdx; i++) {
                    span[i].style.background = color;
                }
            }
            function resetBackground(span, startIdx, endIdx) {
                for (let i = startIdx; i < endIdx; i++) {
                    span[i].style.background = 'transparent';
                }
            }

            if (startDate.calenderIndex == calendar1Index) {
                if (ele_cal_index == calendar1Index) {
                    if (day >= startDate.date) {
                        updateBackground(span1, startDate.date, day - 1, '#f0f0f0');
                        resetBackground(span1, day, span1.length);
                        resetBackground(span1, 0, startDate.date - 1);
                        resetBackground(span2, 0, span2.length);
                    }
                    else {
                        updateBackground(span1, day - 1, startDate.date - 1, '#f0f0f0');
                        resetBackground(span1, 0, day - 1);
                        resetBackground(span1, startDate.date, span1.length);
                        resetBackground(span2, 0, span2.length);
                    }
                }
                else if (ele_cal_index == calendar2Index) {
                    updateBackground(span1, startDate.date, span1.length - 1, '#f0f0f0');
                    updateBackground(span2, 0, day - 1, '#f0f0f0');
                    resetBackground(span2, day, span2.length);
                    resetBackground(span1, 0, startDate.date);
                }
            } else if (startDate.calenderIndex == calendar2Index) {

                if (ele_cal_index == calendar1Index) {
                    updateBackground(span1, day - 1, span1.length - 1, '#f0f0f0');
                    updateBackground(span2, 0, startDate.date - 1, '#f0f0f0');
                    resetBackground(span1, 0, day - 1);
                    resetBackground(span2, startDate.date, span2.length);
                }
                else if (ele_cal_index == calendar2Index) {
                    if (day >= startDate.date) {
                        updateBackground(span2, startDate.date, day - 1, '#f0f0f0');
                        resetBackground(span2, day, span2.length);
                        resetBackground(span1, 0, span1.length);
                        resetBackground(span2, 0, startDate.date);
                    }
                    else {
                        updateBackground(span2, day - 1, startDate.date - 1, '#f0f0f0');
                        resetBackground(span2, 0, day - 1);
                        resetBackground(span2, startDate.date - 1, span2.length);
                        resetBackground(span1, 0, span1.length);
                    }
                }
            } else if (startDate.calenderIndex < calendar1Index) {
                if (ele_cal_index == calendar1Index) {
                    updateBackground(span1, 0, day - 1, '#f0f0f0');
                    resetBackground(span1, day, span1.length);
                    resetBackground(span2, 0, span2.length);
                } else if (ele_cal_index == calendar2Index) {
                    updateBackground(span1, 0, span1.length - 1, '#f0f0f0');
                    updateBackground(span2, 0, day, '#f0f0f0');
                    resetBackground(span2, day, span2.length);
                }
            } else if (startDate.calenderIndex > calendar2Index) {
                if (ele_cal_index == calendar1Index) {
                    updateBackground(span1, day - 1, span1.length - 1, '#f0f0f0');
                    resetBackground(span1, 0, day - 1);
                    updateBackground(span2, 0, span2.length - 1, '#f0f0f0');
                } else if (ele_cal_index == calendar2Index) {
                    updateBackground(span2, day - 1, span2.length - 1, '#f0f0f0');
                    resetBackground(span2, 0, day - 1);
                    resetBackground(span1, 0, span1.length);
                }
            }
        }
    };

    let flag = false
    if (startDate && endDate && startDate.calenderIndex < dataCalendar1 && (endDate.calenderIndex >= dataCalendar1 || endDate.calenderIndex === dataCalendar2)) flag = true

    const generateCalendar = (month, year, calendarIndex, index) => {
        const dayContainer = calendarIndex === 1 ? leftCalendarRef.current : rightCalendarRef.current;
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const days = [];

        if (days1Ref.current && days2Ref.current) {
            if (calendarIndex == 1) days1Ref.current.setAttribute('data-calendar', index);
            else if (calendarIndex == 2) days2Ref.current.setAttribute('data-calendar', index);
        }

        // những ngày của tháng trước thì không hiện
        let days_of_week_index = 0
        for (let i = 0; i < firstDay; i++) {
            days.push(<span key={`empty-${i}`}></span>);
            if (days_of_week_index === 6) days_of_week_index = 0
            else days_of_week_index++
        }

        const today = new Date()
        let day = 1
        for (let i = 1; i <= totalDays; i++) {
            const day_of_week_value = daysOfWeek[days_of_week_index]
            if (startDate && endDate && day === startDate.date && month === startDate.month && year === startDate.year) flag = true;

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                days.push(
                    <span
                        key={i}
                        className={`day_after day_today dayi
                            ${startDate && i === startDate.date && month === startDate.month && year === startDate.year ? 'selected_date' : ''} 
                            ${endDate && i === endDate.date && month === endDate.month && year === endDate.year ? 'selected_date' : ''}
                            `
                        }
                        style={{ background: startDate && endDate && flag ? '#f0f0f0' : 'transparent' }}
                        onClick={(e) => handleDateSelect(i, month, year, e, index, day_of_week_value)}
                        onMouseOver={(e) => handleDayBetween(e, i, month, year, index)}
                    >{i}</span>
                );
            }
            else {

                if (day < today.getDate() && month <= today.getMonth() && year === today.getFullYear()) {
                    days.push(
                        <span
                            key={i}
                            className="day_before dayi"
                            style={{ background: startDate && endDate && flag ? '#f0f0f0' : 'transparent' }}
                        >{i}</span>
                    );
                }
                else {
                    days.push(
                        <span
                            key={i}
                            className={`day_after dayi
                                ${startDate && i === startDate.date && month === startDate.month && year === startDate.year ? 'selected_date' : ''} 
                                ${endDate && i === endDate.date && month === endDate.month && year === endDate.year ? 'selected_date' : ''}
                              
                                `}
                            style={{
                                background: startDate && endDate && flag ? '#f0f0f0' : 'transparent'
                            }}
                            onClick={(e) => handleDateSelect(i, month, year, e, index, day_of_week_value)}
                            onMouseOver={(e) => handleDayBetween(e, i, month, year, index)}
                        >{i}</span>
                    );
                }
            }
            if (days_of_week_index === 6) days_of_week_index = 0
            else days_of_week_index++

            if (startDate && endDate && day === endDate.date && month === endDate.month && year === endDate.year) flag = false;
            day++;


        }
        return days;
    };

    const handleDayClick = (day, month, year, calendarIndex) => {
        // Handle day click logic here, you can pass selected dates to parent or handle state
        console.log(`Day selected: ${day}-${month + 1}-${year}`);
    };


    useEffect(() => {
        // Generate calendars on mount or when months/years change
        generateCalendar(calendarMonth1, calendarYear1, 1, dataCalendar1);
        generateCalendar(calendarMonth2, calendarYear2, 2, dataCalendar2);
    }, [calendarMonth1, calendarYear1, calendarMonth2, calendarYear2]);


    return (
        <div className="date_time">
            <div className="selection_btn"
                onClick={toggleOption}
                ref={selectionBtnRef}
            >
                <img src="/images/logo/calendar_.png" />
                <input type="text" className="input_date" id="date_input" readOnly value={inputFrom} placeholder="Từ ngày" />
                <hr />
                <input type="text" className="input_date" id="date_input2" readOnly value={inputTo} placeholder="Đến ngày" />
                <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="selection_option" ref={selectionOptionRef}>
                <div className="selection_option_layout">
                    <div className="calendar" ref={leftCalendarRef}>
                        <div className="calendar-header">
                            <span className="month-year">{`${months[calendarMonth1]} ${calendarYear1}`}</span>
                        </div>
                        <div className="calendar-body">
                            <div className="weekdays">
                                <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
                            </div>
                            <div className="days" ref={days1Ref}>
                                {generateCalendar(calendarMonth1, calendarYear1, 1, dataCalendar1)}
                            </div>
                        </div>
                    </div>

                    <div className="calendar" ref={rightCalendarRef}>
                        <div className="calendar-header">
                            <span className="month-year">{`${months[calendarMonth2]} ${calendarYear2}`}</span>
                            <button className='month_btn' onclick="PreMonth(event)" >
                                <i className={`fa-solid fa-angle-left ${calendarMonth1 === currentMonth && calendarYear1 === currentYear ? 'icon-hidden' : 'icon-move'}`}
                                    onClick={() => {
                                        if (!(calendarMonth1 === currentMonth && calendarYear1 === currentYear)) {
                                            setCalendarMonth1(calendarMonth1 === 0 ? 11 : calendarMonth1 - 1);
                                            setCalendarMonth2(calendarMonth2 === 0 ? 11 : calendarMonth2 - 1);
                                            setCalendarYear1(calendarMonth1 === 0 ? calendarYear1 - 1 : calendarYear1);
                                            setCalendarYear2(calendarMonth2 === 0 ? calendarYear2 - 1 : calendarYear2);
                                            setdataCalendar1(dataCalendar1 - 1)
                                            setdataCalendar2(dataCalendar2 - 1)
                                        }
                                    }}></i>
                            </button>

                            <button className='month_btn' onclick="NextMonth(event)">
                                <i className="fa-solid fa-angle-right icon-move" onClick={() => {
                                    setCalendarMonth1(calendarMonth1 === 11 ? 0 : calendarMonth1 + 1);
                                    setCalendarMonth2(calendarMonth2 === 11 ? 0 : calendarMonth2 + 1);
                                    setCalendarYear1(calendarMonth1 === 11 ? calendarYear1 + 1 : calendarYear1);
                                    setCalendarYear2(calendarMonth2 === 11 ? calendarYear2 + 1 : calendarYear2);
                                    setdataCalendar1(dataCalendar1 + 1)
                                    setdataCalendar2(dataCalendar2 + 1)
                                }}></i>
                            </button>
                        </div>

                        <div className="calendar-body">
                            <div className="weekdays">
                                {daysOfWeek.map((day, index) => (
                                    <span key={index}>{day}</span>
                                ))}
                                {/* <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span> */}
                            </div>
                            <div className="days" ref={days2Ref}>
                                {generateCalendar(calendarMonth2, calendarYear2, 2, dataCalendar2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimeBar;
