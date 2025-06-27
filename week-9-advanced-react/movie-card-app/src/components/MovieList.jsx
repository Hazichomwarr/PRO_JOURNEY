import { movies } from "../data/movie";
import { MovieCard } from "./MovieCard";
import { useState } from "react";

export const MovieList = () => {
  const [likedMovies, setLikedMovies] = useState({});

  const handleLike = (id) => {
    setLikedMovies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-[2rem] bg-gray-300">
        Our Movies
      </h1>
      <div className="movies">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            islike={likedMovies[movie.id]}
            handleLike={() => handleLike(movie.id)}
          />
        ))}
      </div>
    </main>
  );
};
