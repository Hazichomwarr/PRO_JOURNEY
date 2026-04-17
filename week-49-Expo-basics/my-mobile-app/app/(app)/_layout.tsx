import { getToken } from "@/lib/auth";
import { Redirect, Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        const t = await getToken();
        setToken(t);
        setLoading(false);
      }
      load();
    }, []),
  );
  if (loading) return null;

  if (!token) {
    return <Redirect href="/login" />;
  }
  return <Stack />;
}
