//utils/navLinkClass.ts
export function navLinkClass(isActive: boolean) {
  return `px-3 py-1.5 rounded-md transition-all duration-300 ${
    isActive
      ? "bg-orange-600 text-white shadow-sm"
      : "hover:bg-orange-500/30 text-gray-200"
  }`;
}
