import { useState, useRef } from "react";
import { AccordionItem } from "./AccordionItem";

export const Accordion2 = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const buttonRefs = useRef([]);

  const handleClick = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const handleKeyDown = (e, idx) => {
    const itemslength = items.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % itemslength;
      buttonRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + itemslength) % itemslength;
      buttonRefs.current[prev]?.focus();
    }
  };

  return (
    <div className="p-8">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          isOpen={openIndex === idx}
          onClick={() => handleClick(idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          buttonRef={(el) => (buttonRefs.current[idx] = el)}
          id={idx}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
};
