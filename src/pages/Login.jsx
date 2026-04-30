import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const userEmail = userCredential.user.email;

      if (userEmail === "admin@admin.com") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: "url(https://images.unsplash.com/photo-1701087489220-ad97290ef295?q=80&w=1600&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-[320px] flex flex-col items-center"
        >

          <h2 className="text-3xl mb-6 font-semibold">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full bg-blue-600 py-3 rounded-xl shadow-lg"
          >
            Login
          </motion.button>

          <p className="text-sm mt-5">
            No account?
            <span
              className="ml-2 text-blue-400 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>

        </motion.div>

      </div>
    </div>
  );
}