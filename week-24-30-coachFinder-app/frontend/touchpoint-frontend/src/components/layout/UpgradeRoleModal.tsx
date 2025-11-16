//components/layout/UpgradeModal.tsx
interface UpgradeRoleModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UpgradeRoleModal({
  onConfirm,
  onCancel,
}: UpgradeRoleModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Become a Coach
        </h2>
        <p className="text-gray-600 mb-6">
          To create a coaching profile, you first need to upgrade your account
          to a coach. Would you like to proceed?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
