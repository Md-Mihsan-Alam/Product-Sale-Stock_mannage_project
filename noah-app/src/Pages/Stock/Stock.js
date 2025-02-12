// import React, { useState, useEffect } from "react";
// import "./Stock.css";

// const Stock = () => {
//   const [products, setProducts] = useState([]);
//   const [salesData, setSalesData] = useState([]);
//   const [returnData, setReturnData] = useState([]);
//   const [filterProduct, setFilterProduct] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterBrand, setFilterBrand] = useState("");

//   // Fetch data from APIs
//   const fetchData = async () => {
//     try {
//       const productResponse = await fetch(
//         "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products"
//       );
//       const salesResponse = await fetch(
//         "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/Add_Sale_Data"
//       );
//       const returnResponse = await fetch(
//         "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/Add_Sale_Return_Data"
//       );

//       const productsData = await productResponse.json();
//       const salesData = await salesResponse.json();
//       const returnData = await returnResponse.json();

//       setProducts(productsData);
//       setSalesData(salesData);
//       setReturnData(returnData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     // Poll for updates every 5 seconds
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval); // Cleanup the interval on unmount
//   }, []);

//   // Calculate stock in from the products API
//   const calculateStockIn = (productName) => {
//     const product = products.find((p) => p.productName === productName);
//     return product?.stock || 0;
//   };

//   // Calculate stock out: Add Sale minus Add Sale Return
//   const calculateStockOut = (productName) => {
//     const salesStock = salesData
//       .flatMap((sale) => sale.products)
//       .filter((product) => product.productName === productName)
//       .reduce((total, product) => total + (product.stock || 0), 0);

//     const returnStock = returnData
//       .flatMap((returnItem) => returnItem.products)
//       .filter((product) => product.productName === productName)
//       .reduce((total, product) => total + (product.stock || 0), 0);

//     return salesStock - returnStock; // Net stock out
//   };

//   // Get product description from the products API
//   const getDescription = (productName) => {
//     const matchingProduct = products.find(
//       (product) => product.productName === productName
//     );
//     return matchingProduct?.description || "No description available";
//   };

//   // Filter products based on user input
//   const filteredProducts = products.filter(
//     (product) =>
//       (filterProduct ? product.productName === filterProduct : true) &&
//       (filterCategory ? product.category === filterCategory : true) &&
//       (filterBrand ? product.brand === filterBrand : true)
//   );

//   // Total stock in, stock out, and current stock for all filtered products
//   const totalStockIn = filteredProducts.reduce(
//     (total, product) => total + calculateStockIn(product.productName),
//     0
//   );

//   const totalStockOut = filteredProducts.reduce(
//     (total, product) => total + calculateStockOut(product.productName),
//     0
//   );

//   const totalCurrentStock = totalStockIn - totalStockOut;

//   return (
//     <div className="stock-list">
//       {/* Filter Section */}
//       <div className="filter-section">
//         <div>
//           <label htmlFor="product">Product:</label>
//           <select
//             id="product"
//             value={filterProduct}
//             onChange={(e) => setFilterProduct(e.target.value)}
//           >
//             <option value="">All</option>
//             {products.map((product) => (
//               <option key={product.id} value={product.productName}>
//                 {product.productName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="category">Category:</label>
//           <select
//             id="category"
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//           >
//             <option value="">All</option>
//             {[...new Set(products.map((product) => product.category))].map(
//               (category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               )
//             )}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="brand">Brand:</label>
//           <select
//             id="brand"
//             value={filterBrand}
//             onChange={(e) => setFilterBrand(e.target.value)}
//           >
//             <option value="">All</option>
//             {[...new Set(products.map((product) => product.brand))].map(
//               (brand, index) => (
//                 <option key={index} value={brand}>
//                   {brand}
//                 </option>
//               )
//             )}
//           </select>
//         </div>
//       </div>

//       {/* Stock Table */}
//       <table>
//         <thead>
//           <tr>
//             <th>SL</th>
//             <th>Pro. Brand</th>
//             <th>Pro. Name</th>
//             <th>Description</th>
//             <th>Stock In</th>
//             <th>Stock Out</th>
//             <th>Current Stock</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((product, index) => {
//             const stockIn = calculateStockIn(product.productName);
//             const stockOut = calculateStockOut(product.productName);
//             const currentStock = stockIn - stockOut; // Adjust for returned stock
//             const description = getDescription(product.productName);

