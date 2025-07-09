import { useNavigate } from "react-router-dom";

export function About() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/projects/2");
  };

  return (
    <div className="p-4 text-center">
      <h1 className="p-4 text-2xl">📖 About Page</h1>
      <button
        onClick={handleClick}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400 active:bg-green-700"
      >
        Go to Project 2
      </button>
    </div>
  );
}
