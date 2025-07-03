export const TextInput = ({ handleChange, text }) => {
  return (
    <section className="w-80 my-4 mx-auto flex flex-col items-center gap-2">
      <label htmlFor="text" className="text-2xl">
        Write your message:
      </label>
      <textarea
        name="text"
        id="text"
        rows={4}
        cols={20}
        onChange={handleChange}
        value={text}
        className="w-full rounded-md resize-y focus:outline-blue-400 md:max-w-1/2 text-2xl"
      ></textarea>
    </section>
  );
};
