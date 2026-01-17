import { useState, useEffect } from "react";
import axios from "axios";
import { MessageCircle, Plus, DollarSign, Clock } from "lucide-react";

const RequestsBoard = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    contact_phone: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "https://campus-backend-75cs.onrender.com/api/requests/",
      );
      setRequests(Array.isArray(res.data) ? res.data : res.data.results);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to post a request");

    try {
      await axios.post(
        "https://campus-backend-75cs.onrender.com/api/requests/",
        formData,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        budget: "",
        contact_phone: "",
      });
      fetchRequests(); // Refresh list
    } catch (err) {
      alert("Failed to post request");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Community Requests
          </h1>
          <p className="text-gray-500 mt-2">
            Looking for a ride? Need a specific charger? Ask the community.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-black transition-all flex items-center gap-2 mx-auto"
          >
            <Plus size={20} /> {showForm ? "Cancel Request" : "Post a Request"}
          </button>
        </div>

        {/* Request Form (Collapsible) */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in-down">
            <h3 className="font-bold text-lg mb-4">What do you need?</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="e.g. Looking for a ride to Harare this Friday"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Budget (Optional)"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="WhatsApp Number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.contact_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_phone: e.target.value })
                  }
                  required
                />
              </div>
              <textarea
                placeholder="Describe details..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-gray-800">{req.title}</h3>
                {req.budget && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <DollarSign size={14} /> ${req.budget}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {req.description}
              </p>

              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium text-blue-600">
                    @{req.username}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />{" "}
                    {new Date(req.created_at).toLocaleDateString()}
                  </span>
                </div>
                <a
                  href={`https://wa.me/${req.contact_phone}?text=Hi, I saw your request for "${req.title}" on CampusMarket`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-100 transition-colors"
                >
                  <MessageCircle size={18} /> Chat
                </a>
              </div>
            </div>
          ))}

          {!loading && requests.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No requests yet. Be the first to ask!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsBoard;
