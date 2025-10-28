//components/layout/coach/ExpertiseSelector.tsx

interface Props {
  selected: string[];
  onToggle: (expertise: string) => void;
}

const EXPERTISE_OPTIONS = [
  "Fitness",
  "Life Coaching",
  "Career",
  "Finance",
  "Coding",
  "Motivation",
  "Spirituality",
];

export default function ExpertiseSelector({ selected, onToggle }: Props) {
  return (
    <div className="space-y-2">
      <p>Select your expertise areas</p>
      <div className="flex gap-2 flex-wrap">
        {EXPERTISE_OPTIONS.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
