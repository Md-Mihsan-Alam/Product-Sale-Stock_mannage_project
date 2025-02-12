import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveSaleReturnDataToServer } from "../../utils/api";
import "./Sales.css";
import { useNavigate } from "react-router-dom";

const AddSaleReturn = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([
    { productName: "", description: "", quantity: "", unitPrice: "", netAmount: "", stock: 0 },
  ]);

  const [formDetails, setFormDetails] = useState({
    customerName: "",
    address: "",
    previousDue: "",
    invoiceNumber: "",
    date: "",
    referenceDate: "",
  });

  const [accountDetails, setAccountDetails] = useState({
    discountAmount: "",
    discountPercentage: "",
    cashBack: "",
    dueAmount: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();

  const handleReturnListNavigate = () => {
    navigate("/returnlist");
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

    // Find the selected product from the list
    const selectedProduct = products.find((product) => product.productName === value);
    if (selectedProduct) {
      updatedProducts[index] = {
        ...updatedProducts[index],
        description: selectedProduct.description || "",
        unitPrice: selectedProduct.unitPrice || "",
        stock: selectedProduct.stock || 0,
        netAmount: updatedProducts[index].quantity * selectedProduct.unitPrice || 0,
      };
    }

    setSelectedProducts(updatedProducts);
  };

  const handleProductQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    const parsedQuantity = Number(quantity) || 0;

    // Adjust stock to match the current quantity input
    const selectedProduct = products.find(
      (product) => product.productName === updatedProducts[index].productName
    );
    const initialStock = selectedProduct ? selectedProduct.stock : 0;

    updatedProducts[index].quantity = parsedQuantity;
    updatedProducts[index].stock = initialStock + parsedQuantity;
    updatedProducts[index].netAmount = parsedQuantity * updatedProducts[index].unitPrice;
    setSelectedProducts(updatedProducts);
  };

  const calculateDueAmount = () => {
    const totalNetAmount = selectedProducts.reduce((acc, product) => acc + (product.netAmount || 0), 0);

    // Use the calculated discount amount
    const discountAmount =
      accountDetails.discountPercentage
        ? (accountDetails.discountPercentage / 100) * totalNetAmount
        : parseFloat(accountDetails.discountAmount) || 0;

    return totalNetAmount - discountAmount - (parseFloat(accountDetails.cashBack) || 0);
  };

  // Handle changes in account details with synchronization
  const handleAccountDetailsChange = (key, value) => {
    let updatedDetails = { ...accountDetails, [key]: value };

    // Update discount amount dynamically when discount percentage is entered
    if (key === "discountPercentage") {
      const totalNetAmount = selectedProducts.reduce((acc, product) => acc + (product.netAmount || 0), 0);
      const discountAmount = (value / 100) * totalNetAmount;
      updatedDetails.discountAmount = discountAmount.toFixed(2); // Update the discount amount
    }

    // Update discount percentage dynamically when discount amount is entered
    if (key === "discountAmount") {
      const totalNetAmount = selectedProducts.reduce((acc, product) => acc + (product.netAmount || 0), 0);
      const discountPercentage = (value / totalNetAmount) * 100 || 0;
      updatedDetails.discountPercentage = discountPercentage.toFixed(2); // Update the discount percentage
    }

    setAccountDetails(updatedDetails);
  };

  const handleSubmit = async () => {
    // Prepare the payload with all necessary details
    const saleReturnData = {
      customerName: formDetails.customerName,
      address: formDetails.address,
      previousDue: formDetails.previousDue,
      invoiceNumber: formDetails.invoiceNumber,
      date: formDetails.date,
      referenceDate: formDetails.referenceDate,
      products: selectedProducts.map((product) => ({
        productName: product.productName || "",
        description: product.description || "",
        quantity: product.quantity || 0,
        unitPrice: product.unitPrice || 0,
        netAmount: product.netAmount || 0,
        stock: product.stock || 0,
      })),
      discountAmount: accountDetails.discountAmount || "",
      discountPercentage: accountDetails.discountPercentage || "",
      cashBack: accountDetails.cashBack || "",
      dueAmount: calculateDueAmount(),
      paymentMethod: accountDetails.paymentMethod || "Doesn't selected",
    };

    try {
      const response = await saveSaleReturnDataToServer(saleReturnData);
      console.log("Sale return data saved successfully:", response);
      alert("Sale return processed successfully!");
      handleResetForm();
    } catch (error) {
      console.error("Error saving sale return data:", error);
      alert("Failed to process sale return. Please try again.");
    }
  };

  const handleResetForm = () => {
    setFormDetails({
      customerName: "",
      address: "",
      previousDue: "",
      invoiceNumber: "",
      date: "",
      referenceDate: "",
    });
    setSelectedProducts([
      { productName: "", description: "", quantity: "", unitPrice: "", netAmount: "", stock: 0 },
    ]);
    setAccountDetails({
      discountAmount: "",
      discountPercentage: "",
      cashBack: "",
      dueAmount: "",
      paymentMethod: "",
    });
  };

  return (
    <div className="add-sale-return">
      <h2>Add Sale Return</h2>
      <div className="go-to-returnlistbx">
        <button className="go-to-returnlist" onClick={handleReturnListNavigate}>
          Return List
        </button>
      </div>

      <div className="addsale-form-section">
        {[{ label: "Customer Name", key: "customerName" },
          { label: "Address", key: "address" },
          { label: "Previous Due", key: "previousDue", type: "number" },
          { label: "Invoice Number", key: "invoiceNumber" },
          { label: "Date", key: "date", type: "date" },
          { label: "Reference Date", key: "referenceDate", type: "date" }
        ].map(({ label, key, type = "text" }) => (
          <div className="addsale-form-group" key={key}>
            <label>{label}</label>
            <input
              type={type}
              value={formDetails[key] || ""}
              onChange={(e) => setFormDetails({ ...formDetails, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
{/* 
      <div className="addsale-product-section">
        {selectedProducts.map((product, index) => (
          <div className="addsale-product-row" key={index}>
            <select
              value={product.productName}
              onChange={(e) => handleProductChange(index, e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((productOption) => (
                <option key={productOption.id} value={productOption.productName}>
                  {productOption.productName}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={product.description || ""}
              onreadOnly
              />
              <input
                type="number"
                value={product.quantity || ""}
                onChange={(e) => handleProductQuantityChange(index, e.target.value)}
              />
              <input
                type="number"
                value={product.unitPrice || ""}
                onChange={(e) => {
                const updatedProducts = [...selectedProducts];
                updatedProducts[index].unitPrice = e.target.value;
                updatedProducts[index].netAmount = updatedProducts[index].quantity * e.target.value || "";
                setSelectedProducts(updatedProducts);
                }}
                placeholder="Unit Price"
              />
              <input
                type="number"
                value={product.netAmount || ""}
                onChange={(e) => {
                const updatedProducts = [...selectedProducts];
                updatedProducts[index].netAmount = e.target.value;
                setSelectedProducts(updatedProducts);
                }}
                placeholder="Net Amount"
              />
              <input
                type="number"
                value={product.stock || ""}
                readOnly
              />
            </div>
          ))}
          <button
            onClick={() =>
              setSelectedProducts([
                ...selectedProducts,
                { productName: "", description: "", quantity: "", unitPrice: "", netAmount: "", stock: 0 },
              ])
            }
          >
            Add Product
          </button>
        </div> */}

<div className="addsale-product-section">
  {selectedProducts.map((product, index) => (
    <div className="addsale-product-row" key={index}>
      <select
        value={product.productName}
        onChange={(e) => handleProductChange(index, e.target.value)}
      >
        <option value="">Select Product</option>
        {products.map((productOption) => (
          <option key={productOption.id} value={productOption.productName}>
            {productOption.productName}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={product.description || ""}
        disabled
      />
      <input
        type="number"
        value={product.quantity || ""}
        placeholder="Quantity"
        onChange={(e) => handleProductQuantityChange(index, e.target.value)}
      />
      <input
        type="number"
        value={product.unitPrice || ""}
        onChange={(e) => {
          const updatedProducts = [...selectedProducts];
          updatedProducts[index].unitPrice = e.target.value;
          updatedProducts[index].netAmount = updatedProducts[index].quantity * e.target.value || "";
          setSelectedProducts(updatedProducts);
        }}
        placeholder="Unit Price"
      />
      <input
        type="number"
        value={product.netAmount || ""}
        onChange={(e) => {
          const updatedProducts = [...selectedProducts];
          updatedProducts[index].netAmount = e.target.value;
          setSelectedProducts(updatedProducts);
        }}
        placeholder="Net Amount"
        disabled
      />
      <input
        type="number"
        value={product.stock || ""}
        disabled
      />
      <button
        type="button"
        onClick={() => {
          const updatedProducts = selectedProducts.filter((_, i) => i !== index);
          setSelectedProducts(updatedProducts);
        }}
      >
        Remove
      </button>
    </div>
  ))}
  <button
  className="addsale-add-btn"
    onClick={() =>
      setSelectedProducts([
        ...selectedProducts,
        { productName: "", description: "", quantity: "", unitPrice: "", netAmount: "", stock: 0 },
      ])
    }
  >
    Add Product
  </button>
</div>

  
        <div className="addsale-account-section">
         <h3>Account Details</h3>
         <div className="addsale-account-group">
           <label>Discount Amount</label>
     <input
      type="number"
      value={accountDetails.discountAmount || ""}
      onChange={(e) => handleAccountDetailsChange("discountAmount", e.target.value)}
    />
  </div>

  <div className="addsale-account-group">
    <label>Discount Percentage</label>
    <input
      type="number"
      value={accountDetails.discountPercentage || ""}
      onChange={(e) => handleAccountDetailsChange("discountPercentage", e.target.value)}
    />
  </div>
        {[
          { label: "Cash Back", key: "cashBack", type: "number" },
          { label: "Payment Method", key: "paymentMethod" }
        ].map(({ label, key, type = "text" }) => (
          <div className="addsale-account-group" key={key}>
            <label>{label}</label>
            <input
              type={type}
              value={accountDetails[key] || ""}
              onChange={(e) => setAccountDetails({ ...accountDetails, [key]: e.target.value })}
            />
          </div>
        ))}

        <div className="addsale-account-group">
          <label>Due Amount</label>
          <input type="number" value={calculateDueAmount() || ""} disabled />
        </div>
      </div>
      
  
        <div className="addsale-buttons">
          <button onClick={handleSubmit} className="addsale-submit-btn">Submit</button>
          <button onClick={handleResetForm} className="addsale-close-btn">Reset</button>
        </div>
      </div>
    );
  };
  
  export default AddSaleReturn;
  
