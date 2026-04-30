import Navbar from "./Navbar";

export default function LayoutWithNavbar({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 flex justify-center items-start">
        {children}
      </div>
    </div>
  );
}