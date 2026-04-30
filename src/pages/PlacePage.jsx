import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function PlacePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No data</h2>;

  const handleBooking = async () => {
    if (!auth.currentUser) {
      alert("Login first");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        place: state.name,
        image: state.image,
        date: new Date().toISOString().split("T")[0],
        people: 1,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      alert("Booked successfully");
    } catch {
      alert("Error booking");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg"
      >

        {/* Top Section */}
        <div className="flex gap-6 items-center flex-wrap">

          {/* 🔥 صورة مصغرة */}
          <img
            src={state.image}
            className="w-44 h-32 object-cover rounded-xl shadow"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{state.name}</h1>

            <p className="text-gray-500 text-sm">
              A beautiful destination in Oman perfect for tourism and exploration.
            </p>

            {/* تفاصيل */}
            <div className="flex gap-6 mt-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold">Best Time</p>
                <p>October – March</p>
              </div>

              <div>
                <p className="font-semibold">Type</p>
                <p>Tourism</p>
              </div>

              <div>
                <p className="font-semibold">Rating</p>
                <p>⭐ 4.8</p>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            onClick={handleBooking}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Book Now
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            Back
          </button>

        </div>

      </motion.div>

    </div>
  );
}