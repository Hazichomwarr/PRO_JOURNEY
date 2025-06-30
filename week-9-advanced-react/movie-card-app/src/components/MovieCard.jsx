export const MovieCard = ({ movie, islike, handleLike }) => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-4 shadow-md rounded-lg mb-6">
      <img
        src={movie.poster}
        alt={`${movie.title} movie poster`}
        className="w-[400px] h-auto rounded-[10px]"
      />
      <article className="flex items-center gap-[2rem] mb-[2rem]">
        <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.genre}</p>
        <button onClick={handleLike} 
        className={`mt-2 text-2xl cursor-pointer hover:scale-110 transition-transform justify-self-stretch rounded-[10px] p-[.5rem] border-none bg-[gray] ${islike ? "text-[yellow] bg-[gray]" : "text-[gold] bg-[gray]"
}`} > 
          {!islike ? "Like 👍" : "Dislike 👎"}
        </button>
      </article>
    </section>
  );
};
