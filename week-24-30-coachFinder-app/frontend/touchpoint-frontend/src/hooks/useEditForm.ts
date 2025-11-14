//hooks/useEditForm.ts
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../lib/axiosClient";
import { useFlashStore } from "../store/flashStore";

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

export interface CoachDetail {
  user: Reviewer;
  bio: string;
  expertise: string[];
  hourlyRate: number;
  availability: string[];
  totalReviews: number;
  averageRating: number | null;
  reviews: Review[];
}

export function useEditForm() {
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [coach, setCoach] = useState<CoachDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await axiosClient.get(`/coaches/${id}`);
        console.log(res.data);
        setCoach(() => {
          const c = res.data;
          return {
            ...c,
            availability: Array.isArray(c.availability)
              ? c.availability
              : typeof c.availability === "string"
              ? c.availability.split(",").map((s: string) => s.trim())
              : [],
          };
        });
      } catch (err: any) {
        console.error("Error fetching coach:", err.response);
      } finally {
        setLoading(false);
      }
    };
    fetchCoach();
  }, [id]);

  console.log("coach ->", coach);

  const handleChange =
    (field: keyof CoachDetail) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value = e.target.value;

      setCoach((prev) => {
        if (!prev) return prev;

        // handle expertise (string[]) — split by comma or space
        if (field === "expertise") {
          console.log("field =", field);
          const list = value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          console.log("list here ->", list);
          return { ...prev, expertise: list };
        }

        // handle availability (string[])
        if (field === "availability") {
          console.log("field =", field);
          const list = value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          console.log("list here ->", list);
          return { ...prev, availability: list };
        }

        // default: string or number
        return { ...prev, [field]: value };
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosClient.put(`coaches/${id}`, {
        bio: coach?.bio,
        expertise: coach?.expertise,
        hourlyRate: coach?.hourlyRate,
        availability: coach?.availability,
      });
      console.log("status response ->", res.status);
      setCoach((prev) => (prev ? { ...prev, ...res.data } : null));
      setIsEditing(false);
      useFlashStore
        .getState()
        .addFlash("Profile edited successfully!", "success");
    } catch (err: any) {
      console.error("Update failed:", err);

      useFlashStore
        .getState()
        .addFlash(
          `Update failed: ${err.message || "Please try again."}`,
          "error"
        );
    }
  };

  return {
    coach,
    isEditing,
    setIsEditing,
    handleSubmit,
    handleChange,
    loading,
    setLoading,
    id,
  };
}
