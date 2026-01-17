import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UploadCloud,
  X,
  Loader2,
  ImagePlus,
  Eye,
  ShieldCheck,
  Package,
  Wrench,
} from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // NEW: Toggle for Product vs Service
  const [listingType, setListingType] = useState("PRODUCT"); // 'PRODUCT' or 'SERVICE'

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    contact_phone: "",
  });

  // Image State
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

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

  // Handle Gallery Images
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryImages([...galleryImages, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews([...galleryPreviews, ...newPreviews]);
    }
  };

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

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to sell items.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("contact_phone", formData.contact_phone);

    // NEW: Send the listing type to the backend
    data.append("listing_type", listingType);

    if (mainImage) data.append("image", mainImage);

    galleryImages.forEach((image) => {
      data.append("uploaded_images", image);
    });

    try {
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
      navigate("/browse");
    } catch (err) {
      console.error(err);
      setError("Failed to create listing. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Listing
          </h1>
          <p className="text-gray-500 mt-2">
            Reach thousands of students instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COL: The Form */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form
              id="sell-form"
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8"
            >
              {/* 1. LISTING TYPE TOGGLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What are you listing?
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setListingType("PRODUCT");
                      setFormData({ ...formData, category: "" });
                    }}
                    className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                      listingType === "PRODUCT"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <Package size={20} /> Sell an Item
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setListingType("SERVICE");
                      setFormData({ ...formData, category: "" });
                    }}
                    className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                      listingType === "SERVICE"
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <Wrench size={20} /> Offer Service
                  </button>
                </div>
              </div>

              {/* 2. PHOTOS */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {listingType === "PRODUCT"
                    ? "Item Photos"
                    : "Service Banner / Portfolio"}
                </h3>

                {/* Main Image */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image
                  </label>
                  <div
                    className={`relative aspect-video border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all overflow-hidden ${mainPreview ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
                  >
                    <input
                      type="file"
                      onChange={handleMainImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept="image/*"
                      required
                    />
                    {mainPreview ? (
                      <img
                        src={mainPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <UploadCloud size={32} className="mb-2 text-gray-400" />
                        <span className="font-medium">
                          Click to upload cover
                        </span>
                        <span className="text-xs mt-1">JPG, PNG up to 5MB</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gallery Grid */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Photos (Optional)
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {/* Upload Button */}
                    <div className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                      <input
                        type="file"
                        onChange={handleGalleryChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        multiple
                      />
                      <ImagePlus size={20} />
                      <span className="text-[10px] mt-1 font-bold">ADD</span>
                    </div>

                    {/* Previews */}
                    {galleryPreviews.map((src, index) => (
                      <div
                        key={index}
                        className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group border border-gray-200"
                      >
                        <img
                          src={src}
                          alt="Gallery"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 3. DETAILS */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {listingType === "PRODUCT"
                    ? "Item Details"
                    : "Service Details"}
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={
                        listingType === "PRODUCT"
                          ? "e.g. Calculus Textbook"
                          : "e.g. Math Tutoring - Algebra"
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    required
                  >
                    <option value="">Select a category</option>

                    {/* DYNAMIC CATEGORIES BASED ON TOGGLE */}
                    {listingType === "PRODUCT" ? (
                      <>
                        <option value="GROCERIES">Groceries</option>
                        <option value="ELECTRONICS">Electronics</option>
                        <option value="CLOTHING">Clothing</option>
                        <option value="BOOKS">Books</option>
                      </>
                    ) : (
                      <>
                        <option value="RIDE">Ride / Transport</option>
                        <option value="TUTORING">Tutoring</option>
                        <option value="BEAUTY">Hair & Beauty</option>
                        <option value="TECH_SUPPORT">Tech Support</option>
                        <option value="LABOR">Manual Labor</option>
                      </>
                    )}
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder={
                      listingType === "PRODUCT"
                        ? "Describe the condition, size, or reason for selling..."
                        : "Describe your service, availability, and experience..."
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
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
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 text-white rounded-xl font-bold text-lg active:scale-[0.98] transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 ${
                    listingType === "PRODUCT"
                      ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                      : "bg-purple-600 hover:bg-purple-700 shadow-purple-200"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : listingType === "PRODUCT" ? (
                    "Publish Listing"
                  ) : (
                    "Post Service"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COL: Live Preview & Tips (Sticky) */}
          <div className="hidden lg:block space-y-6">
            {/* Live Preview Card */}
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
                <Eye size={18} className="text-blue-600" /> Live Preview
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transform transition-all hover:scale-[1.02]">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  {mainPreview ? (
                    <img
                      src={mainPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      Image Preview
                    </div>
                  )}
                  {/* Price Tag Color changes based on type */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${listingType === "PRODUCT" ? "bg-blue-600" : "bg-purple-600"}`}
                  >
                    ${formData.price || "0.00"}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg truncate">
                    {formData.name ||
                      (listingType === "PRODUCT"
                        ? "Item Title"
                        : "Service Title")}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {formData.category || "Category"}
                  </p>
                </div>
              </div>

              {/* Tips Card */}
              <div
                className={`mt-6 rounded-2xl p-5 border ${listingType === "PRODUCT" ? "bg-blue-50 border-blue-100" : "bg-purple-50 border-purple-100"}`}
              >
                <div
                  className={`flex items-center gap-2 font-bold mb-3 ${listingType === "PRODUCT" ? "text-blue-800" : "text-purple-800"}`}
                >
                  <ShieldCheck size={18} />{" "}
                  {listingType === "PRODUCT" ? "Seller Tips" : "Service Tips"}
                </div>
                <ul
                  className={`space-y-2 text-sm ${listingType === "PRODUCT" ? "text-blue-700" : "text-purple-700"}`}
                >
                  {listingType === "PRODUCT" ? (
                    <>
                      <li>• Use clear, well-lit photos.</li>
                      <li>• Mention defects honestly.</li>
                      <li>• Meet in public campus spots.</li>
                    </>
                  ) : (
                    <>
                      <li>• Describe your experience clearly.</li>
                      <li>• State your availability.</li>
                      <li>• Agree on payment before starting.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
