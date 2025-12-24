import ProtectedRoute from "../_components/ProtectedRoute";
import { getSession } from "../_lib/session";
import { ContactType } from "../_models/contact";
import { getContacts } from "../api/contact";
import Link from "next/link";

export default async function ContactPage() {
  const user = await getSession();
  if (!user) {
    console.log("User not found");
    return (
      <p className="text-center space-y-3">
        Please{" "}
        <Link href="/login" className="hover:underline text-blue-500">
          Login
        </Link>{" "}
        first
      </p>
    );
  }

  const userContacts: ContactType[] = await getContacts(user.id);
  console.log("user's contacts array:", userContacts);
  if (userContacts.length === 0) {
    return (
      <p className="text-center flex flex-col items-center space-y-6 mt-4">
        <span>No Contacts for you yet.</span>
        <Link
          href="/contacts/new"
          className="text-green-700 cursor-pointer p-2 hover:bg-amber-300 rounded"
        >
          Add new contact
        </Link>
      </p>
    );
  }

  return (
    <ProtectedRoute>
      <div>
        <h3>Contacts:</h3>
        <ul>
          {userContacts.map((c: ContactType) => (
            <li key={c.id} className="text-center">
              <Link href={`/contacts/${c.id}`} className="hover:underline">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
