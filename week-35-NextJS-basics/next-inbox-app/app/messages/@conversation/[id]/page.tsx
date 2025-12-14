export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div>
      <h2>Conversation {id}</h2>
      <p>This conversation is loaded dynamically.</p>
    </div>
  );
}
