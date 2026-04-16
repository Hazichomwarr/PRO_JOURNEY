import { Redirect, Stack } from "expo-router";

const isLoggedIn = true;

export default function RootLayout() {
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return <Stack />;
}
