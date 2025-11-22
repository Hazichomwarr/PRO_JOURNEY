import { MapPin, Mail, Phone, User, Edit } from "lucide-react";
import { Info } from "../../components/ui/Info";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { userInfo: user } = useAuthStore();

  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center mt-6 text-gray-500">No Profile Found</p>;
  }
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white rounded-2xl shadow p-6">
        <img
          src={user.image || "/avatar-placeholder.png"}
          alt="avatar"
          className="w-28 h-28 rounded-xl object-cover shadow-sm"
        />

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
            <User size={22} className="text-blue-600" />
            {user.firstName + " " + user.lastName}
          </h1>
          <p className="text-gray-500 capitalize">{user.role}</p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-300 text-graay-700 px-4 py-2 rounded-xl hover:bg-blue-400 transition-all"
          onClick={() => navigate("/dashboard/settings/edit-profile")}
        >
          <Edit size={18} /> Edit Profile
        </button>
      </div>

      {/* About Section */}
      {user.bio && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
          <p className="text-gray-600 leading-relaxed">{user.bio}</p>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Details</h2>

        <Info label="Email" value={user.email} icon={<Mail size={16} />} />
        {user.phone && (
          <Info label="Phone" value={user.phone} icon={<Phone size={16} />} />
        )}
        {(user.city || user.state) && (
          <Info
            label="Location"
            value={`${user.city || ""}${user.city && user.state ? ", " : ""}${
              user.state || ""
            }`}
            icon={<MapPin size={16} />}
          />
        )}
      </div>

      {/* Interests Section */}
      {user.interests && user.interests.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((i, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Coach Experience
      {user.role === "coach" && user.experience && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Experience
          </h2>
          <p className="text-gray-600 whitespace-pre-line">{user.experience}</p>
        </div>
      )} */}
    </div>
  );
}
