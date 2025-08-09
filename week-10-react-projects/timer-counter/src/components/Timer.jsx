import { useState } from "react";
import { useCountdown } from "./useCountdown";

export function Timer() {
  const [inputSeconds, setInputSeconds] = useState(1);

  const { seconds, isRunning, start, pause, reset } =
    useCountdown(inputSeconds);

  return (
    <main className="flex flex-col items-center gap-4 mt-10">
      <input
        type="number"
        value={inputSeconds}
        onChange={(e) => setInputSeconds(e.target.value)}
        className="border p-2 rounded"
        disabled={isRunning}
      />
      <h2 className="text-3xl font-bold">
        {seconds > 0 ? seconds : "⏰ Time’s up!"}
      </h2>
      <div className="flex gap-2">
        <button
          onClick={start}
          className="btn"
          disabled={seconds === 0 || seconds !== inputSeconds}
        >
          Start
        </button>
        <button
          onClick={pause}
          className="btn"
          disabled={seconds === 0 || seconds >= inputSeconds}
        >
          pause
        </button>
        <button onClick={reset} className="btn">
          Reset
        </button>
      </div>
    </main>
  );
}
