import { movies } from "../data/movie";
import { MovieCard } from "./MovieCard";
import { useState} from "react";

export const MovieList = () => {
  const [likedMovies, setLikedMovies] = useState({});
  const [moviesFound, setMoviesFound] = useState([])
  const[searchTerm, setSearchTerm] = useState('')
  const [isfilter, setIsfilter] = useState(false)

  const handleLike = (id) => {
    setLikedMovies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleSearch = (e) => {
    setIsfilter(true) // to show the reset-movies button
    setSearchTerm(e.target.value.trim())
    const results = movies.filter(movie => movie.genre.toLowerCase().includes(e.target.value.trim().toLowerCase()))
    setMoviesFound(results)
    return
  }

  const handleResetBtn = () => {
    setSearchTerm('')
    setMoviesFound([])
    setIsfilter(false)
   
  }
  return (
    <main className="max-w-4xl mx-auto px-[4px] py-[8px] bg-[gold]">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-[2rem] bg-gray-300">
        🎬 Our Movies
      </h1>
      <div className="flex justify-center items-center mb-[2rem]">
        <input type="search" placeholder="Search movie..." className=" block my-[2rem] mx-[100px] p-[.5rem] rounded-[10px] w-[50%] text-start text-[1.2rem]" value={searchTerm} onChange={handleSearch}/>
        <button onClick={handleResetBtn}
          className="font-[1.2rem] hover:scale-110 transition-transform rounded-[10px] px-[2rem] py-[1rem] bg-[gray] text-[white] block active:bg-blue-500 ">All</button>
        
      </div>
      <div className="movies">
          {moviesFound.length !== 0 ? moviesFound.map(movieFound => (
          <MovieCard
            key={movieFound.id}
            movie={movieFound}
            islike={likedMovies[movieFound.id]}
            handleLike={() => handleLike(movieFound.id)}
          />))
          : 
          movies.map((movie) => (
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
