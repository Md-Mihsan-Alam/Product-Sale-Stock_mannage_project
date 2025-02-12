import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../Pages/Auth/Signup";
import Navbar from '../Component/Navbar/Navbar';
import Sidebar from '../Component/Sidebar/Sidebar';
import Dashboard from '../Pages/Dashboard/Dashboard';
import ProductList from '../Pages/Product/ProductList';
import AddProduct from '../Pages/Product/AddProduct';
import AddSale from '../Pages/Sales/AddSale';
import ListSale from '../Pages/Sales/ListSale';
import AddSaleReturn from '../Pages/Sales/AddSaleReturn';
import ReturnList from '../Pages/Sales/ReturnList';
import Stock from '../Pages/Stock/Stock';
import Non_page_404 from "../Pages/InvalideRoutePage/Non_page_404";

// Layout for authenticated pages
const ProtectedLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <div>{children}</div>
        </>
    );
};

// Layout for unauthenticated pages
const PublicLayout = ({ children }) => {
    return <div>{children}</div>;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes (no Navbar and Sidebar) */}
                <Route path="/" element={<PublicLayout><Signup /></PublicLayout>} />

                {/* Protected Routes (with Navbar and Sidebar) */}
                <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
                <Route path="/addproduct" element={<ProtectedLayout><AddProduct /></ProtectedLayout>} />
                <Route path="/listproduct" element={<ProtectedLayout><ProductList /></ProtectedLayout>} />
                <Route path="/addsale" element={<ProtectedLayout><AddSale /></ProtectedLayout>} />
                <Route path="/listsale" element={<ProtectedLayout><ListSale /></ProtectedLayout>} />
                <Route path="/addsalereturn" element={<ProtectedLayout><AddSaleReturn /></ProtectedLayout>} />
                <Route path="/returnlist" element={<ProtectedLayout><ReturnList /></ProtectedLayout>} />
                <Route path="/stock" element={<ProtectedLayout><Stock /></ProtectedLayout>} />
                <Route path="*" element={<Non_page_404 />} />
                
            </Routes>
        </Router>
    );
};

export default AppRoutes;






// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "../Pages/Auth/Signup";
// import Navbar from '../Component/Navbar/Navbar';
// import Sidebar from '../Component/Sidebar/Sidebar';
// import Dashboard from '../Pages/Dashboard/Dashboard';
// import ProductList from '../Pages/Product/ProductList';
// import AddProduct from '../Pages/Product/AddProduct';
// import AddSale from '../Pages/Sales/AddSale';
// import ListSale from '../Pages/Sales/ListSale';
// import AddSaleReturn from '../Pages/Sales/AddSaleReturn';
// import ReturnList from '../Pages/Sales/ReturnList';
// import Stock from '../Pages/Stock/Stock';
// import ProtectedRoute from "../Pages/Auth/ProtectedRoute";
// import Non_page_404 from "../Pages/InvalideRoutePage/Non_page_404";

// // Layout for authenticated pages
// const ProtectedLayout = ({ children }) => {
//     return (
//         <>
//             <Navbar />
//             <Sidebar />
//             <div>{children}</div>
//         </>
//     );
// };

// // Layout for unauthenticated pages
// const PublicLayout = ({ children }) => {
//     return <div>{children}</div>;
// };

// const AppRoutes = () => {
//     return (
//         <Router>
//             <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<PublicLayout><Signup /></PublicLayout>} />

//                 {/* Protected Routes */}
//                 <Route
//                     path="/dashboard"
//                     element={
//                         <ProtectedRoute>
//                             <ProtectedLayout>
//                                 <Dashboard />
//                             </ProtectedLayout>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/addproduct"
//                     element={
//                         <ProtectedRoute>
//                             <ProtectedLayout>
//                                 <AddProduct />
//                             </ProtectedLayout>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/listproduct"
//                     element={
//                         <ProtectedRoute>
//                             <ProtectedLayout>
//                                 <ProductList />
//                             </ProtectedLayout>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/addsalereturn"
//                     element={
//                         <ProtectedRoute>
//                             <ProtectedLayout><AddSaleReturn /></ProtectedLayout>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/returnlist"
//                     element={
//                         <ProtectedRoute>
//                             <ProtectedLayout><ReturnList /></ProtectedLayout>
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/stock"
//                     element={
//                         <ProtectedRoute>
//                             <ProtectedLayout><Stock /></ProtectedLayout>
//                         </ProtectedRoute>
//                     }
//                 />
//                  <Route
//                     path="*"
//                     element={
//                         <ProtectedRoute>
//                             <ProtectedLayout><Non_page_404 /></ProtectedLayout>
//                         </ProtectedRoute>
//                     }
//                 />
//             </Routes>
//         </Router>
//     );
// };

// export default AppRoutes;
