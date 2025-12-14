import React from "react";

export default function MessagesLayout({
  children,
  list,
  conversation,
  modal,
}: {
  children: React.ReactNode;
  list: React.ReactNode;
  conversation: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "300px", borderRight: "1px solid #ddd" }}>
        {list}
      </aside>

      <main style={{ flex: 1, padding: "16px" }}>
        {modal}
        {conversation || children}
      </main>
    </div>
  );
}
