import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const inputStyle = {
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#1A47BC",
  color: "#FBFAF5",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "15px",
};

function EditProduct() {
  const { productID } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "Products", productID));
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.error("No product found!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);

  const handleSave = async () => {
    try {
      const productRef = doc(db, "Products", productID);
      await updateDoc(productRef, product);
      alert("Product updated successfully!");
      navigate(`/product/${productID}`);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  if (loading) return <p>Loading product details...</p>;

  return (
    <div style={{ marginLeft: "20%", marginTop: "2%", maxWidth: "60%" }}>
      <h2 style={{ marginBottom: "20px", color: "#1A47BC" }}>Edit Product</h2>
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
        <label>
          Name:
          <input
            type="text"
            value={product?.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={product?.price || ""}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Category:
          <select
            value={product?.category || ""}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            style={inputStyle}
          >
            <option value="">Select Category</option>
            <option value="Costume Set">Costume Set</option>
            <option value="Accessories">Accessories</option>
            <option value="Bags">Bags</option>
            <option value="Shoes">Shoes</option>
            <option value="Properties">Properties</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Color (comma separated):
          <input
            type="text"
            value={product?.color?.join(", ") || ""}
            onChange={(e) => setProduct({ ...product, color: e.target.value.split(",") })}
            style={inputStyle}
          />
        </label>
        <label>
          Condition:
          <input
            type="text"
            value={product?.condition || ""}
            onChange={(e) => setProduct({ ...product, condition: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Dimension:
          <input
            type="text"
            value={product?.dimension || ""}
            onChange={(e) => setProduct({ ...product, dimension: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={product?.imageURL || ""}
            onChange={(e) => setProduct({ ...product, imageURL: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Material:
          <input
            type="text"
            value={product?.material || ""}
            onChange={(e) => setProduct({ ...product, material: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Notes:
          <textarea
            value={product?.notes || ""}
            onChange={(e) => setProduct({ ...product, notes: e.target.value })}
            style={{ ...inputStyle, height: "80px", resize: "none" }}
          />
        </label>
        <label>
          Size (comma separated):
          <input
            type="text"
            value={product?.size?.join(", ") || ""}
            onChange={(e) => setProduct({ ...product, size: e.target.value.split(",") })}
            style={inputStyle}
          />
        </label>
        <label>
          Size Chart:
          <input
            type="text"
            value={product?.sizeChart || ""}
            onChange={(e) => setProduct({ ...product, sizeChart: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={product?.stock || ""}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label>
          Variant (comma separated):
          <input
            type="text"
            value={product?.variant?.join(", ") || ""}
            onChange={(e) => setProduct({ ...product, variant: e.target.value.split(",") })}
            style={inputStyle}
          />
        </label>
        <button onClick={handleSave} style={buttonStyle}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProduct;
