import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlanPage() {
  const [days, setDays] = useState(3);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const generatePlan = () => {
    const arr = [];
    for (let i = 1; i <= days; i++) {
      arr.push({
        day: `Day ${i}`,
        place: ["Muscat", "Nizwa", "Sur", "Salalah", "Khasab", "Bimmah"][i % 6],
        desc: "Explore and enjoy the destination"
      });
    }
    setPlan(arr);
  };

  const savePlan = async () => {
    if (!auth.currentUser) return;

    setLoading(true);

    await addDoc(collection(db, "bookings"), {
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      place: "AI Trip Plan",
      date: new Date().toISOString().split("T")[0],
      days: plan,
      status: "Pending",
      createdAt: serverTimestamp()
    });

    setLoading(false);
    alert("Saved");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">AI Planner</h1>

        <div className="flex gap-3 mb-6">
          <input
            type="number"
            value={days}
            min={1}
            max={30}
            onChange={(e) => setDays(e.target.value)}
            className="p-3 border rounded-lg w-28"
          />

          <button
            onClick={generatePlan}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
          >
            Generate Plan
          </button>
        </div>

        {plan.map((d, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow mb-4">
            <h3 className="font-bold">{d.day} - {d.place}</h3>
            <p className="text-gray-500">{d.desc}</p>
          </div>
        ))}

        {plan.length > 0 && (
          <button
            onClick={savePlan}
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold shadow hover:scale-105 transition"
          >
            {loading ? "Saving..." : "Save Plan"}
          </button>
        )}

      </div>
    </div>
  );
}