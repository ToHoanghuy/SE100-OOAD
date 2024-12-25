
import React from "react";
import "../styles/ListBookingScreen.css";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaBell, FaEye, FaSearch } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
// import { businesses, bookings } from "./BusinessData";

const ListBookingScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState([]);
  const statusMapping = {
    confirmed: "Đã duyệt",
    pending: "Đang chờ",
    cancelled: "Đã hủy",
    complete: "Hoàn thành",
  };

  // fetch data from api
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const bookingResponse = await fetch(
          "http://localhost:3000/booking/getall"
        );
        const bookingResult = await bookingResponse.json();

        if (bookingResult.isSuccess) {
          const bookingsData = bookingResult.data;
          setBookings(bookingsData);

          // Get unique user IDs from bookings
          const userIds = [
            ...new Set(bookingsData.map((booking) => booking.userId)),
          ];

          // Fetch user details for all user IDs
          const userResponses = await Promise.all(
            userIds.map((id) =>
              fetch(`http://localhost:3000/user/getbyid/${id}`)
            )
          );

          const userResults = await Promise.all(
            userResponses.map((res) => res.json())
          );

          // Map user details to user ID
          const usersMap = {};
          userResults.forEach((user) => {
            if (user.isSuccess) {
              usersMap[user.data._id] = user.data;
            }
          });

          // Attach user details to each booking
          const enrichedBookings = bookingsData.map((booking) => ({
            ...booking,
            user: usersMap[booking.userId],
          }));

          setBookings(enrichedBookings);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (err) {
        setError("An error occurred while fetching bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowClick = (id) => {

    navigate(`/booking/detail/${id}`);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const filteredData = bookings
    .filter((booking) => {
      const searchTermLower = searchTerm.toLowerCase();
      return booking.status.toLowerCase().includes(searchTermLower);
    })
    .map((booking) => ({
      ...booking,
      status: statusMapping[booking.status] || booking.status,
      dateBooking: formatDate(booking.dateBooking),
    }));

  const currentData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  const getStatusColor = (status) => {
    switch (status) {
      case "Đang chờ":
        return "bg-yellow-100 text-yellow-800";
      case "Đã hủy":
        return "bg-red-100 text-red-800";
      case "Đã duyệt":
        return "bg-blue-100 text-blue-800";
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = filteredData.length;

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
          <div class="listbusinessbody scroll-container mh-900">
            <div class="search">
              <FaSearch class="icon-search" />
              <input
                type="text"
                className="input-text"
                placeholder="Tìm kiếm lượt đặt chỗ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Mã phiếu</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="row-container">
                {currentData.map((booking, index) => (
                  <tr key={booking._id} className="clickable-row">
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
                    <td>
                      <div className="namefield">
                        {/* <img
                          src={require(`../assets/images/${booking.avatar}`)}
                          alt="User Avatar"
                          className="user-avatar"
                        /> */}
                        <p>{booking.user?.userName || "Unknown User"}</p>
                      </div>
                    </td>
                    <td>{booking._id}</td>
                    <td>{booking.dateBooking}</td>
                    <td>
                      <span
                        className={`status-label ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>{booking.totalPrice}</td>
                    <td>
                      <button
                        type="button"
                        className="icon-container iconview"
                        onClick={() => handleRowClick(booking._id)}

                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

    </div>
  );
};

export default ListBookingScreen;
