//models/coach.ts
export interface Coach {
  id: string; //took care of the trailing(_id) in the axios call
  bio: string;
  expertise: string;
  hourlyRate: number;
  avaibility: string;
}

export type CoachPublic = Omit<Coach, "id">;
