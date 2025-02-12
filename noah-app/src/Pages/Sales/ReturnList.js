import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx"; 
import jsPDF from "jspdf"; 
import "jspdf-autotable"; 
import "./Sales.css";
import { useNavigate } from "react-router-dom";

const ReturnList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  const handleAddReturnNavigate = () => {
    navigate("/addsalereturn");
  };

  

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/Add_Sale_Return_Data"
        );
        setSales(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setError("Failed to fetch sales data. Please try again.");
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");
    XLSX.writeFile(workbook, "sales_data.xlsx");
  };

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(sales);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales_data.csv");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "SL",
      "Invoice Number",
      "Customer Name",
      "Date",
      "Cash Received",
      "Payment Method",
      "Total Amount",
      "Due Amount",
    ];
    const tableRows = sales.map((sale, index) => [
      index + 1,
      sale.invoiceNumber,
      sale.customerName,
      sale.date,
      sale.cashReceived,
      sale.paymentMethod,
      sale.total,
      sale.dueAmount,
    ]);

    doc.text("Sales Data", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("sales_data.pdf");
  };

  if (loading) return <p>Loading sales data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="list-sale">
      <h2>Return List</h2>
      <div className="go-to-addreturnbx">
        <button className="go-to-addreturn" onClick={handleAddReturnNavigate}>Add Sale Return</button>
      </div>

      <div className="export-buttons">
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div><br />
      {sales.length === 0 ? (
        <p>No sales data available</p>
      ) : (
        <table className="sales-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Invoice Number</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Reference Date</th>
              <th>Cash Back</th>
              <th>Due Amount</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={sale.id}>
                <td>{index + 1}</td>
                <td>{sale.invoiceNumber}</td>
                <td>{sale.customerName}</td>
                <td>{sale.address}</td>
                <td>{sale.date}</td>
                <td>{sale.referenceDate}</td>
                <td>{sale.cashBack}</td>
                <td>{sale.dueAmount}</td>
                <td>{sale.paymentMethod}</td>
                <td>
                  <button onClick={() => handleViewSale(sale.invoiceNumber)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// View details handler (placeholder)
const handleViewSale = (invoiceNumber) => {
  alert(`View sale details for invoice: ${invoiceNumber}`);
};

export default ReturnList;
