import React from "react";
import "./Navbar.css"
import { FaBell, FaCog, FaEnvelope, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="search-bar">
          <input type="text" className="NavSearch" placeholder="Search....." />
        </div>
        <ul className="menu">
          <li><Link to={"/dashboard"} className="routelink">Dashboard</Link></li>
          <li><Link to={"/addproduct"} className="routelink">Product</Link></li>
          <li><Link to={"/addsale"} className="routelink">Sales</Link></li>
          <li><Link to={"/stock"} className="routelink">Stock</Link></li>

        </ul>
      </div>

      <div className="navbar-right">
        <FaBell className="icon" />
        <FaEnvelope className="icon" />
        <FaCog className="icon" />
        <ul className="menu">
        <li><Link to={"/"} className="routelink"><FaUser className="icon"/></Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import "./Navbar.css";
// import { FaBell, FaCog, FaEnvelope, FaUser } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="navbar-left">
//         <div className="search-bar">
//           <input type="text" placeholder="Search....." />
//         </div>
//         <ul className="menu">
//           <li><Link to="/">Dashboard</Link></li> {/* Link to Dashboard */}
//           <li><Link to="/add-product">Product</Link></li> {/* Link to AddProduct */}
//           <li><Link to="/add-sale">Sales</Link></li> {/* Link to AddSale */}
//           <li><Link to="/stock">Stock</Link></li> {/* Link to Stock */}
//         </ul>
//       </div>
//       <div className="navbar-right">
//         <FaBell className="icon" />
//         <FaEnvelope className="icon" />
//         <FaCog className="icon" />
//         <FaUser className="icon" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;
