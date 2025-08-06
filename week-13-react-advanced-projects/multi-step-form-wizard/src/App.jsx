import { Routes, Route, Navigate } from "react-router-dom";
import { FormLayout } from "./layouts/FormLayout";
import { NotFound } from "./pages/NotFound";
import { StepOne } from "./pages/StepOne";
import { StepTwo } from "./pages/StepTwo";
import { StepThree } from "./pages/StepThree";
import { Review } from "./pages/Review";
import { Success } from "./pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/form" element={<FormLayout />}>
        <Route index element={<Navigate to="step-1" />} />{" "}
        {/* Default redirect to step-1 */}
        <Route path="step-1" element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
        <Route path="review" element={<Review />} />
        <Route path="success" element={<Success />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
