import { getSession } from "../_lib/session";
import { redirect } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getSession();
  if (session === null) redirect("/login");
  return <div>{children}</div>;
}
