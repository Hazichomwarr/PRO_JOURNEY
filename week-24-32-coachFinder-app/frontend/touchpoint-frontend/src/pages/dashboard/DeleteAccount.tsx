//pages/dashboard/DeleteAccount.tsx
import { useNavigate } from "react-router-dom";
import { useFlashStore } from "../../store/flashStore";
import { motion } from "framer-motion";
// import ModalShell from "../../components/ui/ModalShell";
import { deleteUser } from "../../api/userApi";
import { useAuthStore } from "../../store/authStore";

export default function DeleteAccount() {
  const navigate = useNavigate();

  const userId = useAuthStore((s) => s.user?.id);
  const logout = useAuthStore((s) => s.logout);

  if (!userId) {
    useFlashStore.getState().addFlash("Something went wrong!");
    navigate(-1);
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      navigate("/home");
      useFlashStore
        .getState()
        .addFlash(
          "Your account and all your data has been deleted. Come back soon.",
          "error",
          8000
        );

      logout();
    } catch (error) {
      console.error(error);
      useFlashStore.getState().addFlash("Delete failed", "error");
    }
  };

  const variants = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: -10 },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <motion.div
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white p-6 rounded-md w-[90%] max-w-md flex flex-col gap-4"
      >
        <h3 className="text-red-800 font-light text-3xl">Confirm Delete</h3>
        <p className="text-red-700 text-xl font-light mb-6">
          This action is irreversible. All your data and activities will be
          deleted.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="txt-sm px-4 py-2 bg-red-600 text-gray-100 rounded-lg hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </motion.div>
      //{" "}
    </div>
  );
}
