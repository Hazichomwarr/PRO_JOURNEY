//components/layout/seeker/MultiStepLabels.tsx

interface Props {
  step: number;
  stepLength: number;
  stepLabels: Record<number, string>;
}

export default function MultiStepLabels({
  step,
  stepLength,
  stepLabels,
}: Props) {
  return (
    <div>
      {/* Textual Indicator of steps */}
      <div className="w-fit my-2 mx-auto font-semibold text-gray-700">
        (step {step} of {stepLength} )
      </div>

      {/* Horizontal Progress Bar */}
      <div
        className="w-full rounded-full h-2 bg-gray-200"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={stepLength}
      >
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / stepLength) * 100}%` }}
        />
      </div>

      {/* Step labels */}
      <div className="flex justify-between text-sm mb-2">
        {Object.entries(stepLabels).map(([key, label]) => (
          <span
            key={key}
            aria-current={Number(key) === step ? "step" : undefined}
            className={
              Number(key) <= step ? "font-bold text-blue-600 text-xl" : ""
            }
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
