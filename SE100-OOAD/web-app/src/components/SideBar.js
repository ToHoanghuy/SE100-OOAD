import { useState, useEffect } from "react";
import React from "react";
import "../styles/SideBar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaBookOpen,
  FaServicestack,
  FaChartBar,
} from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";

const SideBar = ({ role }) => {
  const navigate = useNavigate();

  const adminIconSources = [
    {
      inactive: <FaHome />,
      active: <FaHome className="text-white" />,
      link: "/dashboard/admin",
      title: "Dashboard", // Thêm title
    },
    {
      inactive: <FaMapMarkerAlt />,
      active: <FaMapMarkerAlt className="text-white" />,
      link: "/business/list",
      title: "Nhà kinh doanh", // Thêm title
    },
    {
      inactive: <FaBookOpen />,
      active: <FaBookOpen className="text-white" />,
      link: "/location/list",
      title: "Địa điểm", // Thêm title
    },
    {
      inactive: <FaServicestack />,
      active: <FaServicestack className="text-white" />,
      link: "/booking/list",
      title: "Đặt phòng", // Thêm title
    },
    {
      inactive: <FaChartBar />,
      active: <FaChartBar className="text-white" />,
      link: "/statistic",
      title: "Thống kê", // Thêm title
    },
  ];

  const businessIconSources = [
    {
      inactive: <FaHome />,
      active: <FaHome className="text-white" />,
      link: "/dashboard/business",
      title: "Dashboard",
    },
    {
      inactive: <FaBookOpen />,
      active: <FaBookOpen className="text-white" />,
      link: "/business/location/list",
      title: "Địa điểm",
    },
    {
      inactive: <FaServicestack />,
      active: <FaServicestack className="text-white" />,
      link: "/business/booking/list",
      title: "Đặt phòng",
    },
    {
      inactive: <RiCustomerServiceFill />,
      active: <RiCustomerServiceFill className="text-white" />,
      link: "/business/chat",
      title: "Hỗ trợ khách hàng",
    },
    {
      inactive: <FaChartBar />,
      active: <FaChartBar className="text-white" />,
      link: "business/statistic",
      title: "Thống kê doanh thu",
    },
  ];

  const [iconSources, setIconSources] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      setIconSources(adminIconSources);
    } else if (role === "location-owner") {
      setIconSources(businessIconSources);
    }
  }, [role]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    navigate(iconSources[index].link);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src={require("../assets/images/logoblue.png")}
          alt="Travel Social"
        />
      </div>
      <div className="sidebar-menu">
        <ul>
          {iconSources.map((icon, index) => (
            <li
              title={icon.title}
              key={index}
              className={`menu-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              {activeIndex === index ? (
                <div className="icon-active">{icon.active}</div>
              ) : (
                icon.inactive
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-footer">
        <div className="version">Version 1.0</div>
      </div>
    </div>
  );
};

export default SideBar;
