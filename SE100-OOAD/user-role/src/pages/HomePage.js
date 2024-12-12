import React, { useState, useRef, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import BoxSlider from '../components/BoxSlider';
import SearchBar from '../components/SearchBar';
import DiscoverContainer from '../components/DiscoverContainer';
import ProposeContainer from '../components/ProposeContainer';

import '../styles/HomePage.css';
import '../styles/SearchBar.css';


function HomePage() {
    return (
        <div>
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
                    <div class="residence_note zoomEffect">
                    </div>
                    <div class="residence_note zoomEffect">
                    </div>
                    <div class="residence_note zoomEffect">
                    </div>
                </div>
            </div>
            <ProposeContainer title="Đề xuất cho bạn" />
            <div class="note_container">
                <img class="app_ads_banner zoomEffect" src="/images/app-ads-banner.png" />
            </div>
            <ProposeContainer title="Ưu đãi bất ngờ" />

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
            <br/><br/><br/>
            
        </div>
    )
}

export default HomePage;