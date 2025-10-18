//components/layout/ProfileSummary.tsx
import type { UserPublic } from "../../store/userStore";

type ProfileSummaryProps = { user: UserPublic };

export default function ProfileSummary({ user }: ProfileSummaryProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded shadow">
      <img
        src={user.image ?? "/avatar-placeholder.png"}
        alt={`${user.firstName} ${user.lastName ?? ""}`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold">
          {user?.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">Role: {user.role ?? "user"}</p>
      </div>
    </div>
  );
}
