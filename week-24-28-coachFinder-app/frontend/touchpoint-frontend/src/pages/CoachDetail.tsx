//pages/CoachDetails.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../lib/axiosClient";
import { Clock, DollarSign, Star } from "lucide-react";

interface Reviewer {
  firstName: string;
  lastName: string;
  image?: string;
}

interface Review {
  rating: number;
  comment: string;
  createdAt: string;
  userInfo?: Reviewer;
}

interface CoachDetail {
  user: Reviewer;
  bio: string;
  expertise: string;
  hourlyRate: number;
  availability: { day: string; slots: string[] }[];
  totalReviews: number;
  averageRating: number | null;
  reviews: Review[];
}
export default function CoachDetail() {
  const { id } = useParams();
  console.log("coachId ->", id);
  const [coach, setCoach] = useState<CoachDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await axiosClient.get(`/coaches/${id}`);
        console.log(res.data);
        setCoach(res.data);
      } catch (err: any) {
        console.error("Error fetching coach:", err.response);
      } finally {
        setLoading(false);
      }
    };
    fetchCoach();
  }, [id]);

  if (loading)
    return <p className="text-center mt-6 text-gray-500">Loading...</p>;
  if (!coach)
    return <p className="text-center text-red-500 mt-6">Coach Not Found.</p>;

  const {
    user,
    bio,
    expertise,
    availability,
    hourlyRate,
    reviews,
    averageRating,
    totalReviews,
  } = coach;

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-6">
        <img
          src={user?.image || "/avatar-placeholder.png"}
          alt="coach avatar"
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h1 className="text-sm text-gray-500">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-2xl font-semibold text-gray-800">{expertise}</p>
          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={18} />
            <span>
              {averageRating ? averageRating.toFixed(1) : "No Ratings yet"} (
              {totalReviews} reviews){" "}
            </span>
          </div>
        </div>
      </div>

      {/* BIO */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">About</h2>
        <p className="text-gray-600 leading-relaxed">{bio}</p>
      </div>

      {/* Details */}
      <div>
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign size={16} /> Hourly Rate:
          <span>${hourlyRate}/hr</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={16} /> Availability:
          <span>
            {availability
              ?.map((a) => `${a.day} (${a.slots.join(", ")})`)
              .join(", ")}
          </span>
        </div>
      </div>

      {/* Call to Action */}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        onClick={() => {
          console.log("how to send a message to a coach?");
          alert("write your message simulation ok!");
        }}
      >
        Message Coach
      </button>

      {/* Reviews */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Reviews ({totalReviews})
        </h2>
        {reviews?.length ? (
          reviews.map((r, idx) => (
            <div key={idx} className="border p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={r.userInfo?.image || "/avatar-placeholder.png"}
                  alt="reviewer"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-medium text-sm text-gray-700">
                  {r.userInfo?.firstName} {r.userInfo?.lastName}
                </p>
                <span className="ml-auto text-yellow-500">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{r.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>
    </section>
  );
}
