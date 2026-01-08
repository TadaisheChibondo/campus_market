import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams(); // Grabs the ID from the URL (e.g., /product/1)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the specific product using the ID
    axios
      .get(`https://campus-backend-75cs.onrender.com/api/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;
  const waLink = `https://wa.me/${product.contact_phone}?text=Hi, I'm interested in your ${product.name} listed on Campus Marketplace`;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      {product.image && (
        <img src={product.image} alt={product.name} width="300" />
      )}
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      <p>Category: {product.category}</p>
      {/* OLD: <p>Seller Contact: {product.seller}</p> */}
      <p>
        Seller Contact: <strong>{product.seller_username}</strong>
      </p>
      {/* We'll fix this to show a name later */}
      <div style={{ marginTop: "20px" }}>
        {product.contact_phone ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#25D366", // WhatsApp Green
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Chat on WhatsApp
          </a>
        ) : (
          <p>No contact number provided.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
