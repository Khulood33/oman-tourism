import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
];

export default function Gallery() {
  return (
    <div className="py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10">Gallery</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-10">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            className="w-full h-60 object-cover rounded-lg"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </div>
  );
}