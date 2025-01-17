import React from "react";
import Sidebar from "../components/SideBar.js";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header.js";

const titleMap = [
  { path: /^\/dashboard\/admin$/, main: "Bảng Điều Khiển", sub: null },
  { path: /^\/business\/list$/, main: "Danh Sách Nhà Kinh Doanh", sub: null },
  {
    path: /^\/business\/detail\/[a-zA-Z0-9]+$/,
    main: "Danh Sách Nhà Kinh Doanh",
    sub: "Chi Tiết Nhà Kinh Doanh",
  },
  { path: /^\/location\/list$/, main: "Danh Sách Địa Điểm", sub: null },
  {
    path: /^\/location\/add$/,
    main: "Danh Sách Địa Điểm",
    sub: "Thêm địa điểm mới",
  },
  {
    path: /^\/location\/detail\/[a-zA-Z0-9]+$/,
    main: "Danh Sách Địa Điểm",
    sub: "Chi Tiết Địa Điểm",
  },
  { path: /^\/booking\/list$/, main: "Danh Sách Đặt Chỗ", sub: null },
  {
    path: /^\/booking\/detail\/[a-zA-Z0-9]+$/,
    main: "Danh Sách Đặt Chỗ",
    sub: "Chi Tiết Đặt Chỗ",
  },

  { path: /^\/statistic$/, main: "Thống Kê", sub: null },

  { path: /^\/dashboard\/business$/, main: "Bảng Điều Khiển", sub: null },
  { path: /^\/business\/booking\/list$/, main: "Danh Sách Đặt Chỗ", sub: null },
  {
    path: /^\/business\/booking\/detail\/[a-zA-Z0-9]+$/,
    main: "Danh Sách Đặt Chỗ",
    sub: "Chi Tiết Đặt Chỗ",
  },
  {
    path: /^\/business\/location\/list$/,
    main: "Danh Sách Địa Điểm",
    sub: null,
  },
  {
    path: /^\/business\/location\/detail\/[a-zA-Z0-9]+$/,
    main: "Danh Sách Địa Điểm",
    sub: "Chi Tiết Địa Điểm",
  },

  { path: /^\/business\/chat$/, main: "Chăm sóc khách hàng", sub: null },
  { path: /^\/business\/statistic$/, main: "Thống Kê", sub: null },
];

const Layout = ({ children }) => {
  const userRole = localStorage.getItem("userRole");

  const location = useLocation();
  const { pathname } = location;
  const { main, sub } = titleMap.find(({ path }) => path.test(pathname)) || {
    main: "Trang Không Tồn Tại",
    sub: null,
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: 10, marginTop: 0 }}>
        <Sidebar role={userRole} />
      </div>
      <div class="container">
        <div class="containerformobile">
          <Header mainTitle={main} subTitle={sub} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
