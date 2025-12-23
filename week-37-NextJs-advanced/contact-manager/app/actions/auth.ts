//app/actions/auth.ts
"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { UserType } from "../_models/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { deleteSession, setSession } from "../_lib/session";

const API_URL = "http://localhost:3001";

export async function loginAction(formData: FormData) {
  console.log("formaData:", formData);
  try {
    const res = await axios.get(
      `${API_URL}/users?username=${formData.get(
        "username"
      )}&password=${formData.get("password")}`
    );
    const user: UserType = res.data[0];
    console.log("user:", user);
    if (!user) throw new Error("Invalid Credentials.");

    //Set a cookie for loggedin user
    await setSession({ username: user.username, id: user.id });

    //Redirect
    redirect("/contacts");
  } catch (err: any) {
    if (isRedirectError(err)) throw err;

    console.log("error:", err);
    throw new Error("failed to login");
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
