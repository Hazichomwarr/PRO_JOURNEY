export default function MessagesLayout({
  children,
  list,
  conversation,
}: {
  children: React.ReactNode;
  list: React.ReactNode;
  conversation: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "300px", borderRight: "1px solid #ddd" }}>
        {list}
      </aside>

      <main style={{ flex: 1, padding: "16px" }}>
        {conversation || children}
      </main>
    </div>
  );
}
