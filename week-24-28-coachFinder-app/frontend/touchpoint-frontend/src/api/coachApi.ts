//api/coachApi.ts
import axiosClient from "../lib/axiosClient";
import type { Coach } from "../models/coach";

export const getCoachByExpertise = async (
  expertise: string
): Promise<Coach[]> => {
  try {
    const res = await axiosClient.get(`/coaches/search?expertise=${expertise}`);
    return res.data.map((coach: any) => ({
      id: coach._id,
      bio: coach.bio,
      expertise: coach.expertise,
      hourlyRate: coach.hourlyRate,
      availability: coach.avaibility,
    }));
  } catch (err) {
    console.error("error ->", err);
    return [];
  }
};

//for all coaches
export const getAllCoaches = async (): Promise<Coach[]> => {
  try {
    const res = await axiosClient.get("/coaches");
    console.log("all coaches->", res.data);
    return res.data.map((coach: any) => ({
      id: coach._id,
      name: `${coach.user.firstName} ${coach.user.lastName}`,
      bio: coach.bio,
      expertise: coach.expertise.join(" "),
      totalReviews: coach.totalReviews || 0,
      averageRating: coach.averageRating || null,
    }));
  } catch (err: any) {
    console.error("error ->", err);
    return [];
  }
};
