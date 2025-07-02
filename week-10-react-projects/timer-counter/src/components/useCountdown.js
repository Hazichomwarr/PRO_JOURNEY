import { useEffect, useState, useRef } from "react";

export function useCountdown(initialSeconds) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);

  const start = () => {
    if (seconds > 0) setIsRunning(true);
  };

  const pause = () => setIsRunning(!isRunning);

  const reset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Stop automatically when time’s up
  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [seconds]);

  return { seconds, isRunning, start, pause, reset };
}
