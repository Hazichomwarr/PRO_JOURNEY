export const ProgressTracker = ({ currentStep, labels }) => {
  return (
    <div className="flex justify-between items-center mb-6 px-2">
      {labels.map((label, index) => {
        const isActive = index + 1 === currentStep;
        const isComplete = index + 1 < currentStep;

        return (
          <div
            key={label}
            className={`flex-1 text-center py-2 rounded ${
              isComplete ? "bg-green-500 text-white" : ""
            } ${
              isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <span className="block text-sm font-semibold">{label}</span>
            <span className="text-xs">Step {index + 1}</span>
            {/* <span>{isComplete ? "✔️" : index + 1}</span> */}
          </div>
        );
      })}
    </div>
  );
};
