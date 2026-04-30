import CinematicLayout from "../components/CinematicLayout";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "bookings"), (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data()
      }));
      setBookings(data);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
  };

  const handleConfirm = async (id) => {
    await updateDoc(doc(db, "bookings", id), {
      status: "Confirmed"
    });
  };

  const filtered = useMemo(() => {
    let data = [...bookings];

    if (filter !== "All") {
      data = data.filter((b) => (b.status || "Pending") === filter);
    }

    if (search) {
      data = data.filter((b) =>
        (b.place || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    return data;
  }, [bookings, filter, search]);

  const total = bookings.length;
  const pending = bookings.filter(b => (b.status || "Pending") === "Pending").length;
  const confirmed = bookings.filter(b => b.status === "Confirmed").length;

  const statusData = [
    { name: "Pending", value: pending },
    { name: "Confirmed", value: confirmed }
  ];

  const placeMap = {};
  bookings.forEach(b => {
    const key = b.place || "Unknown";
    placeMap[key] = (placeMap[key] || 0) + 1;
  });

  const topPlaces = Object.entries(placeMap)
    .map(([name, value]) => ({ name, value }))
    .slice(0, 5);

  const exportCSV = () => {
    const header = ["User", "Place", "Date", "People", "Status"];
    const rows = bookings.map(b => [
      b.userEmail || "Unknown",
      b.place || "",
      b.date || "",
      b.people || "",
      b.status || "Pending"
    ]);

    const csv = [header, ...rows].map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Bookings Report", 14, 10);

    const rows = bookings.map(b => [
      b.userEmail || "Unknown",
      b.place,
      b.date,
      b.people,
      b.status || "Pending"
    ]);

    autoTable(doc, {
      head: [["User", "Place", "Date", "People", "Status"]],
      body: rows,
    });

    doc.save("report.pdf");
  };

  return (
    <CinematicLayout>
      <div className="w-full max-w-7xl mx-auto text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>

          <div className="flex gap-3">
            <button onClick={exportCSV} className="bg-indigo-600 px-4 py-2 rounded-lg">
              CSV
            </button>

            <button onClick={exportPDF} className="bg-purple-600 px-4 py-2 rounded-lg">
              PDF
            </button>

            <button onClick={() => navigate("/")} className="bg-red-600 px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 p-6 rounded-xl">
            <p className="text-gray-400">Total</p>
            <h2 className="text-3xl font-bold">{total}</h2>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <p className="text-gray-400">Pending</p>
            <h2 className="text-3xl text-yellow-400">{pending}</h2>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <p className="text-gray-400">Confirmed</p>
            <h2 className="text-3xl text-green-400">{confirmed}</h2>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 p-6 rounded-xl">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} dataKey="value" outerRadius={90}>
                  <Cell fill="#facc15" />
                  <Cell fill="#22c55e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topPlaces}>
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Search */}
        <input
          placeholder="Search..."
          className="p-3 rounded bg-white/10 mb-6 w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <div className="bg-white/10 rounded-xl p-6">

          <table className="w-full">

            <thead>
              <tr className="text-gray-400 text-left border-b border-white/20">
                <th>User</th>
                <th>Type</th>
                <th>Place</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((b) => (
                <>
                  <tr key={b.id} className="border-b border-white/10">

                    {/* USER */}
                    <td className="py-4 text-blue-300 font-semibold">
                      {b.userEmail || "Unknown"}
                    </td>

                    {/* TYPE */}
                    <td>
                      {b.image ? (
                        <img src={b.image} className="w-16 rounded" />
                      ) : (
                        <div
                          onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                          className="bg-purple-600/20 px-4 py-2 rounded cursor-pointer text-center"
                        >
                          AI Plan
                          <div className="text-xs text-gray-400">
                            {b.days?.length || 0} Days
                          </div>
                        </div>
                      )}
                    </td>

                    <td>{b.place}</td>
                    <td>{b.date}</td>

                    {/* STATUS */}
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        b.status === "Confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {b.status || "Pending"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="flex gap-2">

                      {b.status !== "Confirmed" && (
                        <button
                          onClick={() => handleConfirm(b.id)}
                          className="bg-green-600 px-4 py-2 rounded-lg text-sm"
                        >
                          Confirm
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(b.id)}
                        className="bg-red-600 px-4 py-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                  {/* PLAN DETAILS */}
                  {expanded === b.id && b.days && (
                    <tr>
                      <td colSpan="6">
                        <div className="bg-white/5 p-4 rounded-lg my-3">

                          {b.days.map((d, i) => (
                            <div key={i} className="mb-2">
                              <strong>{d.day}</strong> - {d.place}
                              <p className="text-gray-400 text-sm">{d.desc}</p>
                            </div>
                          ))}

                        </div>
                      </td>
                    </tr>
                  )}

                </>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </CinematicLayout>
  );
}