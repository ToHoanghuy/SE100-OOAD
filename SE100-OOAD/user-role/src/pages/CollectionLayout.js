import React from 'react';
import { Outlet } from 'react-router-dom';
function CollectionLayout() {
    return (
        <div className="user_section">
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Bộ sưu tập</span>
            </div>
            <div className="user_content_section user_section_frame">
                <Outlet /> {/* Nội dung của các trang con */}
            </div>
        </div>
    );
}
export default CollectionLayout;