// components/ui/ShowPwdStrength.tsx
interface Props {
  score: number;
  feedback?: string;
}

const SCORELABELS = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];

export default function ShowPwdStrength({ score, feedback }: Props) {
  return (
    <div className="">
      <div className="font-medium text-sm">
        {score === 0 ? undefined : `Strength: ${SCORELABELS[score]}`}
      </div>
      <div className="h-2 w-full bg-gray-200 rounded mt-1">
        <div
          className={`h-full transition-all duration-300`}
          style={{
            width: `${(score + 1) * 20}%`,
            backgroundColor:
              score <= 1
                ? "red"
                : score === 2
                ? "orange"
                : score === 3
                ? "green"
                : "darkgreen",
          }}
        />
      </div>
      {feedback && <p className="text-sm text-gray-500 mt-1">({feedback})</p>}
    </div>
  );
}
