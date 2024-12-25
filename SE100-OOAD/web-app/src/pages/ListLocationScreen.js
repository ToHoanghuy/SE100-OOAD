import React from "react";
import "../styles/ListLocationScreen.css";
import { FaAngleRight, FaBell, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { locations } from "./BusinessData";
import Pagination from "../components/Pagination";
import { useDebounce } from "use-debounce";

const ListLocationScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000); // 2-second debounce
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);

  // fetch data from api
  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch("http://localhost:3000/alllocation");
  //       const result = await response.json();
  //       if (result.isSuccess) {
  //         setLocations(result.data);
  //       } else {
  //         setError("Failed to fetch locations.");
  //       }
  //     } catch (err) {
  //       setError("An error occurred while fetching locations.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchLocations();
  // }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        let response;
        if (debouncedSearchTerm.trim() === "") {
          response = await fetch(`http://localhost:3000/locationbyname`);
        } else {
          const formattedSearchTerm = debouncedSearchTerm
            .trim()
            .replace(/\s+/g, "-");

          response = await fetch(
            `http://localhost:3000/locationbyname?name=${formattedSearchTerm}`
          );
        }

        const result = await response.json();
        if (result.isSuccess) {
          setLocations(result.data);
        } else {
          setError("Không tìm thấy !");
        }
      } catch (err) {
        setError("An error occurred while fetching locations.");
      } finally {
        setIsLoading(false);
      }
    };

    // Always fetch data regardless of the search term
    fetchLocations();
  }, [debouncedSearchTerm]);

  // const filteredLocations = locations.filter((location) => {
  //   const searchTermLower = searchTerm.toLowerCase();
  //   return (
  //     location.name.toLowerCase().includes(searchTermLower) ||
  //     location.type.toLowerCase().includes(searchTermLower) ||
  //     location.address.toLowerCase().includes(searchTermLower)
  //   );
  // });

  const itemsPerPage = 10;
  const currentData = locations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = locations.length;

  const handleRowClick = (id) => {
    navigate(`/location/detail/${id}`);
  };

  if (isLoading) {
    return <div>Loading locations...</div>;
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
                placeholder="Tìm kiếm địa điểm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên địa điểm</th>
                  <th>Loại</th>
                  <th>Địa chỉ</th>
                  <th></th>
                </tr>
              </thead>

              {error ? (
                <div>{error}</div>
              ) : (
                <tbody className="row-container">
                  {currentData.map((location, index) => (
                    <tr
                      key={location.id}
                      className="clickable-row"
                      onClick={() => handleRowClick(location._id)}
                    >
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>
                        <div className="namefield">
                          {/* <img
                          src={require(`../assets/images/${location.avatar}`)}
                          alt="User Avatar"
                          className="user-avatar"
                        /> */}
                          <p>{location.name}</p>
                        </div>
                      </td>
                      <td>
                        {location.category && location.category.name
                          ? location.category.name
                          : location.category?.cateName}
                      </td>
                      <td>{location.address}</td>
                      <td>
                        <button
                          type="button"
                          className="icon-container iconview"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListLocationScreen;
