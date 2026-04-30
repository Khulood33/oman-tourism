import CinematicLayout from "../components/CinematicLayout";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function MyPlans() {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "plans"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const deletePlan = async (id) => {
    await deleteDoc(doc(db, "plans", id));
    fetchPlans();
  };

  return (
    <CinematicLayout>
      <div className="max-w-5xl w-full">

        <h1 className="text-4xl text-white text-center mb-10">
          My Plans
        </h1>

        {plans.length === 0 ? (
          <p className="text-gray-300 text-center">
            No plans yet
          </p>
        ) : (
          <div className="grid gap-6">

            {plans.map((p) => (
              <div key={p.id} className="bg-white/10 p-6 rounded-xl">

                <h2 className="text-white text-xl font-bold mb-3">
                  {p.place}
                </h2>

                {p.days.map((d, i) => (
                  <p key={i} className="text-gray-300">
                    {d.day} - {d.place}
                  </p>
                ))}

                <button
                  onClick={() => deletePlan(p.id)}
                  className="mt-4 bg-red-500 px-4 py-2 rounded-lg text-white"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </CinematicLayout>
  );
}