//             return (
//               <tr key={product.id}>
//                 <td>{index + 1}</td>
//                 <td>{product.brand}</td>
//                 <td>{product.productName}</td>
//                 <td>{description}</td>
//                 <td>{stockIn}</td>
//                 <td>{stockOut}</td>
//                 <td>{currentStock >= 0 ? currentStock : "Stock problem"}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan="4">Total</td>
//             <td>{totalStockIn}</td>
//             <td>{totalStockOut}</td>
//             <td>{totalCurrentStock >= 0 ? totalCurrentStock : "Stock problem"}</td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// };

// export default Stock;






import React, { useState, useEffect } from "react";
import "./Stock.css";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [filterProduct, setFilterProduct] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  // Fetch data from APIs
  const fetchData = async () => {
    try {
      const productResponse = await fetch(
        "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products"
      );
      const salesResponse = await fetch(
        "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/Add_Sale_Data"
      );
      const returnResponse = await fetch(
        "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/Add_Sale_Return_Data"
      );

      const productsData = await productResponse.json();
      const salesData = await salesResponse.json();
      const returnData = await returnResponse.json();

      setProducts(productsData);
      setSalesData(salesData);
      setReturnData(returnData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  // Calculate stock in from the products API
  const calculateStockIn = (productName) => {
    const product = products.find((p) => p.productName === productName);
    return product?.stock || 0;
  };

  // Calculate stock out: Add Sale quantity minus Add Sale Return quantity
  const calculateStockOut = (productName) => {
    // Get total quantity sold (stock out) from sales data
    const salesStock = salesData
      .flatMap((sale) => sale.products)
      .filter((product) => product.productName === productName)
      .reduce((total, product) => total + (product.quantity || 0), 0);

    // Get total quantity returned (stock in) from return data
    const returnStock = returnData
      .flatMap((returnItem) => returnItem.products)
      .filter((product) => product.productName === productName)
      .reduce((total, product) => total + (product.quantity || 0), 0);

    return salesStock - returnStock; // Net stock out
  };

  // Get product description from the products API
  const getDescription = (productName) => {
    const matchingProduct = products.find(
      (product) => product.productName === productName
    );
    return matchingProduct?.description || "No description available";
  };

  // Filter products based on user input
  const filteredProducts = products.filter(
    (product) =>
      (filterProduct ? product.productName === filterProduct : true) &&
      (filterCategory ? product.category === filterCategory : true) &&
      (filterBrand ? product.brand === filterBrand : true)
  );

  // Total stock in, stock out, and current stock for all filtered products
  const totalStockIn = filteredProducts.reduce(
    (total, product) => total + calculateStockIn(product.productName),
    0
  );

  const totalStockOut = filteredProducts.reduce(
    (total, product) => total + calculateStockOut(product.productName),
    0
  );

  const totalCurrentStock = totalStockIn - totalStockOut;

  return (
    <div className="stock-list">
      {/* Filter Section */}
      <div className="filter-section">
        <div>
          <label htmlFor="product">Product:</label>
          <select
            id="product"
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
          >
            <option value="">All</option>
            {products.map((product) => (
              <option key={product.id} value={product.productName}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(products.map((product) => product.category))].map(
              (category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label htmlFor="brand">Brand:</label>
          <select
            id="brand"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(products.map((product) => product.brand))].map(
              (brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Stock Table */}
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Pro. Brand</th>
            <th>Pro. Name</th>
            <th>Description</th>
            <th>Stock In</th>
            <th>Stock Out</th>
            <th>Current Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => {
            const stockIn = calculateStockIn(product.productName);
            const stockOut = calculateStockOut(product.productName);
            const currentStock = stockIn - stockOut; // Adjust for returned stock
            const description = getDescription(product.productName);

            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.brand}</td>
                <td>{product.productName}</td>
                <td>{description}</td>
                <td>{stockIn}</td>
                <td>{stockOut}</td>
                <td>{currentStock >= 0 ? currentStock : "Stock problem"}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{totalStockIn}</td>
            <td>{totalStockOut}</td>
            <td>{totalCurrentStock >= 0 ? totalCurrentStock : "Stock problem"}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Stock;
