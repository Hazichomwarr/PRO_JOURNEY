import { Card } from "./Card";
import { LikeButton } from "./LikeButton";

export const MovieCard = ({ movie, islike, handleLike }) => {
  return (
    <Card>
      <img
        src={movie.poster}
        alt={`${movie.title} movie poster`}
        className="w-[400px] h-auto rounded-md"
      />
      <article className="flex items-center gap-4 mb-8">
        <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.genre}</p>
        <LikeButton handleLike={handleLike} islike={islike} />
      </article>
    </Card>
  );
};
