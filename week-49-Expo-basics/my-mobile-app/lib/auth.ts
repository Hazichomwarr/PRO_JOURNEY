// lib/auth.ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export async function setToken(token: string) {
  if (isWeb) {
    localStorage.setItem("token", token);
  } else await SecureStore.setItemAsync("token", token);
}

export async function getToken() {
  if (isWeb) {
    return localStorage.getItem("token");
  }
  const token = await SecureStore.getItemAsync("token");
  console.log("token:", token);
  return token;
}

export async function logout() {
  if (isWeb) {
    localStorage.removeItem("token");
  }
  await SecureStore.deleteItemAsync("token");
}
