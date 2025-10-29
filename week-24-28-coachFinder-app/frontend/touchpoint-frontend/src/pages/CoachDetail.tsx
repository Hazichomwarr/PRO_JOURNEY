//pages/CoachDetails.tsx
import { Clock, DollarSign, Star, Pencil, X } from "lucide-react";
import { useUserStore } from "../store/userStore";
import { useEditForm } from "../hooks/useEditForm";
import EditForm from "../components/layout/coach/EditForm";

export default function CoachDetail() {
  const { user: loggedInUser } = useUserStore();
  const {
    coach,
    isEditing,
    setIsEditing,
    handleSubmit,
    handleChange,
    loading,
    setLoading,
    id,
  } = useEditForm();

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
          <p className="text-2xl font-semibold text-gray-800">
            {expertise.join(" ")}
          </p>
          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={18} />
            <span>
              {averageRating ? averageRating.toFixed(1) : "No Ratings yet"} (
              {totalReviews} reviews){" "}
            </span>
          </div>
        </div>
      </div>

      {/* Only show Edit button if this is the coach’s own profile */}
      {loggedInUser?.firstName === user.firstName &&
        loggedInUser?.role === "coach" && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-200 transition"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        )}

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

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              className="absolute top-4 right 4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditing(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>

            {/* Edit-Form */}
            <EditForm
              changeFn={handleChange}
              submitFn={handleSubmit}
              coach={coach}
            />
          </div>
        </div>
      )}
    </section>
  );
}
