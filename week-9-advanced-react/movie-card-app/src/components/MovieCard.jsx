export const MovieCard = ({ movie, islike, handleLike }) => {
  return (
    <>
      <section className="bg-[gold]-200 rounded shadow-sm p-4 max-w-md mb-[2rem] flex flex-col md:flex-row items-center mb-8">
        <h2 className="movie-hd mb-[.5rem]">{movie.title}</h2>
        <figure>
          <img
            src={movie.poster}
            alt={`${movie.title} movie poster`}
            className="w-[250px]"
          />
          <figcaption className="flex justify-between items-center font-bold text-gold">
            <span>{movie.genre}</span>
            <button className="" onClick={handleLike}>
              {!islike ? "Like 👍" : "Dislike 👎"}
            </button>
          </figcaption>
        </figure>
      </section>
    </>
  );
};
