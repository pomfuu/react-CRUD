import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Read() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get logged-in user info
  const [productArray, setProductArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "Products"));
        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((product) => product.vendor === user?.name);
        setProductArray(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const totalPages = Math.ceil(productArray.length / itemsPerPage);
  const displayedProducts = productArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
      ) : displayedProducts.length > 0 ? (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1A47BC", color: "#FBFAF5" }}>
                <th style={tableHeaderStyle}>Image</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderStyle}>Stock</th>
                <th style={tableHeaderStyle}>Details</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product) => (
                <tr key={product.id} style={{ textAlign: "left" }}>
                  <td style={tableCellStyle}>
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </td>
                  <td style={tableCellStyle}>{product.name}</td>
                  <td style={tableCellStyle}>{product.category}</td>
                  <td style={tableCellStyle}>{product.stock}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#1A47BC",
                        color: "#FBFAF5",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={paginationButtonStyle}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  ...paginationButtonStyle,
                  backgroundColor: currentPage === i + 1 ? "#1A47BC" : "#FBFAF5",
                  color: currentPage === i + 1 ? "#FBFAF5" : "#1A47BC",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={paginationButtonStyle}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>You have no products yet!</p>
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

const paginationButtonStyle = {
  padding: "10px 15px",
  border: "1px solid #1A47BC",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  margin: "0 5px",
};

export default Read;
