import React, { useState, useEffect } from "react";
import "./Product.css";
import { getProductsFromServer, updateProductOnServer, deleteProductOnServer } from "../../utils/api";
import * as XLSX from "xlsx"; 
// import { pdfjs } from "react-pdf";
import { jsPDF } from "jspdf"; 
import "jspdf-autotable";
import { saveAs } from "file-saver"; 
import { useNavigate } from "react-router-dom";


const ProductList = () => {
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState({
    productName: "",
    category: "",
    brand: "",
    location: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState({
    productName: "",
    category: "",
    brand: "",
    location: "",
  });

  const categoryBrands = {
    Electronics: ["Samsung", "Sony", "Xiaomi","Apple", "Dell", "HP", "Acer", "Asus"],
    Furniture: ["IKEA", "Otobi", "Partex", "Navana", "Hatil", "Akhtar", "Otobi", "Pik"],
    Clothing: ["Zara", "Le Reve", "Rise Brand", "Yellow", "Ecstasy", "Nipun", "Anjan's"],
    "Home Appliances": ["Philips", "Panasonic", "Walton", "Singer", "Hitachi", "Sharp", "LG"],
    "Beauty Products": ["The Body Shop", "Loreal", "Kylie", "MAC", "Maybelline", "Revlon", "Nivea"],
  };

  const navigate = useNavigate();

  const handleAddProductNavigate = () => {
    navigate("/addproduct");
  };


  const fetchData = async () => {
    try {
      const products = await getProductsFromServer();
      setTableData(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = tableData.filter((product) => {
    return (
      (!filter.productName || product.productName.toLowerCase().includes(filter.productName.toLowerCase())) &&
      (!filter.category || product.category === filter.category) &&
      (!filter.brand || product.brand === filter.brand) &&
      (!filter.location || product.businessLocation.toLowerCase().includes(filter.location.toLowerCase()))
    );
  });

  const handleEdit = (id) => {
    const product = tableData.find((prod) => prod.id === id);
    setEditingProductId(id);
    setEditingProduct({
      productName: product.productName,
      category: product.category,
      brand: product.brand,
      location: product.businessLocation,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedProduct = {
        productName: editingProduct.productName,
        category: editingProduct.category,
        brand: editingProduct.brand,
        businessLocation: editingProduct.location,
      };
      const updated = await updateProductOnServer(editingProductId, updatedProduct);
      setTableData((prev) =>
        prev.map((prod) => (prod.id === editingProductId ? { ...prod, ...updatedProduct } : prod))
      );
      setEditingProductId(null);
      setEditingProduct({ productName: "", category: "", brand: "", location: "" });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductOnServer(id);
      setTableData((prev) => prev.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = filteredData.map((product) => ({
      Name: product.productName,
      Brand: product.brand,
      Category: product.category,
      Unit: product.unit,
      Barcode: product.barcodeType,
      Warranty: product.warranty,
      Location: product.businessLocation,
    }));
    const csv = `data:text/csv;charset=utf-8,${Object.keys(csvData[0]).join(",")}\n${csvData.map((row) => Object.values(row).join(",")).join("\n")}`;
    saveAs(new Blob([csv], { type: "text/csv" }), "products.csv");
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "products.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Brand", "Category", "Unit", "Barcode", "Warranty", "Location"];
    const tableRows = filteredData.map((product) => [
      product.productName,
      product.brand,
      product.category,
      product.unit,
      product.barcodeType,
      product.warranty,
      product.businessLocation,
    ]);
  
    doc.text("Product List", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("products.pdf");
  };


  return (
    <div className="product-list">
      <h2>Product List</h2>
      <div className="go-to-addproductbx">
        <button className="go-to-addproduct" onClick={handleAddProductNavigate}>Add Product</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Product Name"
          value={filter.productName}
          onChange={(e) => setFilter({ ...filter, productName: e.target.value })}
        />
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">Category</option>
          {Object.keys(categoryBrands).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filter.brand}
          onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
        >
          <option value="">Brand</option>
          {(categoryBrands[filter.category] || []).map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Location"
          value={filter.location}
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        />
      </div>

      <div className="entries-controls">

        <div className="export-buttons">
          <button onClick={exportToCSV}>Export to CSV</button>
          <button onClick={exportToExcel}>Export to Excel</button>
          <button onClick={exportToPDF}>Export to PDF</button>
        </div>
      </div><br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Barcode</th>
            <th>Warranty</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0).map((product) => (
            <tr key={product.id}>
              <td>
              {editingProductId === product.id ? (
                <input
                  type="text"
                  value={editingProduct.productName}
                  onChange={(e) =>
                  setEditingProduct((prev) => ({ ...prev, productName: e.target.value }))
                  }
                />
              ) : (
              product.productName
              )}
              </td>

              <td>
                {editingProductId === product.id ? (
                  <select
                    value={editingProduct.brand}
                    onChange={(e) =>
                      setEditingProduct((prev) => ({ ...prev, brand: e.target.value }))
                    }
                  >
                    <option value="">Brand</option>
                    {(categoryBrands[editingProduct.category] || []).map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                ) : (
                  product.brand
                )}
              </td>

              <td>
                {editingProductId === product.id ? (
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct((prev) => ({ ...prev, category: e.target.value }))
                    }
                  >
                    <option value="">Category</option>
                    {Object.keys(categoryBrands).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                ) : (
                  product.category
                )}
              </td>

              <td>{product.unit}</td>
              <td>{product.barcodeType}</td>
              <td>{product.warranty}</td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.location}
                    onChange={(e) =>
                      setEditingProduct((prev) => ({ ...prev, location: e.target.value }))
                    }
                  />
                ) : (
                  product.businessLocation
                )}
              </td>

              <td>
                {editingProductId === product.id ? (
                  <button className="save-btn" onClick={handleSaveEdit}> Save</button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
