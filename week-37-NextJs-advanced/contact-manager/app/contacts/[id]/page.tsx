import { ContactType } from "@/app/_models/contact";
import { getContactById } from "@/app/api/contact";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ContactDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const contacts: ContactType[] = await getContactById(id);
  console.log("contact:", contacts);

  return (
    <section className="space-y-4 w-[70%] mx-auto my-4 ">
      <h3 className="text-center text-2xl">Contact Details</h3>

      <div
        key={contacts[0].email}
        className="flex justify-between items-center shadow-lg p-4 rounded-md"
      >
        <div>
          <p>
            Name: <span>{contacts[0].name}</span>
          </p>
          <p>
            Email: <span>{contacts[0].email}</span>
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button className="text-blue-500 cursor-pointer hover:underline hover:text-blue-600">
            Edit
          </button>
          <button className="text-red-500 cursor-pointer hover:underline hover:text-red-600">
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
