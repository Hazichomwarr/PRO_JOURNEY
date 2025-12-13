import Link from "next/link";

const conversations = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export default function MessageList() {
  return (
    <ul>
      {conversations.map((c) => (
        <li key={c.id} className="ml-1.5 hover:underline">
          <Link href={`/messages/${c.id}`}>{c.name}</Link>
        </li>
      ))}
    </ul>
  );
}
