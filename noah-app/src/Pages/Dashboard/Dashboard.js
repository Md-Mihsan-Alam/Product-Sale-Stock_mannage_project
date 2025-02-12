// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import DashboardCard from "../../Component/Dashboard/DashboardCard";
// import { FaFileInvoice, FaCartPlus, FaTruck } from "react-icons/fa";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalSales: 0,
//     totalSalesReturn: 0,
//     totalStock: 0,
//     currentStock: 0,
//     totalProductAdded: 0,
//     totalEarnings: 0,
//   });

//   const [selectedPeriod, setSelectedPeriod] = useState("Today");
//   const navigate = useNavigate();

//   // Fetch data for sales, returns, stock, products, etc.
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch sales data
//         const salesResponse = await axios.get(
//           "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/Add_Sale_Data"
//         );
//         const salesData = salesResponse.data;

//         // Fetch sales return data
//         const returnResponse = await axios.get(
//           "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/Add_Sale_Return_Data"
//         );
//         const returnData = returnResponse.data;

//         // Fetch stock data
//         const stockResponse = await axios.get(
//           "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products"
//         );
//         const stockData = stockResponse.data;

//         // Calculate total sales (count the number of sale records)
//         const totalSales = salesData.length;

//         // Calculate total sales return (count the number of return records)
//         const totalSalesReturn = returnData.length;

//         // Calculate total stock (sum of stocks from all products)
//         const totalStock = stockData.reduce((sum, product) => sum + (product.stock || 0), 0);

//         // Calculate current stock by subtracting stock out from stock in
//         const calculateStockOut = (productName) => {
//           const salesStock = salesData
//             .flatMap((sale) => sale.products)
//             .filter((product) => product.productName === productName)
//             .reduce((total, product) => total + (product.quantity || 0), 0);

//           const returnStock = returnData
//             .flatMap((returnItem) => returnItem.products)
//             .filter((product) => product.productName === productName)
//             .reduce((total, product) => total + (product.quantity || 0), 0);

//           return salesStock - returnStock;
//         };

//         const currentStock = stockData.reduce((sum, product) => {
//           const stockIn = product.stock || 0;
//           const stockOut = calculateStockOut(product.productName);
//           return sum + (stockIn - stockOut);
//         }, 0);

//         // Calculate total products added (count of products in the stock)
//         const totalProductAdded = stockData.length;

//         // Calculate total earnings (sum of netAmount from Add_Sale_Data)
//         const totalEarnings = salesData.reduce((sum, item) => sum + parseFloat(item.netAmount || 0), 0);

//         setDashboardData({
//           totalSales,
//           totalSalesReturn,
//           totalStock,
//           currentStock,
//           totalProductAdded,
//           totalEarnings,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedPeriod]);

//   // Filter sales and returns by selected period
//   const handlePeriodChange = (period) => {
//     setSelectedPeriod(period);
//   };

//   // Button handlers for navigation
//   const navigateToAddProduct = () => navigate("/addproduct");
//   const navigateToAddSale = () => navigate("/addsale");
//   const navigateToAddSaleReturn = () => navigate("/addsalereturn");

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Dashboard</h1>
//         <div className="time-meters">
//           <button onClick={() => handlePeriodChange("Today")}>Today</button>
//           <button onClick={() => handlePeriodChange("This Week")}>This Week</button>
//           <button onClick={() => handlePeriodChange("This Month")}>This Month</button>
//           <button onClick={() => handlePeriodChange("This Financial Year")}>
//             This Financial Year
//           </button>
//         </div>
//       </div>

//       <div className="dashboard-cards">
//         <DashboardCard title="Total Sales" value={dashboardData.totalSales} />
//         <DashboardCard title="Total Sale Returns" value={dashboardData.totalSalesReturn} />
//         <DashboardCard title="Total Stock" value={dashboardData.totalStock} />
//         <DashboardCard title="Current Stock" value={dashboardData.currentStock} />
//         <DashboardCard title="Total Products Added" value={dashboardData.totalProductAdded} />
//         <DashboardCard
//           title="Total Earnings"
//           value={`$${dashboardData.totalEarnings.toFixed(2)}`}
//         />
//       </div>

//       <div className="action-cards">
//         <button onClick={navigateToAddProduct} style={{border: "none"}}>
//         <DashboardCard
//           title="Go to Add Product"
//           icon={<FaFileInvoice />}
//         />
//         </button>
//         <button onClick={navigateToAddSale} style={{border: "none"}}>
//         <DashboardCard
//           title="Go to Add Sale"
//           icon={<FaCartPlus />}
//         />
//         </button>
//         <button onClick={navigateToAddSaleReturn} style={{border: "none"}}>
//         <DashboardCard
//           title="Go to Add Sale Return "
//           icon={<FaTruck />}
//         />
//         </button>
//       </div>

//       <div className="period-info">
//         <h3>Selected Period: {selectedPeriod}</h3>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;










