import { Link, Outlet } from "react-router-dom";

const fakeProjects = [
  { id: 1, name: "Portfolio Site" },
  { id: 2, name: "Form manager" },
];

export function Projects() {
  return (
    <div className="p-4">
      <h1 className="p-4 text-2xl">📁 Projects </h1>
      <ul className="list-disc pl-4 mt-2">
        {fakeProjects.map((p) => (
          <Link to={`${p.id}`} className="text-blue-500 hover:underline mx-4">
            {p.name}
          </Link>
        ))}
      </ul>

      {/* This is where child routes will render */}
      <Outlet />
    </div>
  );
}
