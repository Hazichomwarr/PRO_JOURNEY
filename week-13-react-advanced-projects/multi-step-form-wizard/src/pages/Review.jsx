import { useForm } from "../context/FormContext";
import { useNavigate } from "react-router-dom";

export const Review = () => {
  const { formState, dispatch, goToPrevStep } = useForm();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch({ type: "ready" });
    navigate("/form/success");
  };

  const { fields } = formState;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Review Your Info</h2>

      <ul className="space-y-2">
        <li>
          <strong>Name:</strong> {fields.name}
        </li>
        <li>
          <strong>Email:</strong> {fields.email}
        </li>
        <li>
          <strong>Phone:</strong> {fields.phone}
        </li>
        <li>
          <strong>Subscribe:</strong> {fields.isSubscribe ? "Yes" : "No"}
        </li>
        <li>
          <strong>Contact Method:</strong> {fields.contactMethod}
        </li>
        <li>
          <strong>Message:</strong> {fields.message}
        </li>
      </ul>

      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={goToPrevStep}
        >
          Back
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
