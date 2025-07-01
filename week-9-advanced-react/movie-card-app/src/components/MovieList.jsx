import { movies } from "../data/movie";
import { MovieCard } from "./MovieCard";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Header } from "./Header";

export const MovieList = () => {
  const [likedMovies, setLikedMovies] = useState({});
  const [moviesFound, setMoviesFound] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isfilter, setIsfilter] = useState(false);

  const handleLike = (id) => {
    setLikedMovies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleSearch = (e) => {
    setIsfilter(true); // to show the reset-movies button
    setSearchTerm(e.target.value);
    const results = movies.filter((movie) =>
      movie.genre.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    setMoviesFound(results);
    return;
  };

  const handleResetBtn = () => {
    setSearchTerm("");
    setMoviesFound([]);
    setIsfilter(false);
  };
  return (
    <main className="max-w-4xl mx-auto px-[4px] py-[8px]">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        handleResetBtn={handleResetBtn}
        handleSearch={handleSearch}
      />
      {(isfilter ? moviesFound : movies).map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          islike={likedMovies[movie.id]}
          handleLike={() => handleLike(movie.id)}
        />
      ))}
      {isfilter && moviesFound.length === 0 && (
        <p className="text-center text-gray-600 text-lg mt-4">
          No movies found.
        </p>
      )}
    </main>
  );
};
