import React, { useState } from "react";
import './Sidebar.css';
import { ImTruck } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2><ImTruck /> OrderX</h2><br />
        <h3>NOAH</h3>
      </div>

      <ul className="sidemenu">
        <li>
          <div className="menu-item dropdown" onClick={() => toggleMenu("dashboard")}>
            Dashboard
            {activeMenu === "dashboard" ? <FaChevronDown className="dropdown-icon" /> : <FaChevronRight className="dropdown-icon" />}
          </div>
          {activeMenu === "dashboard" && (
            <ul className="submenu">
              <li><Link to={"/dashboard"} className="routelink">Overview</Link></li>
            </ul>
          )}
        </li>

        <li>
          <div className="menu-item dropdown" onClick={() => toggleMenu("products")}>
            Products
            {activeMenu === "products" ? <FaChevronDown className="dropdown-icon" /> : <FaChevronRight className="dropdown-icon" />}
          </div>
          {activeMenu === "products" && (
            <ul className="submenu">
              <li><Link to={"/addproduct"} className="routelink">Add Product</Link></li>
              <li><Link to={"/listproduct"} className="routelink">List Product</Link></li>
            </ul>
          )}
        </li>

        <li>
          <div className="menu-item dropdown" onClick={() => toggleMenu("sales")}>
            Sales
            {activeMenu === "sales" ? <FaChevronDown className="dropdown-icon" /> : <FaChevronRight className="dropdown-icon" />}
          </div>
          {activeMenu === "sales" && (
            <ul className="submenu">
              <li><Link to={"/addsale"} className="routelink">Add Sale</Link></li>
              <li><Link to={"/listsale"} className="routelink">List Sale</Link></li>
              <li><Link to={"/addsalereturn"} className="routelink">Add Sale Return</Link></li>
              <li><Link to={"/returnlist"} className="routelink">Return List</Link></li>
            </ul>
          )}
        </li>

        <li>
          <div className="menu-item dropdown" onClick={() => toggleMenu("stock")}>
            Stock
            {activeMenu === "stock" ? <FaChevronDown className="dropdown-icon" /> : <FaChevronRight className="dropdown-icon" />}
          </div>
          {activeMenu === "stock" && (
            <ul className="submenu">
              <li><Link to={"/stock"} className="routelink">View Stock</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;