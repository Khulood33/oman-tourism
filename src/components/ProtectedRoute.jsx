import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  if (!user) return <Navigate to="/login" />;

  if (user.email !== "admin@oman.com") {
    return <Navigate to="/home" />;
  }

  return children;
}