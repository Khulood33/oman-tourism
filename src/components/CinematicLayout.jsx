import { motion } from "framer-motion";

export default function CinematicLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed w-full h-full object-cover"
      >
        <source src="https://cdn.coverr.co/videos/coverr-desert-landscape-1562/1080p.mp4" />
      </video>

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        className="absolute w-72 h-72 bg-blue-500/20 rounded-full top-10 left-10 blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {children}
      </div>

    </div>
  );
}