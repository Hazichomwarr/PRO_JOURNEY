import { cookies } from "next/headers";
import { UserType } from "../_models/user";

const SESSION_COOKIE = "session_user";

//Set Session
export const setSession = async (user: Omit<UserType, "password">) => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
};

//Get Session
export async function getSession(): Promise<Omit<UserType, "password"> | null> {
  const cookieStore = await cookies();
  const currentSession = cookieStore.get(SESSION_COOKIE)?.value;
  if (!currentSession) return null;

  const user = JSON.parse(currentSession);
  return user;
}

//Delete Session
export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
};
