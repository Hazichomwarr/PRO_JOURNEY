export default function GuestForm() {
  return (
    <form className="flex flex-col gap-3 border p-4 rounded-lg shadow-md">
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value="" onChange={() => "hello"} />
    </form>
  );
}
