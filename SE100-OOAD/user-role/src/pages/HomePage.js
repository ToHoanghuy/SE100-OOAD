import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MenuBar from '../components/MenuBar';
import BoxSlider from '../components/BoxSlider';
import SearchBar from '../components/SearchBar';
import ImageSlider from '../components/ImageSlider';
import ResidenceNote from '../components/ResidenceNote';

import DiscoverContainer from '../components/DiscoverContainer';
import ProposeContainer from '../components/ProposeContainer';

import '../styles/HomePage.css';
import '../styles/SearchBar.css';


function HomePage() {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [randomLocations, setRandomLocations] = useState([]); // State để lưu 16 location ngẫu nhiên
    const images = [
        ["/images/family1.jpg", "/images/family2.jpg", "/images/family3.jpg"],  // Nhóm 1
        [ "/images/view3.jpg", "/images/view1.jpg", "/images/view2.jpg"],  // Nhóm 2
        [ "/images/hotel3.jpg", "/images/hotel1.jpg", "/images/hotel2.jpg"]   // Nhóm 3
    ];

    const getAllLocations = async () => {
        try {
            const response = await fetch("http://localhost:3000/alllocation");
            const data = await response.json();

            if (data.isSuccess) {
                const sortedLocations = data.data.sort((a, b) => b.rating - a.rating); // Sắp xếp theo rating giảm dần

                setLocations(data.data); // Set data locations
                setFilteredLocations(sortedLocations.slice(0, 8)); // Lưu danh sách đã lọc
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false); // Đặt loading về false sau khi hoàn tất
        }
    };
    useEffect(() => {
        getAllLocations();
    }, []);
    useEffect(() => {
        if (locations.length > 0) {
            const randomLocations = locations
                .sort(() => 0.5 - Math.random()) // Trộn ngẫu nhiên
                .slice(0, 16); // Lấy 16 phần tử đầu tiên
            setRandomLocations(randomLocations);
        }
    }, [locations]);

    return (
        <div>
            <Helmet>
                <title>Travel Social | Trang Chủ</title>
                <meta name="description" content="Trang chủ của Travel Social, khám phá những địa điểm thú vị nhất." />
            </Helmet>
            <div className="header" id="header">
                <div className="background">
                    <img className="background-img" src="/images/maybay.jpg" />
                </div>
                <MenuBar />
                <BoxSlider />
            </div>
            <div class="search_bar_container">
                <SearchBar />
            </div>
            <div class="note_container">
                <div class="speacial_note">
                    <div class="note zoomEffect">
                    </div>
                    <div class="note zoomEffect">
                    </div>
                    <div class="note zoomEffect">
                    </div>
                    <div class="note zoomEffect">
                    </div>
                </div>
            </div>
            <DiscoverContainer />
            <div class="note_container">
                <div class="residence_frame">
                    {images.map((imgs, index) => (
                        <ResidenceNote images={imgs}/>
                    ))
                    }
                </div>
            </div>
            {/* <ImageSlider/> */}
            <ProposeContainer title="Được yêu thích" locations={filteredLocations} />
            <div class="note_container">
                <img class="app_ads_banner zoomEffect" src="/images/app-ads-banner.png" />
            </div>
            <ProposeContainer title="Đề xuất cho bạn" locations={randomLocations} />

            <div class="platform_container">
                <span class="container_tilte">Nền tảng của Travel Social</span>
                <div class="platform_box_container zoomEffect">
                    <div class="platform_box zoomEffect"></div>
                    <div class="platform_box zoomEffect"></div>
                    <div class="platform_box zoomEffect"></div>
                    <div class="platform_box zoomEffect"></div>
                    <div class="platform_box zoomEffect"></div>
                </div>
            </div>
            <br /><br /><br />

        </div>
    )
}

export default HomePage;