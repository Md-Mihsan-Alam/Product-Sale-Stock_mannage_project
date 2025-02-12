import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Sales.css";
import { useNavigate } from "react-router-dom";

const ReturnList = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleAddSaleNavigate = () => {
    navigate("/addsale");
  };


  useEffect(() => {
    const fetchReturnData = async () => {
      try {
        const response = await axios.get(
          "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/Add_Sale_Data" // Replace with your new API endpoint
        );
        setReturns(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching return data:", error);
        setError("Failed to fetch return data. Please try again.");
        setLoading(false);
      }
    };

    fetchReturnData();
  }, []);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(returns);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Return Data");
    XLSX.writeFile(workbook, "return_data.xlsx");
  };

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(returns);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "return_data.csv");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "SL",
      "Invoice Number",
      "Customer Name",
      "Date",
      "Total Amount",
      "Return Amount",
      "Reason for Return",
    ];
    const tableRows = returns.map((returnData, index) => [
      index + 1,
      returnData.invoiceNumber,
      returnData.customerName,
      returnData.date,
      returnData.total,
      returnData.returnAmount,
      returnData.reason, 
    ]);

    doc.text("Return Data", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("return_data.pdf");
  };

  if (loading) return <p>Loading return data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="list-sale">
      <h2>Sale List</h2>
      <div className="go-to-addsalebx">
      <button className="go-to-addsale" onClick={handleAddSaleNavigate}>+ Add Sale</button>
      </div>

      <div className="export-buttons">
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>
      <br />
      {returns.length === 0 ? (
        <p>No return data available</p>
      ) : (
        <table className="sales-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Invoice Number</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Due Amount </th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((returnData, index) => (
              <tr key={returnData.id}>
                <td>{index + 1}</td>
                <td>{returnData.invoiceNumber}</td>
                <td>{returnData.customerName}</td>
                <td>{returnData.address}</td>
                <td>{returnData.date}</td>
                <td>{returnData.total}</td>
                <td>{returnData.dueAmount}</td>
                <td>{returnData.paymentMethod}</td>
                <td>
                  <button onClick={() => handleViewReturn(returnData.invoiceNumber)}>
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

const handleViewReturn = (invoiceNumber) => {
  alert(`View return details for invoice: ${invoiceNumber}`);
};

export default ReturnList;
