// utils/navLinkClass.ts
export function navLinkClass(isActive: boolean) {
  return isActive
    ? "bg-orange-600 font-medium px-2 py-1 rounded transition-colors duration-300"
    : "hover:bg-orange-400/30 px-2 py-1 rounded transition-colors duration-300";
}
