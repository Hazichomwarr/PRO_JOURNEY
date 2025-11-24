import type { UserPublic } from "../../store/userStore";
import { Link } from "react-router-dom";

export default function BuddyCard({ buddy }: { buddy: UserPublic }) {
  return (
    <article className="bg-white p-4 rounded shadow">
      <div className="flex items-start gap-4">
        <img
          src={buddy.image ?? "/avatar-placeholder.png"}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="font-semibold">
            {buddy.firstName} {buddy.lastName}
          </h3>
          <p className="text-sm text-gray-500">{buddy.role}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600">Short bio or tags...</p>

      <div className="mt-4 flex justify-between items-center">
        <Link to={`/buddy/${buddy._id}`} className="text-sm text-blue-600">
          View
        </Link>
        <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded">
          Connect
        </button>
      </div>
    </article>
  );
}
