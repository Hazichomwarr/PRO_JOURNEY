//hooks/useCoachData.ts
import { useEffect, useState } from "react";
import type { Coach } from "../models/coach";
import { getAllCoaches, getCoachByExpertise } from "../api/coachApi";

export function useCoachData() {
  const [expertise, setExpertise] = useState("");
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //debounce timer
  const [debouncedExpertise, setDebounceExpertise] = useState(expertise);

  //wait 500ms after the last keystroke before updating debouncedExpertise
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceExpertise(expertise);
    }, 500);

    return () => clearTimeout(timer); //cleanup if user keeps typing
  }, [expertise]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let res: Coach[] = [];

        if (debouncedExpertise.trim()) {
          res = await getCoachByExpertise(debouncedExpertise);
        } else {
          //initial load: all coaches
          res = await getAllCoaches();
        }
        setCoaches(res);
        console.log(coaches);
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message || "Error fetching coaches");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedExpertise]);

  return { isLoading, error, coaches, setExpertise };
}
