import { motion } from "framer-motion";

const data = [
  {
    title: "Desert",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    title: "Mountains",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    title: "Beach",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  }
];

export default function Destinations() {
  return (
    <div className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">Top Destinations</h2>

      <div className="flex justify-center gap-8 flex-wrap">
        {data.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-72 h-96 rounded-xl overflow-hidden shadow-xl cursor-pointer"
          >
            <img src={item.img} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 w-full bg-black/40 text-white p-4">
              {item.title}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}