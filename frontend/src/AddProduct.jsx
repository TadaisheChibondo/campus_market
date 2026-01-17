// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddProduct() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [phone, setPhone] = useState(""); // New WhatsApp state
//   const [category, setCategory] = useState("OTHER");
//   const [image, setImage] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Create a "FormData" object (Required for sending images)
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("contact_phone", phone); // Add the phone number
//     formData.append("category", category);
//     if (image) {
//       formData.append("image", image);
//     }

//     // 2. Get the token from local storage
//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(
//         "https://campus-backend-75cs.onrender.com/api/products/",
//         formData,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Product added successfully!");
//       navigate("/"); // Go back home to see it
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sell a Product</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Product Name */}
//         <div>
//           <label>Product Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label>Price ($):</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>

//         {/* WhatsApp Number (The new field) */}
//         <div>
//           <label>WhatsApp Number:</label>
//           <input
//             type="text"
//             placeholder="e.g. 26377123456"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <small style={{ display: "block", marginBottom: "10px" }}>
//             Enter number with country code (no +)
//           </small>
//         </div>

//         {/* Category */}
//         <div>
//           <label>Category:</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="GROCERIES">Groceries</option>
//             <option value="ELECTRONICS">Electronics</option>
//             <option value="CLOTHING">Clothing</option>
//             <option value="BOOKS">Books</option>
//             <option value="OTHER">Other</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         {/* Image */}
//         <div>
//           <label>Image:</label>
//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         </div>

//         <button type="submit">Post Item</button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadCloud, X, Loader2, ImagePlus } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    contact_phone: "",
  });

  // Image State
  const [mainImage, setMainImage] = useState(null); // The file object
  const [mainPreview, setMainPreview] = useState(null); // The URL for preview
  const [galleryImages, setGalleryImages] = useState([]); // Array of file objects
  const [galleryPreviews, setGalleryPreviews] = useState([]); // Array of URLs

  // Handle Text Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Main Cover Image
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  // Handle Gallery Images (Multiple)
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Add new files to existing ones
      setGalleryImages([...galleryImages, ...files]);

      // Generate previews
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews([...galleryPreviews, ...newPreviews]);
    }
  };

  // Remove a gallery image from the list
  const removeGalleryImage = (index) => {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryImages(updatedImages);
    setGalleryPreviews(updatedPreviews);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Get Token
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to sell items.");
      setLoading(false);
      return;
    }

    // 2. Prepare Form Data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("contact_phone", formData.contact_phone);

    // Append Main Image
    if (mainImage) {
      data.append("image", mainImage);
    }

    // Append Gallery Images (loop through and append with same name 'uploaded_images')
    galleryImages.forEach((image) => {
      data.append("uploaded_images", image);
    });

    try {
      // 3. Send to Backend
      // NOTE: Make sure this URL matches your deployed backend
      await axios.post(
        "https://campus-backend-75cs.onrender.com/api/products/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        },
      );

      // Success!
      navigate("/browse");
    } catch (err) {
      console.error(err);
      setError("Failed to create product. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sell an Item</h1>
        <p className="text-gray-500 mb-8">
          List your item for sale on the campus marketplace.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${mainPreview ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
            >
              <input
                type="file"
                onChange={handleMainImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                required
              />
              {mainPreview ? (
                <div className="relative h-48 w-full">
                  <img
                    src={mainPreview}
                    alt="Preview"
                    className="h-full w-full object-contain rounded-lg"
                  />
                  <p className="mt-2 text-sm text-blue-600 font-medium">
                    Click to change cover
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <UploadCloud size={40} className="mb-2 text-gray-400" />
                  <span className="font-medium">
                    Click to upload cover photo
                  </span>
                  <span className="text-xs mt-1">JPG, PNG up to 5MB</span>
                </div>
              )}
            </div>
          </div>

          {/* Gallery Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Photos (Optional)
            </label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {/* Upload Button */}
              <div className="relative aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={handleGalleryChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  multiple // Allow multiple files!
                />
                <ImagePlus size={24} />
                <span className="text-xs mt-1 font-medium">Add</span>
              </div>

              {/* Previews */}
              {galleryPreviews.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group"
                >
                  <img
                    src={src}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Calculus Textbook"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
              required
            >
              <option value="">Select a category</option>
              <option value="GROCERIES">Groceries</option>
              <option value="ELECTRONICS">Electronics</option>
              <option value="CLOTHING">Clothing</option>
              <option value="BOOKS">Books</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the condition, size, or reason for selling..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="e.g. 263771234567"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Buyers will click this to chat with you directly.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Publishing...
              </>
            ) : (
              "List Item"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
