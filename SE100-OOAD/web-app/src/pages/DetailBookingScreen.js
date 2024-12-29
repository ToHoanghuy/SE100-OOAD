import React from "react";
import "../styles/DetailBookingScreen.css";
import { FaBell, FaCalendar, FaEnvelope, FaMoneyBill } from "react-icons/fa";
import { useState, useEffect } from "react";
import pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faUser,
  faMapMarkerAlt,
  faMemo,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { formatDate, formatDateTime } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatCurrency";

const DetailBookingScreen = () => {
  const [currentTab, setCurrentTab] = useState("customerinfo");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [room, setRoom] = useState([]);
  const [location, setLocation] = useState([]);
  const [owner, setOwner] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/booking/getbyid/${id}`
        );
        const result = await response.json();
        if (result.isSuccess) {
          setBooking(result.data);

          const roomResponse = await fetch(
            `http://localhost:3000/room/getbyid/${result.data.roomId}`
          );

          const roomResult = await roomResponse.json();

          if (roomResult.isSuccess) {
            setRoom(roomResult.data);
          }

          const locationResponse = await fetch(
            `http://localhost:3000/locationbyid/${roomResult.data.locationId}`
          );

          const locationResult = await locationResponse.json();

          if (locationResult.isSuccess) {
            setLocation(locationResult.data);
          }

          if (result.data.userId) {
            const customerResponse = await fetch(
              `http://localhost:3000/user/getbyid/${result.data.userId}`
            );
            const customerResult = await customerResponse.json();
            if (customerResult.isSuccess) {
              setCustomer(customerResult.data);
            }
          }

          if (locationResult.data.ownerId) {
            const ownerResponse = await fetch(
              `http://localhost:3000/user/getbyid/${locationResult.data.ownerId}`
            );
            const ownerResult = await ownerResponse.json();
            if (ownerResult.isSuccess) {
              setOwner(ownerResult.data);
            }
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

  const handleCustomerInfoClick = () => {
    setCurrentTab("customerinfo");
  };

  const handleLocationInfoClick = () => {
    setCurrentTab("locationinfo");
  };

  return (
    <div class="container">
      <div class="containerformobile">
        <div class="containerlistbusiness widthlistbusiness">
          <div class="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
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
                {/* <div class="flex items-center text-gray-600 mt-2">
                  <FaCalendar class="mr-2" />

                  <span>04/08/2024</span>
                </div> */}
                <div class="flex items-center mt-2">
                  <FaMoneyBill class="mr-2 w-5" />

                  <span class="line-through text-gray-400">68,000,000 đ</span>
                  <span class="text-green-500 ml-2">
                    {formatCurrency(Number(booking.totalPrice))}
                  </span>
                  <span class="text-green-500 ml-2 status-label-2">- 50%</span>
                </div>
                <div class="flex items-center text-gray-500 mt-1 ">
                  <FaEnvelope class="mr-2" />

                  <div class="text-gray-500">
                    Đặt lúc {formatDateTime(booking.dateBooking)}
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <div class="flex">
                <button
                  onClick={handleCustomerInfoClick}
                  className={`flex items-center px-4 py-2 ${
                    currentTab === "customerinfo"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } rounded-t-lg`}
                >
                  <i class="fas fa-user mr-2"></i>
                  <span>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Thông tin khách hàng
                  </span>
                </button>
                <button
                  onClick={handleLocationInfoClick}
                  class={`flex items-center px-4 py-2 ${
                    currentTab === "locationinfo"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } rounded-t-lg ml-2`}
                >
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  <span>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    Thông tin địa điểm
                  </span>
                </button>
              </div>
              {currentTab === "customerinfo" && (
                <div class="border border-gray-200 rounded-b-lg p-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="mb-2 text-gray-500">Mã khách hàng</div>
                      <div class="mb-4">{customer._id}</div>
                      <div class="mb-2 text-gray-500">Số điện thoại</div>
                      <div class="mb-4">{customer.userPhoneNumber}</div>
                      <div class="mb-2 text-gray-500">Ngày sinh</div>
                      <div class="mb-4">
                        {formatDate(customer.userDateOfBirth)}
                      </div>
                      {/* <div class="mb-2 text-gray-500">Tên liên hệ</div>
                      <div class="mb-4">Lê Bảo Như</div> */}
                      {/* <div class="mb-2 text-gray-500">Giới tính</div>
                      <div class="mb-4">Nữ</div> */}
                    </div>
                    <div>
                      <div class="mb-2 text-gray-500">Họ và tên</div>
                      <div class="mb-4">{customer.userName}</div>
                      <div class="mb-2 text-gray-500">Địa chỉ email</div>
                      <div class="mb-4">{customer.userEmail}</div>
                      {/* <div class="mb-2 text-gray-500">Số CMND/CCCD</div>
                      <div class="mb-4">079303041653</div> */}
                      {/* <div class="mb-2 text-gray-500">
                        Số điện thoại liên hệ
                      </div>
                      <div class="mb-4">0386441295</div> */}
                      <div class="mb-2 text-gray-500">Địa chỉ</div>
                      <div class="mb-4">{customer.userAddress}</div>
                    </div>
                  </div>
                </div>
              )}
              {currentTab === "locationinfo" && (
                <div class="border border-gray-200 rounded-b-lg p-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="mb-2 text-gray-500">Mã địa điểm</div>
                      <div class="mb-4">{location._id}</div>
                      <div class="mb-2 text-gray-500">Tên chủ sở hữu</div>
                      <div class="mb-4">{owner.userName}</div>
                      <div class="mb-2 text-gray-500">Loại</div>
                      <div class="mb-4">
                        {" "}
                        {location.category && location.category.name
                          ? location.category.name
                          : location.category?.cateName}
                      </div>
                    </div>

                    <div>
                      <div class="mb-2 text-gray-500">Tên địa điểm</div>
                      <div class="mb-4">{location.name}</div>
                      <div class="mb-2 text-gray-500">Địa chỉ</div>
                      <div class="mb-4">{location.address}</div>
                      <div class="mb-2 text-gray-500">
                        Ngày đăng ký kinh doanh
                      </div>
                      <div class="mb-4">12/10/2023</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBookingScreen;
