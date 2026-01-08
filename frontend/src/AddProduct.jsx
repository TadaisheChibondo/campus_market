import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState(""); // New WhatsApp state
  const [category, setCategory] = useState("OTHER");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create a "FormData" object (Required for sending images)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("contact_phone", phone); // Add the phone number
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    // 2. Get the token from local storage
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://campus-backend-75cs.onrender.com/api/products/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product added successfully!");
      navigate("/"); // Go back home to see it
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sell a Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label>Price ($):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* WhatsApp Number (The new field) */}
        <div>
          <label>WhatsApp Number:</label>
          <input
            type="text"
            placeholder="e.g. 26377123456"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <small style={{ display: "block", marginBottom: "10px" }}>
            Enter number with country code (no +)
          </small>
        </div>

        {/* Category */}
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="GROCERIES">Groceries</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="CLOTHING">Clothing</option>
            <option value="BOOKS">Books</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Image */}
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button type="submit">Post Item</button>
      </form>
    </div>
  );
}

export default AddProduct;
