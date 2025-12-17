import ThemeToggle from "../../components/layout/settings/ThemeToggle";

export default function AppearanceMode() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="font-medium mb-3">Appearance</h2>
        <ThemeToggle />
      </div>
    </div>
  );
}
