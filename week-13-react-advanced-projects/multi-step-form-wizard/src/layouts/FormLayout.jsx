import { Outlet } from "react-router-dom";

export const FormLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-xl p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Multi-Step Form Wizard
        </h1>

        {/* Here the current step (StepOne, StepTwo, etc.) gets rendered */}
        <Outlet />
      </div>
    </div>
  );
};
