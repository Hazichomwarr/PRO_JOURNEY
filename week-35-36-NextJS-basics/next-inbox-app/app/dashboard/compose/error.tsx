// app/dashboard/compose/error.tsx
"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="mx-auto mt-20 max-w-sm space-y-4">
      <p className="text-red-300">{error.message}</p>
      <a href="/dashboard/compose" className="underline">
        Try again
      </a>
    </div>
  );
}
