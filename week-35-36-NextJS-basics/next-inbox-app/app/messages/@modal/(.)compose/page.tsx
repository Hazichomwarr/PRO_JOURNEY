import Link from "next/link";

export default function Modal() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ background: "white", padding: 20 }}>
        <h2>New Message</h2>
        <p>This modal is URL-driven.</p>
        <Link
          href="/messages"
          className="mt-4 inline-block rounded bg-black px-3 py-2 text-sm text-white cursor-pointer"
        >
          Close
        </Link>
      </div>
    </div>
  );
}
