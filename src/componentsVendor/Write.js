import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useLocation } from "react-router-dom";
import ".././index.css";

function Write() {
  const location = useLocation();
  const [vendor, setVendor] = useState(location.state?.vendor || localStorage.getItem("vendor") || "Unknown Vendor");

  useEffect(() => {
    console.log("Current vendor:", vendor); 
  }, [vendor]); 

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState([]);
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [dimension, setDimension] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [material, setMaterial] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [sizeChart, setSizeChart] = useState("");
  const [stock, setStock] = useState(0);
  const [variant, setVariant] = useState([]);

  useEffect(() => {
    if (vendor === "Unknown Vendor") {
      const storedVendor = localStorage.getItem("vendor");
      if (storedVendor) {
        setVendor(storedVendor);
      }
    }
  }, [vendor]);

  const saveData = async () => {
    if (!name || !category || !price || !color || !size || !variant) {
      alert("All Data Must be Fulfilled");
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      alert("Price must be a number");
      return;
    }

    try {
      await addDoc(collection(db, "Products"), {
        name,
        category,
        color,
        condition,
        description,
        dimension,
        imageURL,
        material,
        notes,
        price: parsedPrice,
        isWishlist: false,
        rating: 0,
        size,
        sizeChart,
        stock: parseInt(stock),
        variant,
        vendor,
      });
      alert("Product Created!");
      resetForm();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setColor([]);
    setCondition("");
    setDescription("");
    setDimension("");
    setImageURL("");
    setMaterial("");
    setNotes("");
    setPrice("");
    setSize([]);
    setSizeChart("");
    setStock(0);
    setVariant([]);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #FAFBF5",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#1A47BC",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={{ marginLeft: "20%", marginTop: "2%", maxWidth: "60%" }}>
      <h2 style={{ marginBottom: "20px", color: "#1A47BC" }}>Add Product</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">Select Category</option>
            <option value="Costume Set">Costume Set</option>
            <option value="Accessories">Accessories</option>
            <option value="Bags">Bags</option>
            <option value="Shoes">Shoes</option>
            <option value="Properties">Properties</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Color (comma separated)"
            value={color}
            onChange={(e) => setColor(e.target.value.split(","))}
            style={inputStyle}
          />
        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "80px", resize: "none" }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          <input type="text" placeholder="Condition" value={condition} onChange={(e) => setCondition(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Dimension" value={dimension} onChange={(e) => setDimension(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Material" value={material} onChange={(e) => setMaterial(e.target.value)} style={inputStyle} />
        </div>
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ ...inputStyle, height: "60px", resize: "none" }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          <input
            type="text"
            placeholder="Size (comma separated)"
            value={size}
            onChange={(e) => setSize(e.target.value.split(","))}
            style={inputStyle}
          />
          <input type="text" placeholder="Size Chart" value={sizeChart} onChange={(e) => setSizeChart(e.target.value)} style={inputStyle} />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={{ ...inputStyle, borderColor: isNaN(parseInt(stock)) ? "red" : "#FAFBF5" }}
          />
          <input
            type="text"
            placeholder="Variant (comma separated)"
            value={variant}
            onChange={(e) => setVariant(e.target.value.split(","))}
            style={inputStyle}
          />
        </div>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ ...inputStyle, borderColor: isNaN(parseFloat(price)) ? "red" : "#FAFBF5" }}
        />
        <button onClick={saveData} style={buttonStyle}>
          Save Data
        </button>
      </div>
    </div>
  );
}

export default Write;
