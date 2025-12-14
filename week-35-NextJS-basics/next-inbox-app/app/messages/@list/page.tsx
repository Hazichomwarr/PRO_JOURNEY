import Link from "next/link";

const conversations = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export default function MessageList() {
  return (
    <ul>
      <Link
        href="/messages/compose"
        className="mb-4 inline-block rounded bg-black px-3 py-2 text-sm text-white"
      >
        Compose
      </Link>

      {conversations.map((c) => (
        <li key={c.id}>
          <Link href={`/messages/${c.id}`}>{c.name}</Link>
        </li>
      ))}
    </ul>
  );
}
