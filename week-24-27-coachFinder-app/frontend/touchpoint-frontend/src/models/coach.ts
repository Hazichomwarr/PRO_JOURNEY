//models/coach.ts
export interface Coach {
  id: string; //took care of the trailing(_id) in the axios call
  name: string;
  bio: string;
  expertise: string[];
  hourlyRate: number | null;
  totalReviews: number;
  averageRating: number | null;
}

export interface CoachFormValues {
  bio: string;
  expertise: string[];
  hourlyRate: number | null;
  availability: { [day: string]: string[] }; // {['Mon': ["09-11", '16-17'],]}
}
