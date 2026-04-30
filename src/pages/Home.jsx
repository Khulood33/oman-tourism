import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const places = [
    {
      name: "Nizwa, Oman",
      desc: "Historic city experience",
      category: "Culture",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1623680904963-5580d963e18e?q=80&w=687&auto=format&fit=crop"
    },
    {
      name: "Muttrah, Muscat",
      desc: "Markets & coastal vibes",
      category: "Culture",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1599743777555-e362a2feab39?q=80&w=688&auto=format&fit=crop"
    },
    {
      name: "Sultan Qaboos Mosque",
      desc: "Iconic architecture",
      category: "Culture",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1596445145149-f0906e6b3dd6?q=80&w=1170&auto=format&fit=crop"
    },
    {
      name: "Nizwa Fort",
      desc: "Explore Oman history",
      category: "Culture",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1657523389944-ddb71944bb72?q=80&w=1177&auto=format&fit=crop"
    },
    {
      name: "Khasab, Oman",
      desc: "Mountain & sea views",
      category: "Nature",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1582461563126-3a470ec9ecb2?q=80&w=1074&auto=format&fit=crop"
    },
    {
      name: "Sur, Oman",
      desc: "Traditional coastal town",
      category: "Beach",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1706911017787-09f5e48d25fb?q=80&w=687&auto=format&fit=crop"
    },
    {
      name: "Frankincense Culture",
      desc: "Omani heritage",
      category: "Culture",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1624608959711-4b66e68aa50e?q=80&w=1168&auto=format&fit=crop"
    },
    {
      name: "Bimmah Sinkhole",
      desc: "Natural wonder",
      category: "Nature",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551368353-1eab913e4af1?q=80&w=735&auto=format&fit=crop"
    },
    {
      name: "Muscat Theater",
      desc: "Cultural experience",
      category: "Culture",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1680180013483-299cf27dbd58?q=80&w=1171&auto=format&fit=crop"
    },
    {
      name: "Musandam Dolphins",
      desc: "Ocean adventure",
      category: "Beach",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1624608708049-53587f652e16?q=80&w=1265&auto=format&fit=crop"
    },
    {
      name: "Salalah, Oman",
      desc: "Green paradise",
      category: "Nature",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1749390700022-53e3243150dc?q=80&w=1170&auto=format&fit=crop"
    }
  ];

  const filteredPlaces = places.filter((place) => {
    return (
      place.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || place.category === category)
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-50">

      <div className="w-56 bg-white p-6 shadow-md flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <button onClick={() => navigate("/home")} className="text-left font-medium hover:text-blue-600">
            Home
          </button>

          <button onClick={() => navigate("/mybookings")} className="text-left font-medium hover:text-blue-600">
            My Bookings
          </button>
        </div>

        <button onClick={() => navigate("/")} className="text-red-500">
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">

        <div className="relative h-72 rounded-2xl overflow-hidden mb-10">
          <img
            src="https://images.unsplash.com/photo-1558538294-1dff253d8632?q=80&w=1170&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-2">Explore Oman</h1>
            <p className="mb-4">Discover nature, culture, and adventure</p>

            <button
              onClick={() => navigate("/plan")}
              className="bg-blue-600 px-6 py-2 rounded-lg"
            >
              Start Planning
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search places..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-lg"
          />

          <div className="flex gap-2">
            {["All", "Culture", "Nature", "Beach", "Desert"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg ${
                  category === cat ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {filteredPlaces.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative h-60 rounded-2xl overflow-hidden group"
            >

              <img
                src={place.image}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 text-white">

                <div className="flex justify-between items-start">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">
                    ⭐ {place.rating}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold">{place.name}</h3>
                  <p className="text-sm mb-2">{place.desc}</p>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">

                    <button
                      onClick={() => navigate("/place", { state: place })}
                      className="bg-white text-black px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate("/place", { state: place })}
                      className="bg-blue-600 px-3 py-1 rounded text-sm"
                    >
                      Book
                    </button>

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
}