//hooks/useCoachData.ts
import { useEffect, useState } from "react";
import type { Coach } from "../models/coach";
import { getAllCoaches } from "../api/coachApi";

export function useCoachData() {
  const [expertise, setExpertise] = useState("");
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await getAllCoaches();
        setCoaches(data);
        setFilteredCoaches(data); //initially show all
      } catch (err: any) {
        setError(err.message || "Error fetching coaches");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //wait 400ms after the last keystroke before updating debouncedExpertise
  useEffect(() => {
    const timer = setTimeout(() => {
      if (expertise.trim() === "") {
        setFilteredCoaches(coaches);
      } else {
        const filtered = coaches.filter((c) =>
          c.expertise.toLowerCase().includes(expertise.toLowerCase())
        );
        setFilteredCoaches(filtered);
      }
    }, 400);

    return () => clearTimeout(timer); //cleanup if user keeps typing
  }, [expertise, coaches]);

  return { isLoading, error, filteredCoaches, setExpertise };
}
