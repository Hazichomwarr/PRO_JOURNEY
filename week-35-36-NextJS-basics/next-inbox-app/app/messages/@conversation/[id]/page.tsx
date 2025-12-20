export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  return (
    <div>
      <h2>Conversation {id}</h2>
      <p>This conversation is loaded dynamically.</p>
    </div>
  );
}
