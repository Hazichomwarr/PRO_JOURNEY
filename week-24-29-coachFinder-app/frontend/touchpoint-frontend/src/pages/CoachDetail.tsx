//pages/CoachDetails.tsx
import { Clock, DollarSign, Star, Pencil, X } from "lucide-react";
import { useUserStore } from "../store/userStore";
import { useEditForm } from "../hooks/useEditForm";
import EditForm from "../components/layout/coach/EditForm";
import { useState } from "react";
import MessageModal from "../components/layout/coach/MessageModal";

export default function CoachDetail() {
  const { user: loggedInUser } = useUserStore();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const {
    coach,
    isEditing,
    setIsEditing,
    handleSubmit,
    handleChange,
    loading,
    id: coachId,
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
    <section className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl shadow-xl space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-6 pb-4 border-b border-gray-200">
        <img
          src={user?.image || "/avatar-placeholder.png"}
          alt="coach avatar"
          className="w-20 h-20 rounded-2xl object-cover shadow-sm ring-2 ring-blue-100"
        />
        <div>
          <h1 className="text-sm text-gray-600">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-2xl font-semibold text-gray-800">
            {expertise.join(" - ")}
          </p>
          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={18} />
            <span className="text-sm text-gray-700">
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
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all hover:scale-[1.02]"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        )}

      {/* BIO */}
      <div className="shadow-md p-6 rounded-full bg-stone-50">
        <h2 className="text-lg font-semibold text-blue-500">About me</h2>
        <p className="text-gray-600 leading-relaxed">{bio}</p>
      </div>

      {/* Details */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={16} />
          <span className="font-semibold text-blue-500">Availability</span>
          <ul className="flex gap-2">
            {Array.isArray(availability) ? (
              availability.map((a, idx) => <li key={idx}>{a} |</li>)
            ) : (
              <li>{availability}</li>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign size={16} />
          <span className="font-semibold text-blue-500">Hourly Rate:</span>
          <span>${hourlyRate}/hr</span>
        </div>
      </div>

      {/* Call to Action */}
      <button
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        onClick={() => setShowMessageModal(true)}
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
            <div
              key={idx}
              className="border border-gray-100 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={r.userInfo?.image || "/avatar-placeholder.png"}
                  alt="reviewer"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-medium text-sm text-blue-700">
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

      {showMessageModal && (
        <MessageModal
          onClose={() => setShowMessageModal(false)}
          coachId={coachId!}
          coachName={user.firstName}
          userName={loggedInUser!.firstName}
          userId={loggedInUser!.id}
        />
      )}
    </section>
  );
}
