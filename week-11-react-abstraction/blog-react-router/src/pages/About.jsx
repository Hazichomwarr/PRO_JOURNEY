import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/blog/4");
  };

  return (
    <div className="p-4 my-0 mx-auto">
      <h2 className="text-xl font-medium">About</h2>
      <button
        onClick={handleClick}
        className="mt-6 py-4 px-2 bg-blue-400 rounded text-white font-medium hover:bg-blue-500"
      >
        Go to post 3
      </button>
    </div>
  );
};
