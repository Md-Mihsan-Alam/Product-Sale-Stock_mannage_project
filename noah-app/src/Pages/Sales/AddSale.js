// import { saveSaleDataToServer } from "../../utils/api";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Sales.css";
// import { useNavigate } from "react-router-dom";

// const AddSale = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([
//     { productName: "", description: "", stock: 0, quantity: 0, warranty: "", unitPrice: 0, netAmount: 0 },
//   ]);

//   const [formDetails, setFormDetails] = useState({
//     customerName: "",
//     address: "",
//     invoiceNumber: "",
//     previousDues: 0,
//     date: "",
//     remarks: "",
//     nextPaymentDate: "",
//     chalanDescription: "",
//   });

//   const [account, setAccount] = useState({
//     transportCost: 0,
//     discountAmount: 0,
//     discountPercentage: 0,
//     cashReceived: 0,
//     paymentMethod: "",
//   });

//   const navigate = useNavigate();

//   const handleListSaleNavigate = () => {
//     navigate("/listsale");
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products"
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleProductChange = (index, value) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].productName = value;

//     const selectedProduct = products.find((product) => product.productName === value);
//     if (selectedProduct) {
//       updatedProducts[index] = {
//         ...updatedProducts[index],
//         description: selectedProduct.description || "",
//         stock: selectedProduct.stock || 0,
//         warranty: selectedProduct.warranty || "",
//         unitPrice: selectedProduct.unitPrice || 0,
//         netAmount: updatedProducts[index].quantity * selectedProduct.unitPrice,
//       };
//     }

//     setSelectedProducts(updatedProducts);
//   };

//   const handleProductQuantityChange = (index, quantity) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].quantity = Number(quantity);
//     updatedProducts[index].netAmount = Number(quantity) * updatedProducts[index].unitPrice;
//     setSelectedProducts(updatedProducts);
//   };

//   const handleUnitPriceChange = (index, price) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].unitPrice = Number(price);
//     updatedProducts[index].netAmount = updatedProducts[index].quantity * Number(price);
//     setSelectedProducts(updatedProducts);
//   };

//   const handleStockChange = (index, stock) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].stock = Number(stock);
//     setSelectedProducts(updatedProducts);
//   };

//   const handleDiscountPercentageChange = (percentage) => {
//     const discountAmount = (calculateTotal() * Number(percentage)) / 100;
//     setAccount({ ...account, discountPercentage: Number(percentage), discountAmount });
//   };

//   const handleDiscountAmountChange = (amount) => {
//     const discountPercentage = (Number(amount) / calculateTotal()) * 100;
//     setAccount({ ...account, discountAmount: Number(amount), discountPercentage });
//   };

//   const addProductRow = () => {
//     setSelectedProducts([
//       ...selectedProducts,
//       { productName: "", description: "", stock: 0, quantity: 0, warranty: "", unitPrice: 0, netAmount: 0 },
//     ]);
//   };

//   const removeProductRow = (index) => {
//     const updatedProducts = selectedProducts.filter((_, i) => i !== index);
//     setSelectedProducts(updatedProducts);
//   };

//   const calculateTotal = () => {
//     const totalProductAmount = selectedProducts.reduce((acc, product) => acc + product.netAmount, 0);
//     const total = totalProductAmount + Number(account.transportCost) - Number(account.discountAmount);
//     return total >= 0 ? total : 0;
//   };

//   const calculateDueAmount = () => {
//     const totalAmount = calculateTotal();
//     const dueAmount = totalAmount - account.cashReceived;
//     return dueAmount >= 0 ? dueAmount : 0;
//   };

//   const handleSubmit = async () => {
//     const saleData = {
//       customerName: formDetails.customerName || "",
//       address: formDetails.address || "",
//       invoiceNumber: formDetails.invoiceNumber || "",
//       previousDues: formDetails.previousDues || 0,
//       date: formDetails.date || "",
//       remarks: formDetails.remarks || "",
//       nextPaymentDate: formDetails.nextPaymentDate || "",
//       chalanDescription: formDetails.chalanDescription || "",
//       products: selectedProducts.map((product) => ({
//         productName: product.productName || "",
//         description: product.description || "",
//         stock: product.stock || 0,
//         quantity: product.quantity || 0,
//         warranty: product.warranty || "",
//         unitPrice: product.unitPrice || 0,
//         netAmount: product.netAmount || 0,
//       })),
//       transportCost: account.transportCost || 0,
//       discountAmount: account.discountAmount || 0,
//       discountPercentage: account.discountPercentage || 0,
//       cashReceived: account.cashReceived || 0,
//       paymentMethod: account.paymentMethod || "Doesn't selected",
//       total: calculateTotal(),
//       dueAmount: calculateDueAmount(),
//     };

