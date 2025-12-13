export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("params ->", params);
  return (
    <div>
      <h2>Conversation {params.id}</h2>
      <p>This conversation is loaded dynamically.</p>
    </div>
  );
}
