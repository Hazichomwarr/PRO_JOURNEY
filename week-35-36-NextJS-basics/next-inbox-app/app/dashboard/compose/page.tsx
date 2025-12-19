// app/dashboard/compose/page.tsx
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function ComposePage() {
  async function create(formData: FormData) {
    "use server";

    const text = formData.get("text");

    // 🔐 Validation
    if (!text || typeof text !== "string" || text.length < 3) {
      throw new Error("Message must be at least 3 characters");
    }

    // // 🔁 Mutation
    // addMessage(text);

    // ♻️ Revalidate
    revalidatePath("/dashboard");

    // ➡️ Redirect
    redirect("/dashboard");
  }

  return (
    <form action={create} className="mx-auto mt-20 max-w-sm space-y-4">
      <textarea
        name="text"
        placeholder="Type a message…"
        className="w-full border p-2"
      />
      <button className="w-full rounded bg-blue-600 p-2 text-white cursor-pointer">
        Send
      </button>
    </form>
  );
}
