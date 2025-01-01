import React, { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Read() {
  const navigate = useNavigate();
  const [productArray, setProductArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "product");
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setProductArray(Object.values(snapshot.val()));
        } else {
          alert("No products yet");
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ marginLeft: "20%", marginTop: "2%", maxWidth: "75%" }}>
      <h2 style={{ marginBottom: "20px", color: "#1A47BC" }}>Product List</h2>
      <button
        className="button1"
        style={{
          backgroundColor: "#1A47BC",
          color: "#FBFAF5",
          padding: "10px 20px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "2vw",
        }}
        onClick={() => navigate("/product/create")}
      >
        Create Product
      </button>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1A47BC", color: "#fff" }}>
              <th style={tableHeaderStyle}>Image</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Color</th>
              <th style={tableHeaderStyle}>Condition</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Dimension</th>
              <th style={tableHeaderStyle}>Material</th>
              <th style={tableHeaderStyle}>Notes</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Wishlist</th>
              <th style={tableHeaderStyle}>Rating</th>
              <th style={tableHeaderStyle}>Size</th>
              <th style={tableHeaderStyle}>Size Chart</th>
              <th style={tableHeaderStyle}>Stock</th>
              <th style={tableHeaderStyle}>Variant</th>
            </tr>
          </thead>
          <tbody>
            {productArray.map((product, index) => (
              <tr
                key={index}
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={tableCellStyle}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td style={tableCellStyle}>{product.name}</td>
                <td style={tableCellStyle}>{product.category}</td>
                <td style={tableCellStyle}>{product.color.join(", ")}</td>
                <td style={tableCellStyle}>{product.condition}</td>
                <td style={tableCellStyle}>{product.description}</td>
                <td style={tableCellStyle}>{product.dimension}</td>
                <td style={tableCellStyle}>{product.material}</td>
                <td style={tableCellStyle}>{product.notes}</td>
                <td style={tableCellStyle}>Rp{product.price}</td>
                <td style={tableCellStyle}>
                  {product.isWishlist ? "Yes" : "No"}
                </td>
                <td style={tableCellStyle}>{product.rating} / 5</td>
                <td style={tableCellStyle}>{product.size.join(", ")}</td>
                <td style={tableCellStyle}>{product.sizeChart}</td>
                <td style={tableCellStyle}>{product.stock}</td>
                <td style={tableCellStyle}>{product.variant.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  padding: "10px",
  textAlign: "left",
};

const tableCellStyle = {
  padding: "10px",
  textAlign: "left",
};

export default Read;
