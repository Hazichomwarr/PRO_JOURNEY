import { Outlet } from "react-router-dom";
import { FormProvider } from "../context/FormContext";

export const FormLayout = () => {
  return (
    <FormProvider>
      <main className="max-w-2xl mx-auto p-4">
        <Outlet />
      </main>
    </FormProvider>
  );
};
