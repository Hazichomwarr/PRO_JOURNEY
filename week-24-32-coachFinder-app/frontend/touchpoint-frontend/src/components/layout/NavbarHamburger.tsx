//components/layout/NavbarHamburger.tsx
interface Props {
  isOpen: boolean;
  onToggle: any;
}

export default function NavbarHamburger({ onToggle, isOpen }: Props) {
  return (
    <button
      className="text-[2rem] md:hidden"
      id="hamburger"
      aria-label="Toggle navigation menu"
      onClick={onToggle}
    >
      {isOpen ? "✕" : "☰"}
    </button>
  );
}
