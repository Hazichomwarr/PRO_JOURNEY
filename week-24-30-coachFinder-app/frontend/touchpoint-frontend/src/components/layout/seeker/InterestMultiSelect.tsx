import { useState, useMemo, useRef, useEffect } from "react";

interface Props {
  allOptions: string[]; // All interests available
  value: string[]; // Selected interests
  onChange: (v: string[]) => void;
  placeholder?: string;
}

export default function InterestMultiSelect({
  allOptions,
  value,
  onChange,
  placeholder = "Add interest...",
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter interests based on search
  const filtered = useMemo(() => {
    return allOptions.filter(
      (opt) =>
        opt.toLowerCase().includes(query.toLowerCase()) && !value.includes(opt)
    );
  }, [query, allOptions, value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const add = (item: string) => {
    onChange([...value, item]);
    setQuery("");
    setOpen(false);
  };

  const remove = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div ref={containerRef} className="w-full">
      {/* Selected Chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {item}
            <button
              onClick={() => remove(item)}
              className="text-blue-700 hover:text-blue-900"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Input Field */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Dropdown */}
        {open && filtered.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filtered.map((opt) => (
              <li
                key={opt}
                onClick={() => add(opt)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
