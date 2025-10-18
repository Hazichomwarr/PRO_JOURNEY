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
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    // onSuccess: (data) => {
    //     if (!user) setUser(data)
    // }
  });

  // The modern v5 way to handle side effects
  useEffect(() => {
    if (!user) setUser(data);
  }, [data, setUser]);

  return { isLoading, isError, user: user ?? data ?? null };
}