import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import DashboardCard from "../../Component/Dashboard/DashboardCard";
import { FaFileInvoice, FaCartPlus, FaTruck } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalSalesReturn: 0,
    totalStock: 0,
    currentStock: 0,
    totalProductAdded: 0,
    totalEarnings: 0,
  });

  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const navigate = useNavigate();

  // Calculate date ranges
  const getDateRanges = (period) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const startOfFinancialYear = new Date(
      today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1,
      3,
      1
    );

    switch (period) {
      case "Today":
        return { startDate: today, endDate: today };
      case "This Week":
        return { startDate: startOfWeek, endDate: today };
      case "This Month":
        return { startDate: startOfMonth, endDate: today };
      case "This Financial Year":
        return { startDate: startOfFinancialYear, endDate: today };
      default:
        return { startDate: today, endDate: today };
    }
  };

  // Fetch data based on the selected period
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { startDate, endDate } = dateRange;

        // Fetch sales data
        const salesResponse = await axios.get(
          "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/Add_Sale_Data"
        );
        const salesData = salesResponse.data;

        // Filter sales data by date range
        const filteredSalesData = salesData.filter((sale) => {
          const saleDate = new Date(sale.date); // Assuming each sale has a `date` property
          return saleDate >= startDate && saleDate <= endDate;
        });

        // Fetch sales return data
        const returnResponse = await axios.get(
          "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/Add_Sale_Return_Data"
        );
        const returnData = returnResponse.data;

        const filteredReturnData = returnData.filter((returnItem) => {
          const returnDate = new Date(returnItem.date); // Assuming each return has a `date` property
          return returnDate >= startDate && returnDate <= endDate;
        });

        // Fetch stock data
        const stockResponse = await axios.get(
          "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products"
        );
        const stockData = stockResponse.data;

        // Calculate total sales, returns, and other metrics (similar to your original code)
        const totalSales = filteredSalesData.length;
        const totalSalesReturn = filteredReturnData.length;
        const totalStock = stockData.reduce((sum, product) => sum + (product.stock || 0), 0);

        const calculateStockOut = (productName) => {
          const salesStock = filteredSalesData
            .flatMap((sale) => sale.products)
            .filter((product) => product.productName === productName)
            .reduce((total, product) => total + (product.quantity || 0), 0);

          const returnStock = filteredReturnData
            .flatMap((returnItem) => returnItem.products)
            .filter((product) => product.productName === productName)
            .reduce((total, product) => total + (product.quantity || 0), 0);

          return salesStock - returnStock;
        };

        const currentStock = stockData.reduce((sum, product) => {
          const stockIn = product.stock || 0;
          const stockOut = calculateStockOut(product.productName);
          return sum + (stockIn - stockOut);
        }, 0);

        const totalProductAdded = stockData.length;
        const totalEarnings = filteredSalesData.reduce(
          (sum, item) => sum + parseFloat(item.netAmount || 0),
          0
        );

        setDashboardData({
          totalSales,
          totalSalesReturn,
          totalStock,
          currentStock,
          totalProductAdded,
          totalEarnings,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (dateRange.startDate && dateRange.endDate) {
      fetchData();
    }
  }, [dateRange]);

  // Handle period button click
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    const range = getDateRanges(period);
    setDateRange(range);
  };

  // Button handlers for navigation
  const navigateToAddProduct = () => navigate("/addproduct");
  const navigateToAddSale = () => navigate("/addsale");
  const navigateToAddSaleReturn = () => navigate("/addsalereturn");

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="time-meters">
          {["Today", "This Week", "This Month", "This Financial Year"].map((period) => (
            <button key={period} onClick={() => handlePeriodChange(period)}>
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-cards">
        <DashboardCard title="Total Sales" value={dashboardData.totalSales} />
        <DashboardCard title="Total Sale Returns" value={dashboardData.totalSalesReturn} />
        <DashboardCard title="Total Stock" value={dashboardData.totalStock} />
        <DashboardCard title="Current Stock" value={dashboardData.currentStock} />
        <DashboardCard title="Total Products Added" value={dashboardData.totalProductAdded} />
        <DashboardCard
          title="Total Earnings"
          value={`$${dashboardData.totalEarnings.toFixed(2)}`}
        />
      </div>

      <div className="action-cards">
        <button onClick={navigateToAddProduct} style={{ border: "none" }}>
          <DashboardCard title="Go to Add Product" icon={<FaFileInvoice />} />
        </button>
        <button onClick={navigateToAddSale} style={{ border: "none" }}>
          <DashboardCard title="Go to Add Sale" icon={<FaCartPlus />} />
        </button>
        <button onClick={navigateToAddSaleReturn} style={{ border: "none" }}>
          <DashboardCard title="Go to Add Sale Return" icon={<FaTruck />} />
        </button>
      </div>

      <div className="period-info">
        <h3>Selected Period: {selectedPeriod}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
