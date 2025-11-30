import { useState } from "react";

export default function NavbarHamburger() {
  const [active, setActive] = useState(false);

  return (
    <>
      {active && (
        <div
          className="hidden text-[2rem]"
          id="hamburger"
          aria-label="Toggle navigation menu"
          onClick={() => setActive((prev) => !prev)}
        >
          ☰
        </div>
      )}
    </>
  );
}
