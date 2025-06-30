import { movies } from "../data/movie";
import { MovieCard } from "./MovieCard";
import { useState} from "react";

export const MovieList = () => {
  const [likedMovies, setLikedMovies] = useState({});
  const [isMovieFound, setIsMovieFound] = useState(false)
  const [movieFound, setMovieFound] = useState()
  const[searchTerm, setSearchTerm] = useState('')
  const [isfilter, setIsfilter] = useState(false)

  const handleLike = (id) => {
    setLikedMovies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleSearch = (e) => {
    setIsfilter(true)
    setSearchTerm(e.target.value.trim())
    let result = movies.find(movie => movie.title.toLowerCase().includes(e.target.value.trim().toLowerCase()))
    if (Object.keys(result).length !== 0) { 
      setIsMovieFound(true)
      setMovieFound(result)
    }
    else {
    setIsMovieFound(false)
    setMovieFound({})
    }
  
    return
  }

  const handleResetBtn = () => {
    setSearchTerm('')
    setMovieFound({})
    setIsfilter(false)
    setIsMovieFound(false)
  }
  return (
    <main className="max-w-4xl mx-auto px-[4px] py-[8px] bg-[gold]">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-[2rem] bg-gray-300">
        🎬 Our Movies
      </h1>
      <div className="flex justify-center items-center">
        <input type="search" placeholder="Search movie..." className="my-[2rem] mx-[100px] p-[.5rem] rounded-[10px] w-[50%] text-start text-[1.2rem]" value={searchTerm} onChange={handleSearch}/>
        {
          isfilter && <button onClick={handleResetBtn}
          className="mt-2 text-2xl cursor-pointer hover:scale-110 transition-transform justify-self-stretch rounded-[10px] p-[.6rem] border-none bg-[gray] text-[white]">Reset Search</button>
        }
      </div>
      <div className="movies">
          {isMovieFound ? 
          <MovieCard
            key={movieFound.id}
            movie={movieFound}
            islike={likedMovies[movieFound.id]}
            handleLike={() => handleLike(movieFound.id)}
          />
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
