// lib/api.ts
import { getToken } from "./auth";

const BASE_URL = "http://localhost:3000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error("Api Error");
    }

    return { message: "Hello from backend" }; //testing
  } catch (err) {
    console.log("error:", err);
    throw new Error("Server Error");
  }
}
