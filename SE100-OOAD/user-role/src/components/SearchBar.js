import React, { useState, useRef, useEffect } from 'react';
import LocationBar from '../components/LocationBar';
import ResidenceBar from '../components/ResidenceBar';
import DateTimeBar from '../components/DateTimeBar';
import QuantityBar from '../components/QuantityBar';



function SearchBar() {

    const [showOptions, setShowOptions] = useState([false,false]); // Mảng trạng thái cho các dropdown
    const selectionOptionRefs = useRef([]); // Mảng ref cho selectionOption
    const selectionBtnRefs = useRef([]); // Mảng ref cho selectionBtn

    const toggleOption = (index,n) => {
        setShowOptions(prevState => {
            const newState = [...prevState];

            newState.forEach((_, i) => {
                if (i !== index) {
                    selectionOptionRefs.current[i].style.display = 'none';
                    newState[i] = false; // Đóng dropdown ở các index khác
                }
            });

            newState[index] = !newState[index]; // Đảo ngược trạng thái cho index cụ thể
            if (selectionOptionRefs.current[index]) {
                if (newState[index]) {
                    // Khi mở dropdown
                    selectionOptionRefs.current[index].style.display = 'block';
                    const rect = selectionBtnRefs.current[index].getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    if (rect.bottom > windowHeight / 2) {
                        //option xuất hiện trên btn
                        selectionOptionRefs.current[index].style.top = 'auto';
                        selectionOptionRefs.current[index].style.bottom = `calc(100% + 10px)`; // Cách button 10px
                        if(n==1)
                        {
                            const icon=selectionBtnRefs.current[index].querySelector('.fa-solid.fa-angle-down');
                            if (icon) {
                                icon.classList.remove("fa-angle-down");
                                icon.classList.add("fa-angle-up");
                            }
                        }
                    } else {
                        selectionOptionRefs.current[index].style.bottom = 'auto';
                        selectionOptionRefs.current[index].style.top = `calc(100% + 5px)`; // Cách button 5px
                        if(n==1)
                        {
                            const icon=selectionBtnRefs.current[index].querySelector('.fa-solid.fa-angle-up');
                            if (icon) {
                                icon.classList.remove("fa-angle-up");
                                icon.classList.add("fa-angle-down");
                            }
                        }
                    }
                } else {
                    // Khi đóng dropdown
                    selectionOptionRefs.current[index].style.display = 'none';
                }
            }
            return newState; // Trả về trạng thái mới
        });
    };

    
    
    //dùng useEffect để khi click vào bất kì vị trí trong window để ẩn selection option
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInside = event.target.closest('.selection_btn');
            const dateTime = event.target.closest('.date_time .selection_option');
            // Nếu click ra ngoài .selection_btn và .selection_option
            if (!isClickInside && !dateTime) {
                setShowOptions(prevState => {
                    const newState = [...prevState];
                    newState.forEach((_, i) => {
                        // alert('hi');
                        selectionOptionRefs.current[i].style.display = 'none';
                        newState[i] = false; // Đóng dropdown ở các index khác
                    });
                    return newState;
                });
            }
        };
        // Thêm sự kiện khi component được mount
        document.addEventListener('click', handleClickOutside);
        // Dọn dẹp sự kiện khi component bị unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className="search_bar">
            <div></div>
            <LocationBar 
                toggleOption={() => toggleOption(0,0)} 
                showOptions={showOptions[0]} 
                selectionBtnRef={(el) => selectionBtnRefs.current[0] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[0] = el} // Gán ref động cho selectionOption
            />
            <ResidenceBar 
                toggleOption={() => toggleOption(1,1)} 
                showOptions={showOptions[1]} 
                selectionBtnRef={(el) => selectionBtnRefs.current[1] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[1] = el} // Gán ref động cho selectionOption
            />
            <DateTimeBar 
                toggleOption={() => toggleOption(2,1)} 
                showOptions={showOptions[2]} 
                selectionBtnRef={(el) => selectionBtnRefs.current[2] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[2] = el} // Gán ref động cho selectionOption
            />
            <QuantityBar 
                toggleOption={() => toggleOption(3,1)} 
                showOptions={showOptions[3]} 
                selectionBtnRef={(el) => selectionBtnRefs.current[3] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[3] = el} // Gán ref động cho selectionOption
            />
            <div className="search">
                <button className="search_button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div></div>
        </div>
      );

};

export default SearchBar;