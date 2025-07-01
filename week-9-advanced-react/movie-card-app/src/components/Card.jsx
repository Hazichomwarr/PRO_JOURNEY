export const Card = ({ children }) => {
  return (
    <section className="w-full m-6 p-4 grid grid-cols-1 items-center gap-4 rounded-lg shadow-md bg-yellow-400 hover:scale-105 transition-scale duration-500 md:grid-cols-2">
      {children}
    </section>
  );
};