//     try {
//       const response = await saveSaleDataToServer(saleData);
//       console.log("Sale data saved successfully:", response);
//       alert("Sale added successfully!");
//       handleClose();
//     } catch (error) {
//       console.error("Error saving sale data:", error);
//       alert("Failed to save sale. Please try again.");
//     }
//   };

//   const handleClose = () => {
//     setFormDetails({
//       customerName: "",
//       address: "",
//       invoiceNumber: "",
//       previousDues: 0,
//       date: "",
//       remarks: "",
//       nextPaymentDate: "",
//       chalanDescription: "",
//     });
//     setSelectedProducts([{ productName: "", description: "", stock: 0, quantity: 0, warranty: "", unitPrice: 0, netAmount: 0 }]);
//     setAccount({
//       transportCost: 0,
//       discountAmount: 0,
//       discountPercentage: 0,
//       cashReceived: 0,
//       paymentMethod: "",
//     });
//   };

//   return (
//     <div className="add-sale">
//       <h2>Add Sale</h2>
//       <div className="go-to-listproductbx">
//         <button className="go-to-listproduct" onClick={handleListSaleNavigate}>List Product</button>
//       </div>

//             <div className="addsale-form-section">
//               {[
//                 { label: "Customer Name", key: "customerName" },
//                 { label: "Address", key: "address" },
//                 { label: "Invoice Number", key: "invoiceNumber" },
//                 { label: "Previous Dues", key: "previousDues" },
//                 { label: "Date", key: "date", type: "date" },
//                 { label: "Remarks", key: "remarks" },
//                 { label: "Next Payment Date", key: "nextPaymentDate", type: "date" },
//                 { label: "Chalan Description", key: "chalanDescription" },
//               ].map(({ label, key, type = "text" }) => (
//               <div className="addsale-form-group" key={key}>
//               <label>{label}</label>
//                 <input
//                   type={type}
//                   value={formDetails[key]}
//                   onChange={(e) => setFormDetails({ ...formDetails, [key]: e.target.value })}
//                 />
//               </div>
//               ))}
//             </div>

//       {/* Product Section */}
//       <div className="addsale-product-section">
//         {selectedProducts.map((product, index) => (
//           <div className="addsale-product-row" key={index}>
//             <select
//               value={product.productName}
//               onChange={(e) => handleProductChange(index, e.target.value)}
//             >
//               <option value="">Select Product</option>
//               {products.map((productOption) => (
//                 <option key={productOption.id} value={productOption.productName}>
//                   {productOption.productName}
//                 </option>
//               ))}
//             </select>
//             <input type="text" value={product.description} placeholder="Product Description" disabled />
//             <input type="number" value={product.stock} placeholder="Stock" disabled />
//             <input
//               type="number"
//               value={product.quantity || ""}
//               placeholder="Enter Quantity"
//               onChange={(e) => {
//                 const quantity = e.target.value;
//                 handleProductQuantityChange(index, quantity);
//                 handleStockChange(index, quantity);
//               }}
//             />
//             <input type="text" value={product.warranty} placeholder="Warranty" disabled />
//             <input
//               type="number"
//               value={product.unitPrice || ""}
//               placeholder="Enter Unit Price"
//               onChange={(e) => handleUnitPriceChange(index, e.target.value)}
//             />
//             <input type="number" value={product.netAmount || ""} placeholder="Net Amount" disabled />
//             <button className="addsale-remove-btn" onClick={() => removeProductRow(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button className="addsale-add-btn" onClick={addProductRow}>+ Add Product</button>
//       </div>

//       {/* Account Section */}
//       <div className="addsale-account-section">
//         <div>
//           <label>Transport Cost</label>
//           <input
//             type="number"
//             value={account.transportCost}
//             onChange={(e) => setAccount({ ...account, transportCost: Number(e.target.value) })}
//           />
//         </div>
//         <div>
//           <label>Discount (%)</label>
//           <input
//             type="number"
//             value={account.discountPercentage}
//             onChange={(e) => handleDiscountPercentageChange(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Discount Amount</label>
//           <input
//             type="number"
//             value={account.discountAmount}
//             onChange={(e) => handleDiscountAmountChange(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Cash Received</label>
//           <input
//             type="number"
//             value={account.cashReceived}
//             onChange={(e) => setAccount({ ...account, cashReceived: Number(e.target.value) })}
//           />
//         </div>
//         <div>
//           <label>Payment Method</label>
//           <select
//             value={account.paymentMethod}
//             onChange={(e) => setAccount({ ...account, paymentMethod: e.target.value })}
//           >
//             <option value="">Select Payment Method</option>
//             <option value="Cash">Cash</option>
//             <option value="Credit">Credit</option>
//             <option value="Bank">Bank</option>
//           </select>
//         </div>
//         <div>
//           <label>Total Amount</label>
//           <input type="number" value={calculateTotal()} disabled />
//         </div>
//         <div>
//           <label>Due Amount</label>
//           <input type="number" value={calculateDueAmount()} disabled />
//         </div>
//       </div>

