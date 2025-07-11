import { useRef, useState } from "react";

export const Tabs = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const childrenArray = Array.isArray(children) ? children : [children];
  const tabRefs = useRef([]);

  function handleKeyDown(e, idx) {
    let newIndex = idx;
    if (e.key === "ArrowRight") {
      newIndex = (idx + 1) % childrenArray.length;
      tabRefs.current[newIndex]?.focus();
    } else if (e.key === "ArrowLeft") {
      newIndex = (idx - 1 + childrenArray.length) % childrenArray.length;
      tabRefs.current[newIndex]?.focus();
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Main Tabs" className="flex gap-2 mb-4">
        {childrenArray.map((children, idx) => (
          <div key={idx} className="flex flex-col items-start">
            <button
              role="tab"
              aria-selected={idx === activeIndex}
              aria-controls={`panel-${idx}`}
              id={`tab-${idx}`}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (tabRefs.current[idx] = el)}
              className={`px-4 py-2 rounded ${
                idx === activeIndex
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {children.props.label}
            </button>
            <button
              onClick={() => {
                document.getElementById(`panel-${idx}`)?.focus();
              }}
              className="sr-only focus:not-sr-only focus:absolute focus:top-full bg-yellow-100 px-2 py-1 mt-1 text-sm"
              aria-labelledby={`tab-${activeIndex}`}
              id={`panel-${activeIndex}`}
            >
              Skip to panel
            </button>
          </div>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`tab-${activeIndex}`}
        id={`panel-${activeIndex}`}
        tabIndex={-1}
        className="p-4 border rounded bg-gray-50 shadow"
      >
        {childrenArray[activeIndex]}
      </div>
    </div>
  );
};
