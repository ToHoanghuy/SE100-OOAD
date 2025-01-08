import { Routes, Route, Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import '../styles/Collection.css';
import Swal from 'sweetalert2';

function Favorite() {

    const navigate = useNavigate();
    const [collections, setCollections] = useState([]);

    const getCollections = async () => {
        try {
            const response = await fetch(`http://localhost:3000/collection/getbyuserid/${localStorage.getItem("authToken")}`);
            const result = await response.json();

            if (response.ok && result.isSuccess) {
                setCollections(result.data);  // Gán dữ liệu vào state
            } else {
                console.error(result.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        getCollections();
    }, []);

    const handleCollectionClick = (collectionId) => {
        navigate(`/user/storage/collection/${collectionId}`);
    };

    const gradients = [
        "linear-gradient(45deg, #FFD1DC, #FFE5B4)", // Hồng phấn sáng -> Cam nhạt
        "linear-gradient(45deg, #CDEFFD, #D4FCE4)", // Xanh nhạt -> Xanh lá tươi
        "linear-gradient(45deg, #D3E5FF, #D4F1FC)", // Xanh da trời -> Xanh biển tươi
        "linear-gradient(45deg,rgb(255, 250, 198),rgb(255, 237, 191))",  // Vàng nhạt -> Kem tươi
        "linear-gradient(45deg,rgb(255, 230, 254),rgb(240, 223, 255))", // Hồng tím -> Tím nhạt
    ];

    // Hàm lấy màu gradient dựa trên thứ tự
    const getGradient = (index) => {
        return gradients[index % gradients.length];
    };

    const [isInputVisible, setIsInputVisible] = useState(false); // Quản lý trạng thái hiển thị ô nhập
    const [collectionName, setCollectionName] = useState(''); // Quản lý giá trị ô nhập
    const containerRef = useRef(null);

    const handleClickCreate = () => {
        // Nếu có tên bộ sưu tập hợp lệ, thực hiện tạo
        if (collectionName.trim()) {
            Swal.fire({
                title: 'Bạn muốn tạo bộ sưu tập?',
                text: 'Vui lòng xác nhận',
                icon: 'question',
                showCancelButton: true,  // Hiển thị nút hủy
                confirmButtonText: 'Tạo', // Văn bản cho nút xác nhận
                cancelButtonText: 'Không', // Văn bản cho nút hủy
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Tiếp tục!', 'Tạo thành công', 'success');
                    
                } else if (result.isDismissed) {
                    // Khi người dùng chọn "Không"
                    Swal.fire('Hủy bỏ!', 'Bạn đã chọn hủy bỏ', 'info');
                }
            });
            setIsInputVisible(false);
                    setCollectionName(""); // Reset giá trị
        }
        
    };
    const handleEnterCreate = () => {
        // Nếu có tên bộ sưu tập hợp lệ, thực hiện tạo
        if (collectionName.trim()) {
            Swal.fire('Tiếp tục!', 'Tạo thành công', 'success');
            setIsInputVisible(false);
            setCollectionName(""); // Reset giá trị
        }
    };

    const handleKeyDown = (e) => {
        // Chỉ gọi handleCreate khi nhấn Enter
        if (e.key === 'Enter') {
            handleEnterCreate();
        }
    };

    const handleInputChange = (e) => {
        if (e.key !== 'Enter') {
            setCollectionName(e.target.value);
        }
    };


    return (
        <div className='all_collection OpacityEffect'>
            <div className='collection_frame add_collection'
                ref={containerRef}
                onClick={!isInputVisible ? () => setIsInputVisible(true) : null}
            >
                {!isInputVisible && (
                    <>
                        <i className="fa-solid fa-plus"></i>
                        <span>Thêm mới</span>
                    </>
                )}
                {isInputVisible && (
                    <
                        input
                        type="text"
                        autoFocus
                        placeholder="Nhập tên"
                        value={collectionName}
                        onChange={handleInputChange}
                        onBlur={handleClickCreate} // Xử lý khi click ra ngoài
                        onKeyDown={handleKeyDown} // Xử lý khi nhấn Enter
                    />

                )}
            </div>


            {collections.map((collection, index) => (
                <div
                    key={collection.id}
                    className="collection_frame collection"
                    style={{ background: getGradient(index) }}
                    onClick={() => handleCollectionClick(collection._id)}>
                    {collection.name}
                </div>
            ))}
        </div>
    );
}

export default Favorite;