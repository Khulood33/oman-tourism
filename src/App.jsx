import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PlacePage from "./pages/PlacePage";
import PlanPage from "./pages/PlanPage";
import MyBookings from "./pages/MyBookings";
import MyPlans from "./pages/MyPlans";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/place" element={<PlacePage />} />

        <Route path="/plan" element={<PlanPage />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/myplans" element={<MyPlans />} />

        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}