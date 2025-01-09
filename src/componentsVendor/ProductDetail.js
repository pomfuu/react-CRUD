import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function ProductDetail() {
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Products", productID));
      alert("Product deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  if (loading) return <p>Loading product details...</p>;

  return (
    <div style={{ marginLeft: "20%", marginTop: "2%", maxWidth: "75%" }}>
      <h2 style={{ color: "#1A47BC" }}>{product?.name}</h2>
      <img
        src={product?.imageURL}
        alt={product?.name}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <p><strong>Category:</strong> {product?.category}</p>
      <p><strong>Color:</strong> {product?.color?.join(", ") || " "}</p>
      <p><strong>Condition:</strong> {product?.condition || " "}</p>
      <p><strong>Description:</strong> {product?.description}</p>
      <p><strong>Dimension:</strong> {product?.dimension || " "}</p>
      <p><strong>Material:</strong> {product?.material || " "}</p>
      <p><strong>Notes:</strong> {product?.notes || " "}</p>
      <p><strong>Price:</strong> Rp{product?.price}</p>
      <p><strong>Size:</strong> {product?.size?.join(", ") || " "}</p>
      <p><strong>Size Chart:</strong> {product?.sizeChart || " "}</p>
      <p><strong>Stock:</strong> {product?.stock}</p>
      <p><strong>Variant:</strong> {product?.variant?.join(", ") || " "}</p>
      <p><strong>Wishlist:</strong> {product?.isWishlist ? "Yes" : "No"}</p>
      <p><strong>Rating:</strong> {product?.rating ? `${product.rating} / 5` : " "}</p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate(`/product/edit/${productID}`)}
          style={{
            marginRight: "10px",
            padding: "10px 25px",
            backgroundColor: "#1A47BC",
            color: "#FBFAF5",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          style={{
            padding: "10px 25px",
            backgroundColor: "#EC2A00",
            color: "#FBFAF5",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
