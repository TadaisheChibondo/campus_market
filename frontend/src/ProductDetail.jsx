// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function ProductDetail() {
//   const { id } = useParams(); // Grabs the ID from the URL (e.g., /product/1)
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     // Fetch the specific product using the ID
//     axios
//       .get(`https://campus-backend-75cs.onrender.com/api/products/${id}/`)
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching product:", error);
//       });
//   }, [id]);

//   if (!product) return <div>Loading...</div>;
//   const waLink = `https://wa.me/${product.contact_phone}?text=Hi, I'm interested in your ${product.name} listed on Campus Marketplace`;

//   return (
//     <div className="product-detail">
//       <h1>{product.name}</h1>
//       {product.image && (
//         <img src={product.image} alt={product.name} width="300" />
//       )}
//       <p>{product.description}</p>
//       <h3>Price: ${product.price}</h3>
//       <p>Category: {product.category}</p>
//       {/* OLD: <p>Seller Contact: {product.seller}</p> */}
//       <p>
//         Seller Contact: <strong>{product.seller_username}</strong>
//       </p>
//       {/* We'll fix this to show a name later */}
//       <div style={{ marginTop: "20px" }}>
//         {product.contact_phone ? (
//           <a
//             href={waLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{
//               backgroundColor: "#25D366", // WhatsApp Green
//               color: "white",
//               padding: "10px 20px",
//               textDecoration: "none",
//               borderRadius: "5px",
//               fontWeight: "bold",
//             }}
//           >
//             Chat on WhatsApp
//           </a>
//         ) : (
//           <p>No contact number provided.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MessageCircle, ArrowLeft, Tag, User, ShieldCheck } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // New State: To track which image is currently big
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    // Fetch from the LIVE backend
    axios
      .get(`https://campus-backend-75cs.onrender.com/api/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
        // Set the default main image as the active one initially
        setActiveImage(response.data.image);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!product)
    return (
      <div className="text-center py-20 text-red-500">Product not found.</div>
    );

  const waLink = `https://wa.me/${product.contact_phone}?text=Hi, I'm interested in your ${product.name} listed on CampusMarket`;

  // Combine main image + extra images into one list for the gallery
  // We filter out nulls just in case
  const allImages = [
    product.image,
    ...(product.images?.map((img) => img.image) || []),
  ].filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/browse"
        className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Marketplace
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT COL: Image Gallery */}
        <div>
          {/* 1. Main Big Image */}
          <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm mb-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                <Tag size={14} className="text-blue-600" />
                {product.category || "General"}
              </div>
            </div>
          </div>

          {/* 2. Thumbnails (Only show if there is more than 1 image) */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COL: Details (Same as before) */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <div className="text-3xl font-bold text-green-600 mb-6">
            ${product.price}
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-gray-100 mb-6">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Listed by</p>
              <p className="font-semibold text-gray-900">
                {product.seller_username || "Student Seller"}
              </p>
            </div>
          </div>

          <div className="prose text-gray-600 mb-8 leading-relaxed">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p>{product.description || "No description provided."}</p>
          </div>

          {product.contact_phone ? (
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 font-bold text-lg mb-6"
            >
              <MessageCircle size={24} />
              Chat on WhatsApp
            </a>
          ) : (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl">
              No contact number provided.
            </div>
          )}

          <div className="flex gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
            <ShieldCheck size={20} className="shrink-0" />
            <p>
              <strong>Safety Tip:</strong> Always meet in a public place on
              campus and inspect the item before paying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
