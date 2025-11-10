//hooks/useUserData.ts
import { useQuery } from "@tanstack/react-query";
import { UserPublic, useUserStore } from "../store/userStore";
import { getCurrentUser } from "../api/userApi";
import { useEffect } from "react";

export function useUserData() {
  const { user, setUser } = useUserStore();

  const { data, isLoading, isError } = useQuery<UserPublic>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // <- explain this line
    refetchOnWindowFocus: false, //<- explain this line too
    // onSuccess: (data) => {
    //     if (!user) setUser(data)
    // }
  });

  // onSuccess doesn't work(why?), that's why i used useEffect
  useEffect(() => {
    if (data && !user) setUser(data);
  }, [data, user, setUser]);

  return { isLoading, isError, user: user ?? data ?? null };
}