//       <div className="addsale-buttons">
//         <button onClick={handleSubmit} className="addsale-submit-btn">Submit</button>
//         <button onClick={handleClose} className="addsale-close-btn">Reset</button>
//       </div>
//     </div>
//   );
// };

// export default AddSale;







import { saveSaleDataToServer } from "../../utils/api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css";
import { useNavigate } from "react-router-dom";

const AddSale = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([
    { productName: "", description: "", stock: 0, quantity: 0, warranty: "", unitPrice: 0, netAmount: 0 },
  ]);

  const [formDetails, setFormDetails] = useState({
    customerName: "",
    address: "",
    invoiceNumber: "",
    previousDues: 0,
    date: "",
    remarks: "",
    nextPaymentDate: "",
    chalanDescription: "",
  });

  const [account, setAccount] = useState({
    transportCost: 0,
    discountAmount: 0,
    discountPercentage: 0,
    cashReceived: 0,
    paymentMethod: "",
  });

  const navigate = useNavigate();

  const handleListSaleNavigate = () => {
    navigate("/listsale");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (index, value) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].productName = value;

    const selectedProduct = products.find((product) => product.productName === value);
    if (selectedProduct) {
      updatedProducts[index] = {
        ...updatedProducts[index],
        description: selectedProduct.description || "",
        stock: selectedProduct.stock || 0, // Initial stock
        warranty: selectedProduct.warranty || "",
        unitPrice: selectedProduct.unitPrice || 0,
        netAmount: updatedProducts[index].quantity * selectedProduct.unitPrice,
      };
    }

    setSelectedProducts(updatedProducts);
  };

  const handleProductQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    const initialStock = products.find(
      (product) => product.productName === updatedProducts[index].productName
    )?.stock;

    const updatedQuantity = Number(quantity);
    const updatedStock = initialStock - updatedQuantity;

    updatedProducts[index].quantity = updatedQuantity;
    updatedProducts[index].stock = updatedStock >= 0 ? updatedStock : 0;
    updatedProducts[index].netAmount = updatedQuantity * updatedProducts[index].unitPrice;

    setSelectedProducts(updatedProducts);
  };

  const handleUnitPriceChange = (index, price) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].unitPrice = Number(price);
    updatedProducts[index].netAmount = updatedProducts[index].quantity * Number(price);
    setSelectedProducts(updatedProducts);
  };

  const handleDiscountPercentageChange = (percentage) => {
    const discountAmount = (calculateTotal() * Number(percentage)) / 100;
    setAccount({ ...account, discountPercentage: Number(percentage), discountAmount });
  };

  const handleDiscountAmountChange = (amount) => {
    const discountPercentage = (Number(amount) / calculateTotal()) * 100;
    setAccount({ ...account, discountAmount: Number(amount), discountPercentage });
  };

  const addProductRow = () => {
    setSelectedProducts([
      ...selectedProducts,
      { productName: "", description: "", stock: 0, quantity: 0, warranty: "", unitPrice: 0, netAmount: 0 },
    ]);
  };

  const removeProductRow = (index) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

  const calculateTotal = () => {
    const totalProductAmount = selectedProducts.reduce((acc, product) => acc + product.netAmount, 0);
    const total = totalProductAmount + Number(account.transportCost) - Number(account.discountAmount);
    return total >= 0 ? total : 0;
  };

  const calculateDueAmount = () => {
    const totalAmount = calculateTotal();
    const dueAmount = totalAmount - account.cashReceived;
    return dueAmount >= 0 ? dueAmount : 0;
  };

  const validateStock = () => {
    for (let product of selectedProducts) {
      if (product.stock < 0) {
        alert(`Insufficient stock for ${product.productName}. Please adjust quantity.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStock()) return;

    const saleData = {
      customerName: formDetails.customerName || "",
      address: formDetails.address || "",
      invoiceNumber: formDetails.invoiceNumber || "",
      previousDues: formDetails.previousDues || 0,
      date: formDetails.date || "",
      remarks: formDetails.remarks || "",
      nextPaymentDate: formDetails.nextPaymentDate || "",
      chalanDescription: formDetails.chalanDescription || "",
      products: selectedProducts.map((product) => ({
        productName: product.productName || "",
        description: product.description || "",
        stock: product.stock || 0,
        quantity: product.quantity || 0,
        warranty: product.warranty || "",
        unitPrice: product.unitPrice || 0,
        netAmount: product.netAmount || 0,
      })),
      transportCost: account.transportCost || 0,
      discountAmount: account.discountAmount || 0,
      discountPercentage: account.discountPercentage || 0,
      cashReceived: account.cashReceived || 0,
      paymentMethod: account.paymentMethod || "Doesn't selected",
      total: calculateTotal(),
      dueAmount: calculateDueAmount(),
    };

    try {
      const response = await saveSaleDataToServer(saleData);
      console.log("Sale data saved successfully:", response);
      alert("Sale added successfully!");
      handleClose();
    } catch (error) {
      console.error("Error saving sale data:", error);
      alert("Failed to save sale. Please try again.");
    }
  };

  const handleClose = () => {
    setFormDetails({
      customerName: "",
      address: "",
      invoiceNumber: "",
      previousDues: 0,
      date: "",
      remarks: "",
      nextPaymentDate: "",
      chalanDescription: "",
    });
    setSelectedProducts([{ productName: "", description: "", stock: 0, quantity: 0, warranty: "", unitPrice: 0, netAmount: 0 }]);
    setAccount({
      transportCost: 0,
      discountAmount: 0,
      discountPercentage: 0,
      cashReceived: 0,
      paymentMethod: "",
    });
  };

  return (
    <div className="add-sale">
      <h2>Add Sale</h2>
      <div className="go-to-listproductbx">
        <button className="go-to-listproduct" onClick={handleListSaleNavigate}>List Product</button>
      </div>

      <div className="addsale-form-section">
        {[
          { label: "Customer Name", key: "customerName" },
          { label: "Address", key: "address" },
          { label: "Invoice Number", key: "invoiceNumber" },
          { label: "Previous Dues", key: "previousDues" },
          { label: "Date", key: "date", type: "date" },
          { label: "Remarks", key: "remarks" },
          { label: "Next Payment Date", key: "nextPaymentDate", type: "date" },
          { label: "Chalan Description", key: "chalanDescription" },
        ].map(({ label, key, type }) => (
          <div className="addsale-form-group" key={key}>
            <label>{label}</label>
            <input
              type={type || "text"}
              value={formDetails[key] || ""}
              onChange={(e) =>
                setFormDetails({ ...formDetails, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <div className="addsale-product-section">
        {selectedProducts.map((product, index) => (
          <div className="addsale-product-row" key={index}>
            <select
              value={product.productName}
              onChange={(e) => handleProductChange(index, e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.productName} value={p.productName}>
                  {p.productName}
                </option>
              ))}
            </select>
            <input type="text" value={product.description} placeholder="Product Description" disabled />
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) =>
                handleProductQuantityChange(index, e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={product.unitPrice}
              onChange={(e) => handleUnitPriceChange(index, e.target.value)}
            />
            <input
              type="text"
              placeholder="Warranty"
              value={product.warranty}
              disabled
            />
            <input
              type="number"
              placeholder="Stock Remaining"
              value={product.stock}
              disabled
            />
            <input
              type="number"
              placeholder="Net Amount"
              value={product.netAmount}
              disabled
            />
            <button className="addsale-remove-btn" onClick={() => removeProductRow(index)}>Remove</button>
          </div>
        ))}
        <button className="addsale-add-btn" onClick={addProductRow}>Add Product</button>
      </div>

      <div className="addsale-account-section">
        <h3>Account Details</h3>
        <div className="addsale-form-group">
          <label>Transport Cost</label>
          <input
            type="number"
            value={account.transportCost}
            onChange={(e) =>
              setAccount({ ...account, transportCost: Number(e.target.value) })
            }
          />
        </div>
        <div className="addsale-form-group">
          <label>Discount Percentage</label>
          <input
            type="number"
            value={account.discountPercentage}
            onChange={(e) =>
              handleDiscountPercentageChange(e.target.value)
            }
          />
        </div>
        <div className="addsale-form-group">
          <label>Discount Amount</label>
          <input
            type="number"
            value={account.discountAmount}
            onChange={(e) => handleDiscountAmountChange(e.target.value)}
          />
        </div>
        <div className="addsale-form-group">
          <label>Cash Received</label>
          <input
            type="number"
            value={account.cashReceived}
            onChange={(e) =>
              setAccount({ ...account, cashReceived: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Payment Method</label>
          <select
            value={account.paymentMethod}
            onChange={(e) => setAccount({ ...account, paymentMethod: e.target.value })}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
            <option value="Bank">Bank</option>
          </select>
        </div>
        <div>
          <label>Total Amount</label>
          <input type="number" value={calculateTotal()} disabled />
        </div>
        <div>
          <label>Due Amount</label>
          <input type="number" value={calculateDueAmount()} disabled />
        </div>
      </div>

      <div className="addsale-button">
        <button className="addsale-submit-btn" onClick={handleSubmit}>Submit</button>
        <button className="addsale-close-btn" onClick={handleClose}>Reset</button>
      </div>
    </div>
  );
};

export default AddSale;