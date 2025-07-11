import { useParams } from "react-router-dom";

export const ProjectDetails = () => {
  const { id } = useParams();
  return (
    <div className="pt-4 mt-6 border-t">
      <p className="text-gray-700">
        Project Details ID: <strong>{id}</strong>
      </p>
    </div>
  );
};
