import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newPeople, setNewPeople] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setBookings(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    setBookings((prev) => prev.filter((b) => b.id !== id));
    toast.success("Deleted");
  };

  const startEdit = (b) => {
    setEditingId(b.id);
    setNewDate(b.date || "");
    setNewPeople(b.people || 1);
  };

  const saveEdit = async (id) => {
    await updateDoc(doc(db, "bookings", id), {
      date: newDate,
      people: newPeople
    });

    setEditingId(null);
    fetchBookings();
    toast.success("Updated");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-10">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">My Bookings</h1>

        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Home
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="w-full max-w-5xl flex flex-col gap-6">

          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              {/* ===== PLAN ===== */}
              {b.type === "plan" ? (
                <>
                  <h3 className="text-lg font-semibold mb-4">
                    Trip Plan
                  </h3>

                  <div className="space-y-4">

                    {b.plan.map((day, i) => (
                      <div
                        key={i}
                        className="border rounded-xl p-4 bg-gray-50"
                      >

                        <p className="font-medium">
                          Day {day.day} - {day.city}
                        </p>

                        <p className="text-sm text-gray-500 mb-2">
                          {day.desc}
                        </p>

                        <table className="w-full text-sm">
                          <tbody>
                            {day.schedule.map((s, idx) => (
                              <tr key={idx}>
                                <td className="w-20">{s.time}</td>
                                <td>{s.activity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                    ))}

                  </div>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
                  >
                    Delete Plan
                  </button>
                </>
              ) : (
                <>
                  {/* ===== NORMAL BOOKING ===== */}
                  <div className="flex gap-4 mb-4 items-center">

                    <img
                      src={b.image}
                      className="w-28 h-20 object-cover rounded-xl"
                    />

                    <div>
                      <h3 className="font-semibold">{b.placeName}</h3>

                      {editingId === b.id ? (
                        <>
                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="border p-1 mt-1 block"
                          />

                          <input
                            type="number"
                            value={newPeople}
                            onChange={(e) => setNewPeople(e.target.value)}
                            className="border p-1 mt-1 block"
                          />
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600">
                            Date: {b.date}
                          </p>
                          <p className="text-sm text-gray-600">
                            People: {b.people}
                          </p>
                        </>
                      )}

                      <p className="text-sm">
                        Status:
                        <span className={`ml-2 ${
                          b.status === "Confirmed"
                            ? "text-green-600"
                            : "text-yellow-500"
                        }`}>
                          {b.status || "Pending"}
                        </span>
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-3">

                    {editingId === b.id ? (
                      <button
                        onClick={() => saveEdit(b.id)}
                        className="px-4 py-1 bg-green-500 text-white rounded-lg"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(b)}
                        className="px-4 py-1 bg-gray-200 rounded-lg"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg"
                    >
                      Cancel
                    </button>

                  </div>
                </>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}