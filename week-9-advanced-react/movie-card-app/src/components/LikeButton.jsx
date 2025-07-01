export const LikeButton = ({ handleLike, islike }) => {
  return (
    <button
      onClick={handleLike}
      className={`mt-2 text-2xl cursor-pointer hover:scale-110 transition-transform rounded-md p-2 border-none bg-gray-600 ${
        islike ? "text-yellow-600" : "text-yellow-300"
      }`}
    >
      {!islike ? "👍 Liked" : "👎 Disliked"}
    </button>
  );
};
