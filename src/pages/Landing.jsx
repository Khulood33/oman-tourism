import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Landing() {
  const navigate = useNavigate();

  const slogans = [
    "Uncover Oman’s Hidden Gems",
    "From Desert to Ocean Beauty",
    "Your Journey Starts Here",
    "Explore Oman Like Never Before"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "white"
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558538294-1dff253d8632?q=80&w=1600&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))"
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2,
          width: "90%",
          maxWidth: "800px"
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "20px"
          }}
        >
          Discover Oman
        </motion.h1>

        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "22px",
            opacity: 0.9,
            minHeight: "28px"
          }}
        >
          {slogans[index]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "20px"
          }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            style={{
              padding: "14px 35px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
            }}
          >
            Start Journey
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            style={{
              padding: "14px 35px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.6)",
              background: "transparent",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Create Account
          </motion.button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            marginTop: "50px",
            fontSize: "22px",
            opacity: 0.7
          }}
        >
          ↓
        </motion.div>
      </div>
    </div>
  );
}