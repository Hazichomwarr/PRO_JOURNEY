// 👇 shadcn/ui imports
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import type { Guest } from "../models/guest";

interface DeleteButtonProps {
  guest: Guest;
  onDelete: (guestID: string) => void;
}

export default function DeleteButton({ guest, onDelete }: DeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-sm text-white rounded-md bg-red-500 hover:bg-red-700 active:bg-red-300 px-2 py-1">
          Remove
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove {guest.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The guest will be permanently removed
            from your list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => onDelete(guest.id)}
          >
            Yes, Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
