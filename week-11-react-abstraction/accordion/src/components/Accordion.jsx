import { useState, useRef } from "react";

export const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const buttonRefs = useRef([]);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  function handleKeyDown(e, idx) {
    console.log(e.key);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % items.length;
      buttonRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + items.length) % items.length;
      buttonRefs.current[prev]?.focus();
    }
  }

  //   function handleKeyDown(e, idx) {
  //     if (e.key === "Enter" || e.key === " ") {
  //       e.preventDefault();
  //       toggle(idx);
  //     }
  //   }
  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div key={idx} className="border-b">
            <button
              role="button"
              className="w-full text-left px-4 py-3 font-medium bg-gray-100 hover:bg-gray-200 focus:outline focus:outline-blue-500 focus:outline-2"
              ref={(el) => (buttonRefs.current[idx] = el)}
              onClick={() => toggle(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              aria-expanded={isOpen}
              aria-controls={`section-${idx}`}
              id={`header-${idx}`}
            >
              {item.title}
            </button>

            {isOpen && (
              <div
                className="p-4 bg-white text-gray-700"
                id={`section-${idx}`}
                role="region"
                aria-labelledby={`header-${idx}`}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
