import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaAngleRight, FaBell, FaEye, FaSearchLocation, FaEdit, FaStar, FaStarHalfAlt, FaBed, FaTimesCircle, FaHotTub, FaWifi, FaVolumeOff, FaSnowflake } from 'react-icons/fa';
import { FaRankingStar, FaX, FaPlus } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import '../styles/DetailLocationScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUser, faMapMarkerAlt, faMemo } from '@fortawesome/free-solid-svg-icons';
import { locations } from '../pages/BusinessData';
import MapComponent from "../components/MapComponent";
import MapBoxComponent from "../components/MapBoxComponent";
import { useSelector } from 'react-redux';
import '../styles/DetailLocationScreen.css';
import moment from 'moment';

const DetailLocationBusinessScreen = ({ mapLoaded }) => {

    const userData = useSelector((state) => state.user.userData);
    console.log('userdata: ', userData);
    const [currentTab, setCurrentTab] = useState('baseinfo');
    const [currentTab2, setCurrentTab2] = useState('viewratingservice');
    const { id } = useParams();
    const [latitude] = useState(10.8231);  // Thay bằng tọa độ mong muốn
    const [longitude] = useState(106.6297); // Thay bằng tọa độ mong muốn
    const [reviews, setReviews] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBaseInfoClick = () => {
        setCurrentTab('baseinfo');
    };

    const handleSpecificInfoClick = () => {
        setCurrentTab('specificinfo');
    };

    const handleRatingServiceClick = () => {
        setCurrentTab('ratingservice');
        setCurrentTab2('viewratingservice');
    };

    const handleViewDetails = (roomId) => {
        setSelectedRoomId(roomId);
        setCurrentTab2('roomDetails');
    };

    const handleViewExitRoomDetail = () => {
        setCurrentTab2('viewratingservice');
    };

    const handleAddRoom = () => {
        setCurrentTab2('addRoom');
    }

    const handleCancelAddRoom = () => {
        setCurrentTab2('viewratingservice')
    } 

    const services = [
        { id: "cancelable", name: "Hủy miễn phí trong 24h", icon: <FaTimesCircle className="mr-2 w-4" /> },
        { id: "tub", name: "Bồn tắm", icon: <FaHotTub className="mr-2 w-4" /> },
        { id: "wifi", name: "Wifi miễn phí", icon: <FaWifi className="mr-2 w-4" /> },
        { id: "volumeoff", name: "Hệ thống chống tiếng ồn", icon: <FaVolumeOff className="mr-2 w-4" /> },
        { id: "ac", name: "Máy lạnh", icon: <FaSnowflake className="mr-2 w-4" /> },
    ];

    const getFacilityIcon = (id) => {
        switch (id) {
            case "cancelable":
                return <FaTimesCircle className="mr-2 w-4 p-0" />;
            case "tub":
                return <FaHotTub className="mr-2 w-4" />;
            case 'wifi':
                return <FaWifi className="mr-2 w-4" />;
            case 'volumeoff':
                return <FaVolumeOff className="mr-2 w-4" />;
            case 'ac':
                return <FaSnowflake className="mr-2 w-4" />;
            default:
                return <FaSnowflake className="mr-2 w-4" />; // Nếu không có dịch vụ nào khớp, trả về null
        }
    };

    const handleCheckboxChange = (service) => {
        if (selectedFacilities.includes(service.id)) {
            setSelectedFacilities(selectedFacilities.filter((id) => id !== service.id));
        } else {
            setSelectedFacilities([...selectedFacilities, service.id]);
        }
        console.log(selectedFacilities);
    };

    const handleInputAddChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [formData, setFormData] = useState({
        name: "",
        quantity: 1,
        pricePerNight: 0,
        area: 0,
        singleBeds: 0,
        doubleBeds: 0,
        // beds: [],
        facilities: [],
    });

    const handleSubmit = async () => {
        const facilityList = selectedFacilities.map((id) => {
            const service = services.find((service) => service.id === id);
            return { id: service.id, name: service.name, quantity: 1, description: "" };
        });

        const roomData = {
            ...formData,
            locationId: id,
            facility: facilityList,
            capacity: formData.quantity,
            bed: [
                { category: "single", quantity: parseInt(formData.singleBeds || 0) },
                { category: "double", quantity: parseInt(formData.doubleBeds || 0) },
            ],
        };

        try {
            const response = await fetch("http://localhost:3000/room/newroom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(roomData),
            });

            const result = await response.json();

            if (result.isSuccess) {
                alert("Phòng được tạo thành công!");
            } else {
                alert("Lỗi khi tạo phòng: " + result.error);
            }
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra!");
        }
    };



    //Nơi này để chỉnh sửa dữ liệu của base-ìno//
    const [locationInfo, setLocationInfo] = useState(locations);
    const [isEditing, setIsEditing] = useState(false);



    useEffect(() => {
        const fetchLocationInfo = async () => {
            try {   
                const response = await fetch(`http://localhost:3000/locationbyid/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setLocationInfo(data.data);
                setImages(data.data.image);
                console.log('id: ', id);
                console.log('location infor: ', locationInfo);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };
        if (id) {
            fetchLocationInfo();
        }
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/review/location/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();

                const updatedReviews = await Promise.all(
                    data.data.map(async (review) => {
                        console.log('review: ',review.senderId)
                        try {
                            const userResponse = await fetch(`http://localhost:3000/user/getbyid/${review.senderId}`);
                            if (userResponse.ok) {
                                const userData = await userResponse.json();
                                return { ...review, userName: userData.data.userName }; // Thêm userName vào review
                            }
                        } catch (error) {
                            console.error(`Error fetching user data for userId ${review.userId}:`, error);
                        }
                        return { ...review, userName: 'Unknown' }; // Trường hợp không lấy được tên
                    })
                );

                setReviews(updatedReviews);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [id]);

    useEffect(() => {
        const fetchRooms = async () => {
            console.log('id:d ', id);
            try {
                const response = await fetch(`http://localhost:3000/room/getbylocationid/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch rooms');
                }
                const data = await response.json();
                console.log('data of rooms: ', data.data);
                setRooms(data.data); // Giả định API trả về một object chứa danh sách phòng trong `data.data`
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [id]);

    useEffect(() => {
        if (!selectedRoomId) return; 
    
        const fetchRoomDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/room/getbyid/${selectedRoomId}`); 
                const data = await response.json();
                console.log(data.data);
                if (response.ok) {
                    setRoomData(data.data); 
                } else {
                    console.error("Lỗi khi lấy thông tin phòng:", data);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            } finally {
                setLoading(false); 
            }
        };
    
        fetchRoomDetails(); 
    }, [selectedRoomId]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocationInfo({
            ...locationInfo,
            [name]: value
        });
    };

    const handleSaveClick = () => {
        console.log('Dữ liệu sau khi chỉnh sửa:', locationInfo);
        setIsEditing(false);

        // tại đây gọi api để cập nhật dữ liệu lên dtb
    };
    ///////////////////////////////

    //Nơi này để thay đổi dữ liệu của specificinfo
    const [editMode, setEditMode] = useState(false);
    const [images, setImages] = useState([
        "https://storage.googleapis.com/a1aa/image/ouHZc2gP3LKELBzF9b9WhRW9eF7SEgifV3ddt1F1gtse8nKnA.jpg",
        "https://storage.googleapis.com/a1aa/image/sCsVlOJSeD3UTaLoIIrOT6PxhfRdIWZr15lz5azFe8KJ9nKnA.jpg",
        "https://storage.googleapis.com/a1aa/image/2DNYdCQdMDJbBZyhIyouoG7XtT5NuAbJKXjf12XkQuoPfTlTA.jpg",
        "https://storage.googleapis.com/a1aa/image/tSYsfyPeJjhDVki0Vsk8DDATWf9vRxue66bCDKYAEBhL6PVOB.jpg",
        "https://storage.googleapis.com/a1aa/image/gwx1kHK9DQYSPN7stTexFkCK510ikafYbvOKxeRQn12K9nKnA.jpg",
        "https://storage.googleapis.com/a1aa/image/j9gNxOarjEr4DZ4gDrQF2iVtefocfFCRhseXPCdbmIoF6PVOB.jpg",
    ]);

    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const tempUrl = URL.createObjectURL(file); // Tạo URL tạm thời
            const newImage = { url: tempUrl, file }; // Lưu cả file và URL
            setImages([...images, newImage]); // Thêm vào danh sách ảnh
        }
    };

    const navigate = useNavigate();


    const [address, setAddress] = useState("FFXQ+X94, Bung Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam");

    useEffect(() => {
        // Đây là nơi bạn cập nhật địa chỉ mới khi cần
        setAddress(locationInfo.address);
    }, [id]);


    function getCategoryName(id) {
        switch (id) {
            case 'hotel':
                return 'Khách sạn';
            case 'homestay':
                return 'Homestay';
            case 'guest home':
                return 'Nhà nghỉ';
            default:
                return 'Không xác định'; // Giá trị mặc định nếu id không khớp
        }
    }


    return (
        <div class="container">
            <div class="containerformobile">


                <div class="containerlistbusiness widthlistbusiness">
                    <div class="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center">
                            <img alt="Profile picture of a person" class="w-20 h-20 rounded-full mr-4" height="80" src="https://storage.googleapis.com/a1aa/image/0FPVWfLJ1m0nJS9YfULFrbvezZsDHus5bXhqxVDA6tO9UMKnA.jpg" width="80" />
                            <div>
                                <h1 class="text-xl font-bold">
                                    {userData?.userName}
                                </h1>
                                <div class="flex items-center text-gray-600 mt-2">
                                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                                    <span>
                                        {userData?.phoneNumber || '0123456789'}
                                    </span>
                                </div>
                                <div class="flex items-center text-gray-600 mt-1">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                    <span>
                                        {userData?.userEmail || 'abc@example.com'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div class="flex">
                                <button onClick={handleBaseInfoClick} className={`flex items-center px-4 py-2 ${currentTab === 'baseinfo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg`}>
                                    {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                                    <FaSearchLocation className="mr-2 text-2xl" />
                                    <span>
                                        Thông tin tổng quan
                                    </span>
                                </button>
                                <button onClick={handleSpecificInfoClick} class={`flex items-center px-4 py-2 ${currentTab === 'specificinfo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg ml-2`}>
                                    {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                                    <MdEventNote className="mr-2 text-2xl" />
                                    <span>
                                        Thông tin địa điểm
                                    </span>
                                </button>
                                <button onClick={handleRatingServiceClick} class={`flex items-center px-4 py-2 ${currentTab === 'ratingservice' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg ml-2`}>
                                    <FaRankingStar className="mr-2 text-2xl" />
                                    <span>
                                        Dịch vụ và đánh giá
                                    </span>
                                </button>
                            </div>
                        </div>
                        {currentTab === 'baseinfo' && (
                            <div class="relative border border-gray-200 rounded-b-lg p-4">
                                <div class="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p class="text-gray-600">Mã địa điểm</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="maDiaDiem"
                                                value={'Mã địa điểm'}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                            />
                                        ) : (
                                            <p class="font-semibold">{locationInfo?._id || 122345679876543}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Tên địa điểm</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="tenDiaDiem"
                                                value={locationInfo.tenDiaDiem}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                            />
                                        ) : (
                                            <p class="font-semibold">{locationInfo?.name || 'Hồ Cốc du lịch Vũng TàuTàu'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Tên nhà kinh doanh</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="tenDiaDiem"
                                                value={locationInfo.tenDiaDiem}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                            />
                                        ) : (
                                            <p class="font-semibold">{userData?.userName || 'Nguyễn Văn AA'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Địa chỉ</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="tenDiaDiem"
                                                value={locationInfo.tenDiaDiem}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                            />
                                        ) : (
                                            <p class="font-semibold">{locationInfo?.address || ''}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Loại</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="tenDiaDiem"
                                                value={locationInfo.category.name}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                            />
                                        ) : (
                                            <p class="font-semibold">{getCategoryName(locationInfo.category?.id)}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Ngày đăng ký kinh doanh</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="tenDiaDiem"
                                                value={locationInfo.tenDiaDiem}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                            />
                                        ) : (
                                            <p class="font-semibold"> {moment(locationInfo.dateCreated).format('DD-MM-YYYY hh:mm:ss')} </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {address === "Địa chỉ không khả dụng" ? (
                                        <p className="text-red-500">Không tìm thấy địa chỉ cho địa điểm này.</p>
                                    ) : (
                                        <div className ="flex justify-center">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31383.239171865847!2d107.48594181070591!3d10.508156585966674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175bd73c30f60a1%3A0x951e30bb705cd7c3!2zTcOAVSBDYW1waW5nIC0gQ-G6r20gVHLhuqFpIEjhu5MgQ-G7kWM!5e0!3m2!1sen!2s!4v1736102711020!5m2!1sen!2s" 
                                                width="800" height="350" allowFullScreen loading="lazy" 
                                            >
                                            </iframe>
                                        </div>
                                        // <></>
                                        //<MapComponent address={address} />
                                    )}

                                </div>
                                <button
                                    className="absolute bottom-2 right-3 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                                    onClick={isEditing ? handleSaveClick : handleEditClick}
                                >
                                    <FaEdit className="mr-2" />
                                    {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                                </button>
                            </div>
                        )}

                        {currentTab === 'specificinfo' && (
                            <div class="border border-gray-200 rounded-b-lg p-4">
                                <div className="flex space-x-4 scroll-container-x overflow-x-auto pb-4 whitespace-nowrap">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative w-24 h-24 inline-block">
                                            <img alt="Location" className="w-full h-full object-cover rounded-lg" src={image?.url} />
                                            {editMode && (
                                                <button
                                                    onClick={() => handleDeleteImage(index)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                                >
                                                    <FaX className="text-xs" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {editMode && (
                                        <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg inline-block">
                                            <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleAddImage} />
                                            <label htmlFor="image-upload">
                                                <FaPlus className="text-gray-500 text-2xl cursor-pointer" />
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Tên địa điểm</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={locationInfo.name}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{locationInfo.name}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={locationInfo.address}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{locationInfo.address}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                                        {editMode ? (
                                            <textarea
                                                name="description"
                                                value={locationInfo.description}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{locationInfo.description}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setEditMode(!editMode)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                                    >
                                        <FaEdit className="mr-2" />
                                        {editMode ? 'Lưu' : 'Chỉnh sửa'}
                                    </button>
                                </div>

                            </div>
                        )}

                        {currentTab === 'ratingservice' && (
                            <div>
                                {currentTab2 === 'viewratingservice' && (
                                    <div class="border border-gray-200 rounded-b-lg p-4">
                                        <h2 class="text-xl font-bold mb-4">Phòng</h2>
                                        {/* <div class="scroll-container-x">
                                            <div class="flex gap-4 mb-8 min-w-[800px]">
                                                <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room" >
                                                    <div class="border-l-4 border-blue-500 pl-4 w-full">
                                                        <p class="text-lg font-semibold text-gray-800">Phòng 2 người</p>
                                                        <p class="text-gray-600">Số lượng: 12</p>
                                                    </div>
                                                    <div class="flex justify-between items-center w-full">
                                                        <button onClick={handleViewDetails} class="bg-blue-500 text-white px-4 py-2 rounded-md">Xem chi tiết</button>
                                                        <div class="flex flex-col items-center">
                                                            <p class="text-gray-600">Giá</p>
                                                            <p class="text-red-600 font-bold text-lg">500.000 VND</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room" >
                                                    <div class="border-l-4 border-blue-500 pl-4 w-full">
                                                        <p class="text-lg font-semibold text-gray-800">Phòng 2 người</p>
                                                        <p class="text-gray-600">Số lượng: 12</p>
                                                    </div>
                                                    <div class="flex justify-between items-center w-full">
                                                        <button onClick={handleViewDetails} class="bg-blue-500 text-white px-4 py-2 rounded-md">Xem chi tiết</button>
                                                        <div class="flex flex-col items-center">
                                                            <p class="text-gray-600">Giá</p>
                                                            <p class="text-red-600 font-bold text-lg">500.000 VND</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room" >
                                                    <div class="border-l-4 border-blue-500 pl-4 w-full">
                                                        <p class="text-lg font-semibold text-gray-800">Phòng 2 người</p>
                                                        <p class="text-gray-600">Số lượng: 12</p>
                                                    </div>
                                                    <div class="flex justify-between items-center w-full">
                                                        <button onClick={handleViewDetails} class="bg-blue-500 text-white px-4 py-2 rounded-md">Xem chi tiết</button>
                                                        <div class="flex flex-col items-center">
                                                            <p class="text-gray-600">Giá</p>
                                                            <p class="text-red-600 font-bold text-lg">500.000 VND</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bg-gray-200 w-420 p-4 rounded-lg shadow-md flex items-center justify-center">
                                                    <button class="text-2xl text-gray-600">+</button>
                                                    <p class="ml-2">Thêm phòng mới</p>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="scroll-container-x">
                                            <div className="flex gap-4 mb-8 min-w-[800px]">
                                                {rooms.map((room) => (
                                                    <div
                                                        key={room._id}
                                                        className="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room"
                                                    >
                                                        <div className="border-l-4 border-blue-500 pl-4 w-full">
                                                            <p className="text-lg font-semibold text-gray-800">{room.name}</p>
                                                            <p className="text-gray-600">Số lượng: {room.quantity}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center w-full">
                                                            <button
                                                                onClick={() => handleViewDetails(room._id)}
                                                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                                            >
                                                                Xem chi tiết
                                                            </button>
                                                            <div className="flex flex-col items-center">
                                                                <p className="text-gray-600">Giá</p>
                                                                <p className="text-red-600 font-bold text-lg">
                                                                    {room?. pricePerNight?.toLocaleString()} VND
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button onClick={handleAddRoom} className="bg-gray-200 w-420 p-4 rounded-lg shadow-md flex items-center justify-center">
                                                    <button className="text-2xl text-gray-600">+</button>
                                                    <p className="ml-2">Thêm phòng mới</p>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="scroll-container mh-200">
                                            <h2 class="text-xl font-bold mb-4">Đánh giá từ khách hàng</h2>
                                            <div>
                                                {reviews ? (
                                                    <div>
                                                    {reviews.map((review) => (
                                                        <div key={review.id}>
                                                            <div class="flex items-center mb-4">   
                                                                <img alt="Profile picture of Hoang Huy" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/O5bug1WBccZwJ527TONg0tRsK6lOKxgmwdTsBcoffjoNNVlTA.jpg" width="50" />                                                                                                              
                                                                <div>
                                                                    <p class="font-semibold">{review.userName}</p>
                                                                    <div className="flex items-center">
                                                                        {/* Render rating stars */}
                                                                        {Array.from({ length: Math.floor(review.rating) }).map((_, index) => (
                                                                        <FaStar key={index} className="text-yellow-500" />
                                                                        ))}
                                                                        {review.rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500" />}
                                                                        <span className="ml-2 text-gray-600">{review.rating.toFixed(1)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p class="text-gray-700">{review.review}</p>
                                                        </div>
                                                        
                                                        
                                                        
                                                    ))}
                                                    </div>
                                                ) : (
                                                    <p>No reviews available for this location.</p>
                                                )}
                                               
                                            </div>
                                           

                                        </div>

                                    </div>
                                )}

                                {currentTab2 === 'roomDetails' && (
                                    <div class="border border-gray-200 rounded-b-lg p-4">
                                        <div class="text-gray-500 text-sm mb-4">
                                            <a class="text-xl font-bold mb-4 text-black">Phòng</a>&gt;<span>Chi tiết phòng</span>
                                            {/* <a href="#" class="hover:underline">Phòng</a> */}
                                        </div>
                                        <h1 class="text-2xl font-bold mb-4">{roomData?.name}</h1>
                                        {/* <div class="flex items-center mb-4">
                                            <FaBed class="mr-2 w-6" />
                                            <span>1 giường đôi</span>
                                        </div> */}
                                        <div className="flex flex-col space-y-2">
                                            {roomData?.bed?.map((bed, index) => (
                                                <div key={index} className="flex items-center mb-4">
                                                    {bed?.category === "single" ? (
                                                        <FaBed className="mr-2 w-6" />
                                                    ) : (
                                                        <FaBed className="mr-2 w-6" />
                                                    )}
                                                    <span>{bed?.quantity} {bed?.category === "single" ? "Giường đơn" : "Giường đôi"}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div class="mb-4">
                                            <span>diện tích: {roomData?.area}m2</span>
                                        </div>
                                        <div class="mb-4">
                                            <h2 class="font-bold mb-2">Dịch vụ:</h2>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {roomData?.facility.map((facility, index) => (
                                                    <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                                                        {getFacilityIcon(facility.id)}
                                                        <span>{facility?.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-bold">Trạng thái:</span>
                                            <span class="text-blue-500 status-room"> Còn {roomData?.capacity} phòng</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="text-green-500 text-2xl font-bold">{roomData?.pricePerNight} VND</div>
                                            <div class="flex">
                                                <button onClick={handleViewExitRoomDetail} class="bg-grey-500 text-black px-6 py-2 rounded-full shadow-md hover:bg-grey-600 mr-2">Thoát</button>
                                                <button class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600">Chỉnh sửa</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentTab2 === 'addRoom' && (
                                    <div class="border border-gray-200 rounded-b-lg p-4">
                                        <div class="text-gray-500 text-sm mb-4">
                                            <a class="text-xl font-bold mb-4 text-black">Phòng</a>&gt;<span>Thêm phòng</span>
                                            {/* <a href="#" class="hover:underline">Phòng</a> */}
                                        </div>
                                        <input 
                                            value={formData.name}
                                            onChange={handleInputAddChange} 
                                            name="name"
                                            type="text" placeholder="Tên phòng" 
                                            className=" p-3 mb-4 border border-gray-300 rounded-lg w-room"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="grid">
                                                <p>Giường đôi</p>
                                                <input 
                                                    name="doubleBeds"
                                                    value={formData.doubleBeds || ""}
                                                    onChange={handleInputAddChange} type="number" className="grid flex p-3 border border-gray-300 rounded-lg"></input>
                                            </div>
                                            <div className="grid">
                                                <p>Giường đơn</p>
                                                <input 
                                                    name="singleBeds"
                                                    value={formData.singleBeds || ""}
                                                    onChange={handleInputAddChange} type="number" className="grid flex p-3 border border-gray-300 rounded-lg"></input>
                                            </div>
                                            <div className="grid">
                                                <p>Diện tích</p>
                                                <input 
                                                    name="area"
                                                    value={formData.area || ""}
                                                    onChange={handleInputAddChange} type="number" className="grid flex p-3 border border-gray-300 rounded-lg"></input>
                                            </div>
                                            
                                            <div className="grid">
                                                <p>Số lượng phòng</p>
                                                <input 
                                                    name="quantity"
                                                    value={formData.quantity || ""}
                                                    onChange={handleInputAddChange} type="number" className="grid flex p-3 border border-gray-300 rounded-lg"></input>
                                            </div>
                                        </div>
                                        <h2 class="font-bold mb-2">Dịch vụ:</h2>
                                        <div className="flex flex-wrap gap-4">
                                            {services.map((service) => (
                                                <label
                                                    key={service.id}
                                                    className="flex items-center bg-gray-200 rounded-full px-3 py-1 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2"
                                                        checked={selectedFacilities.includes(service.id)}
                                                        onChange={() => handleCheckboxChange(service)}
                                                        value={service.name}
                                                        name={`service-${service.id}`}
                                                    />
                                                    {service.icon}
                                                    <span>{service.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        
                                        
                                        <div class="flex items-center justify-between">
                                            <div className="flex items-center justify-center mt-2">
                                                <h2 class="text-black font-bold mr-2">Giá</h2>
                                                <input 
                                                    name="pricePerNight"
                                                    value={formData.pricePerNight || ""}
                                                    onChange={handleInputAddChange}  type="number" className="w-48 p-3 border border-gray-300 rounded-lg"></input>
                                            </div>
                                            
                                            <div class="flex">
                                                <button onClick={handleCancelAddRoom} class="bg-grey-500 text-black px-6 py-2 rounded-full shadow-md hover:bg-grey-600 mr-2">Hủy</button>
                                                <button onClick={handleSubmit} class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600">Tạo</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DetailLocationBusinessScreen;