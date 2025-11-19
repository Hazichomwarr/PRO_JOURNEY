import ModalShell from "../ui/ModalShell";
interface Props {
  onLogout: () => void;
  isRequest: boolean;
  setIsRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function confirmLogoutModal({
  onLogout,
  isRequest,
  setIsRequest,
}: Props) {
  return (
    <ModalShell open={isRequest} onClose={() => setIsRequest(false)}>
      <div className="flex flex-col gap-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">Confirm Logout</h2>

        {/* Body */}
        <p className="text-gray-600">Are you sure you want to logout?</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsRequest(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
