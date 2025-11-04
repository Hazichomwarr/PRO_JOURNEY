//hooks/useEditForm.ts
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../lib/axiosClient";

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
  availability: { day: string; slots: string[] }[];
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
        setCoach(res.data);
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
          const list = value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          return { ...prev, expertise: list };
        }

        // handle availability — expects JSON string or custom format
        if (field === "availability") {
          try {
            // Try to parse JSON, e.g. '[{"day":"Tuesday","slots":["9am"]}]'
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              return { ...prev, availability: parsed };
            }
          } catch {
            // fallback: user types simple CSV format like "Tue 9am, Thu 2pm"
            const arr = value.split(",").map((v) => {
              const [day, ...slots] = v.trim().split(" ");
              return { day, slots };
            });
            return { ...prev, availability: arr };
          }
        }

        // default: string or number
        return { ...prev, [field]: value };
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosClient.put(`coach/${id}`, {
        bio: coach?.bio,
        expertise: coach?.expertise,
        hourlyRate: coach?.hourlyRate,
        availability: coach?.availability,
      });

      setCoach((prev) => (prev ? { ...prev, ...res.data } : null));
      setIsEditing(false);
    } catch (err: any) {
      console.error("Update failed:", err);
      alert("Update failed. Please try again.");
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
