// app/dashboard/page.tsx
import { getSession } from "../lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  // const session = await getSession();
  // if (!session) redirect("/login");

  return <DashboardClient />;
}
