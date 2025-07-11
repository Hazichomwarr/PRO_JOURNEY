export const AccordionItem = ({
  isOpen,
  onClick,
  onKeyDown,
  buttonRef,
  id,
  title,
  content,
}) => {
  return (
    <div className="w-[50%] bg-gray-100 shadow my-3 mx-auto hover:bg-gray-200">
      <button
        className="w-full px-6 py-2 font-medium focus:outline-green-500"
        aria-expanded={isOpen}
        aria-controls={`section-${id}`}
        id={`header-${id}`}
        onKeyDown={onKeyDown}
        onClick={onClick}
        ref={buttonRef}
      >
        {title}
      </button>

      {isOpen && (
        <div
          className="bg-white p-6 text-center"
          id={`section-${id}`}
          aria-labelledby={`header-${id}`}
          role="region"
        >
          " {content} "
        </div>
      )}
    </div>
  );
};
