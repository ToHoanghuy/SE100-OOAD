import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaAngleRight,
  FaBell,
  FaEye,
  FaSearchLocation,
  FaEdit,
  FaStar,
  FaStarHalfAlt,
  FaBed,
  FaTimesCircle,
  FaHotTub,
  FaWifi,
  FaVolumeOff,
  FaSnowflake,
} from "react-icons/fa";
import { FaRankingStar, FaX, FaPlus } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import "../styles/DetailLocationScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  faPhoneAlt,
  faEnvelope,
  faUser,
  faMapMarkerAlt,
  faMemo,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate, formatDateTime } from "../utils/dateUtils";

const DetailLocationScreen = () => {
  const [currentTab, setCurrentTab] = useState("baseinfo");
  const [currentTab2, setCurrentTab2] = useState("viewratingservice");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState([]);
  const [owner, setOwner] = useState([]);
  const [rooms, setRoom] = useState([]);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [senders, setSenders] = useState({});
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/locationbyid/${id}`
        );
        const result = await response.json();
        if (result.isSuccess) {
          setLocation(result.data);
          if (result.data.ownerId) {
            const ownerResponse = await fetch(
              `http://localhost:3000/user/getbyid/${result.data.ownerId}`
            );
            const ownerResult = await ownerResponse.json();
            if (ownerResult.isSuccess) {
              setOwner(ownerResult.data);
            }
          }

          const roomResponse = await fetch(
            `http://localhost:3000/room/getbylocationid/${id}`
          );

          const roomResult = await roomResponse.json();

          if (roomResult.isSuccess) {
            setRoom(roomResult.data);
          }
        }
      } catch (err) {
        setError("An error occurred while fetching location.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, [id]);

  useEffect(() => {
    // Gọi API để reviews
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/review/location/6704f3650722c4f99305dc5d"
        );
        const data = await response.json();
        if (data.isSuccess) {
          setReviews(data.data);

          // Gọi API để lấy tên người đánh giá
          const senderPromises = data.data.map((review) =>
            fetch(`http://localhost:3000/user/getbyid/${review.senderId}`)
              .then((res) => res.json())
              .then((userData) => ({
                senderId: review.senderId,
                name: userData.data?.userName || "Người dùng ẩn danh",
                senderAvatar:
                  userData.data?.userAvatar || "https://via.placeholder.com/50", // Thêm avatar (hoặc URL mặc định)
              }))
          );

          const senderResults = await Promise.all(senderPromises);
          const senderMap = senderResults.reduce((acc, sender) => {
            // Lưu cả name và senderAvatar vào senderMap
            acc[sender.senderId] = {
              name: sender.name,
              avatar: sender.senderAvatar,
            };
            return acc;
          }, {});
          setSenders(senderMap);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleLocationStatusChange = async (status) => {
    try {
      const response = await fetch(`http://localhost:3000/location/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update location status");
      }

      const data = await response.json();
      console.log("Location status updated:", data);
      // Cập nhật lại trạng thái của location nếu location là đối tượng
      setLocation(data.data);
    } catch (error) {
      console.error("Error updating location status:", error);
      // Optionally show an error message
    }
  };

  const handleBaseInfoClick = () => {
    setCurrentTab("baseinfo");
  };

  const handleSpecificInfoClick = () => {
    setCurrentTab("specificinfo");
  };

  const handleRatingServiceClick = () => {
    setCurrentTab("ratingservice");
    setCurrentTab2("viewratingservice");
  };

  const handleViewDetails = () => {
    setCurrentTab2("roomDetails");
  };

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading locations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div class="container">
      <div class="containerformobile">
        <div class="containerlistbusiness widthlistbusiness">
          <div class="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between">
              <div class="flex items-center">
                <img
                  alt="Profile picture of a person"
                  class="w-20 h-20 rounded-full mr-4"
                  height="80"
                  src="https://storage.googleapis.com/a1aa/image/0FPVWfLJ1m0nJS9YfULFrbvezZsDHus5bXhqxVDA6tO9UMKnA.jpg"
                  width="80"
                />
                <div>
                  <h1 class="text-xl font-bold">{location.name}</h1>
                  <div class="flex items-center text-gray-600 mt-2">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                    <span>{owner.userPhoneNumber}</span>
                  </div>
                  <div class="flex items-center text-gray-600 mt-1">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    <span>{owner.userEmail}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 items-start">
                {/* Check if location is approved */}
                {location.status === "active" ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 font-semibold">
                      Đã duyệt
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLocationStatusChange("rejected")}
                        className="bg-gray-500 text-white text-sm px-3 py-1.5 rounded-lg"
                        title="Click để từ chối địa điểm"
                      >
                        Từ chối
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLocationStatusChange("active")}
                        className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-lg"
                        title="Click để xét duyệt địa điểm"
                      >
                        Xét duyệt địa điểm
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div class="mt-6">
              <div class="flex">
                <button
                  onClick={handleBaseInfoClick}
                  className={`flex items-center px-4 py-2 ${
                    currentTab === "baseinfo"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } rounded-t-lg`}
                >
                  {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                  <FaSearchLocation className="mr-2 text-2xl" />
                  <span>Thông tin tổng quan</span>
                </button>
                <button
                  onClick={handleSpecificInfoClick}
                  class={`flex items-center px-4 py-2 ${
                    currentTab === "specificinfo"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } rounded-t-lg ml-2`}
                >
                  {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                  <MdEventNote className="mr-2 text-2xl" />
                  <span>Thông tin địa điểm</span>
                </button>
                <button
                  onClick={handleRatingServiceClick}
                  class={`flex items-center px-4 py-2 ${
                    currentTab === "ratingservice"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } rounded-t-lg ml-2`}
                >
                  <FaRankingStar className="mr-2 text-2xl" />
                  <span>Dịch vụ và đánh giá</span>
                </button>
              </div>
            </div>
            {currentTab === "baseinfo" && (
              <div class="border border-gray-200 rounded-b-lg p-4">
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p class="text-gray-600">Mã địa điểm</p>
                    <p class="font-semibold">{location._id}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Tên địa điểm</p>
                    <p class="font-semibold">{location.name}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Tên chủ sở hữu</p>
                    <p class="font-semibold">{owner.userName}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Địa chỉ</p>
                    <p class="font-semibold">{location.address}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Loại</p>
                    <p class="font-semibold">
                      {" "}
                      {location.category && location.category.name
                        ? location.category.name
                        : location.category?.cateName}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-600">Ngày đăng ký kinh doanh</p>
                    <p class="font-semibold">
                      {" "}
                      {formatDateTime(location.dateCreated)}{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    alt="Satellite view of Du lịch Hồ Cốc - Vũng Tàu"
                    class="w-full max-w-xs mx-auto h-of-map"
                    src="https://storage.googleapis.com/a1aa/image/oPZffFlAjIu7skZYoX8hS47d3ioVwXoWu6YnGKv7e0Wl2jKnA.jpg"
                  />
                </div>
              </div>
            )}

            {currentTab === "specificinfo" && (
              <div class="border border-gray-200 rounded-b-lg p-4">
                <div class="flex space-x-4 overflow-x-auto pb-4">
                  {/* <div class="relative">
                    <img
                      alt="Image of a castle"
                      class="w-24 h-24 object-cover rounded-lg"
                      height="100"
                      src="https://storage.googleapis.com/a1aa/image/ouHZc2gP3LKELBzF9b9WhRW9eF7SEgifV3ddt1F1gtse8nKnA.jpg"
                      width="100"
                    />
                    <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <FaX className="text-xs" />
                    </button>
                  </div>
                  <div class="relative">
                    <img
                      alt="Image of a ferris wheel"
                      class="w-24 h-24 object-cover rounded-lg"
                      height="100"
                      src="https://storage.googleapis.com/a1aa/image/sCsVlOJSeD3UTaLoIIrOT6PxhfRdIWZr15lz5azFe8KJ9nKnA.jpg"
                      width="100"
                    />
                    <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <FaX className="text-xs" />
                    </button>
                  </div>
                  <div class="relative">
                    <img
                      alt="Image of a ticket"
                      class="w-24 h-24 object-cover rounded-lg"
                      height="100"
                      src="https://storage.googleapis.com/a1aa/image/2DNYdCQdMDJbBZyhIyouoG7XtT5NuAbJKXjf12XkQuoPfTlTA.jpg"
                      width="100"
                    />
                    <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <FaX className="text-xs" />
                    </button>
                  </div>
                  <div class="relative">
                    <img
                      alt="Image of a castle with flowers"
                      class="w-24 h-24 object-cover rounded-lg"
                      height="100"
                      src="https://storage.googleapis.com/a1aa/image/tSYsfyPeJjhDVki0Vsk8DDATWf9vRxue66bCDKYAEBhL6PVOB.jpg"
                      width="100"
                    />
                    <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <FaX className="text-xs" />
                    </button>
                  </div>
                  <div class="relative">
                    <img
                      alt="Image of a street"
                      class="w-24 h-24 object-cover rounded-lg"
                      height="100"
                      src="https://storage.googleapis.com/a1aa/image/gwx1kHK9DQYSPN7stTexFkCK510ikafYbvOKxeRQn12K9nKnA.jpg"
                      width="100"
                    />
                    <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <FaX className="text-xs" />
                    </button>
                  </div>
                  <div class="relative">
                    <img
                      alt="Image of a statue"
                      class="w-24 h-24 object-cover rounded-lg"
                      height="100"
                      src="https://storage.googleapis.com/a1aa/image/j9gNxOarjEr4DZ4gDrQF2iVtefocfFCRhseXPCdbmIoF6PVOB.jpg"
                      width="100"
                    />
                    <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <FaX className="text-xs" />
                    </button>
                  </div> */}

                  {location.image?.map((image, index) => (
                    <div className="relative" key={index}>
                      <img
                        alt={`Image ${index}`}
                        className="w-24 h-24 object-cover rounded-lg"
                        src={image.url}
                      />
                      <button className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <FaX className="text-xs" />
                      </button>
                    </div>
                  ))}
                  {/* ẩn đi nút thêm ảnh địa điểm ở admin */}
                  {/* 
                  <div class="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg">
                    <FaPlus class="text-gray-500 text-2xl" />
                  </div> */}
                </div>
                <div class="mt-6">
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                      Tên địa điểm{" "}
                    </label>
                    <p class="text-gray-900">{location.name}</p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                      Địa chỉ
                    </label>
                    <p class="text-gray-900">{location.address} </p>
                  </div>
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                      Mô tả
                    </label>
                    <p class="text-gray-900">{location.description}</p>
                  </div>
                </div>
                {/* <div class="flex justify-end">
                  <button class="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                    <FaEdit class="mr-2" />
                    Chỉnh sửa
                  </button>
                </div> */}
              </div>
            )}

            {currentTab === "ratingservice" && (
              <div>
                {currentTab2 === "viewratingservice" && (
                  <div class="border border-gray-200 rounded-b-lg p-4">
                    <h2 class="text-xl font-bold mb-4">Phòng</h2>
                    <div class="scroll-container-x">
                      <div class="flex gap-4 mb-8 min-w-[800px]">
                        {rooms.map((room, index) => (
                          <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room">
                            <div class="border-l-4 border-blue-500 pl-4 w-full">
                              <p class="text-lg font-semibold text-gray-800">
                                {room.name}
                              </p>
                              <p class="text-gray-600">
                                Số lượng: {room.facility.quantity}
                              </p>
                            </div>
                            <div class="flex justify-between items-center w-full">
                              <button
                                onClick={handleViewDetails}
                                class="bg-blue-500 text-white px-4 py-2 rounded-md"
                              >
                                Xem chi tiết
                              </button>
                              <div class="flex flex-col items-center">
                                <p class="text-gray-600">Giá</p>
                                <p class="text-red-600 font-bold text-lg">
                                  {formatCurrency(room.pricePerNight)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room">
                          <div class="border-l-4 border-blue-500 pl-4 w-full">
                            <p class="text-lg font-semibold text-gray-800">
                              Phòng 2 người
                            </p>
                            <p class="text-gray-600">Số lượng: 12</p>
                          </div>
                          <div class="flex justify-between items-center w-full">
                            <button
                              onClick={() => navigate("/dashboard")}
                              class="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              Xem chi tiết
                            </button>
                            <div class="flex flex-col items-center">
                              <p class="text-gray-600">Giá</p>
                              <p class="text-red-600 font-bold text-lg">
                                500.000 VND
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room">
                          <div class="border-l-4 border-blue-500 pl-4 w-full">
                            <p class="text-lg font-semibold text-gray-800">
                              Phòng 2 người
                            </p>
                            <p class="text-gray-600">Số lượng: 12</p>
                          </div>
                          <div class="flex justify-between items-center w-full">
                            <button
                              onClick={handleViewDetails}
                              class="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              Xem chi tiết
                            </button>
                            <div class="flex flex-col items-center">
                              <p class="text-gray-600">Giá</p>
                              <p class="text-red-600 font-bold text-lg">
                                500.000 VND
                              </p>
                            </div>
                          </div>
                        </div> */}

                        {/* <div class="bg-gray-200 w-420 p-4 rounded-lg shadow-md flex items-center justify-center">
                          <button class="text-2xl text-gray-600">+</button>
                          <p class="ml-2">Thêm phòng mới</p>
                        </div> */}
                      </div>
                    </div>

                    <div className="scroll-container mh-200">
                      <h2 className="text-xl font-bold mb-4">
                        Đánh giá từ khách hàng
                      </h2>
                      {reviews.map((review) => (
                        <div key={review._id} className="mt-3">
                          <div className="flex items-center mb-4">
                            <img
                              alt={`Profile picture of ${
                                senders[review.senderId]?.name || "Unknown"
                              }`}
                              className="w-12 h-12 rounded-full mr-4"
                              height="50"
                              src={
                                senders[review.senderId]?.avatar ||
                                "default-avatar-url"
                              } // Đảm bảo URL avatar là chính xác
                              width="50"
                            />
                            <div>
                              <p className="font-semibold">
                                {senders[review.senderId]?.name ||
                                  "Người dùng ẩn danh"}
                              </p>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <React.Fragment key={index}>
                                    {review.rating > index ? (
                                      review.rating > index + 0.5 ? (
                                        <FaStar className="text-yellow-500" />
                                      ) : (
                                        <FaStarHalfAlt className="text-yellow-500" />
                                      )
                                    ) : null}
                                  </React.Fragment>
                                ))}
                                <span className="ml-2 text-gray-600">
                                  {review.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.review}</p>
                          <p className="text-sm text-gray-500">
                            Ngày đánh giá: {formatDateTime(review.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentTab2 === "roomDetails" && (
                  <div class="border border-gray-200 rounded-b-lg p-4">
                    <div class="text-gray-500 text-sm mb-4">
                      <a class="text-xl font-bold mb-4 text-black">Phòng</a>&gt;
                      <span>Chi tiết phòng</span>
                      {/* <a href="#" class="hover:underline">Phòng</a> */}
                    </div>
                    <h1 class="text-2xl font-bold mb-4">Phòng 2 người</h1>
                    <div class="flex items-center mb-4">
                      <FaBed class="mr-2 w-6" />
                      <span>1 giường đôi</span>
                    </div>
                    <div class="mb-4">
                      <span>diện tích: 16m2</span>
                    </div>
                    <div class="mb-4">
                      <h2 class="font-bold mb-2">Dịch vụ:</h2>
                      <div class="flex flex-wrap gap-2">
                        <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                          <FaTimesCircle class=" mr-2 w-4 p-0" />

                          <span>hủy miễn phí trong 24h</span>
                        </div>
                        <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                          <FaHotTub class="mr-2 w-4" />

                          <span>Bồn tắm</span>
                        </div>
                        <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                          <FaWifi class="mr-2 w-4" />
                          <span>wifi miễn phí</span>
                        </div>
                        <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                          <FaVolumeOff class="mr-2 w-4" />
                          <span>Hệ thống chống tiếng ồn</span>
                        </div>
                        <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                          <FaSnowflake class="mr-2 w-4" />
                          <span>Máy lạnh</span>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4">
                      <span class="font-bold">Trạng thái:</span>
                      <span class="text-blue-500 status-room">còn 5 phòng</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-green-500 text-2xl font-bold">$50</div>
                      <div class="flex">
                        <button class="bg-grey-500 text-black px-6 py-2 rounded-full shadow-md hover:bg-grey-600 mr-2">
                          Thoát
                        </button>
                        <button class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600">
                          Chỉnh sửa
                        </button>
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

export default DetailLocationScreen;
