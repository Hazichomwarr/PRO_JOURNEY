import { useState, useEffect } from "react";
import type { UserPublic } from "../store/userStore";
import { buddyApi } from "../api/buddyApi";

export function useFindBuddy() {
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState<UserPublic[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const res = await buddyApi.search(filters); // implement this
      if (!mounted) return;
      setResults(res || []);
      setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [filters]);

  return { results, isLoading, setFilters };
}
