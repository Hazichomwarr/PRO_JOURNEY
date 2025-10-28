//components/layout/dashboard/Overview.tsx
export default function Overview() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">12</p>
          <p className="text-gray-500">Total Coaches</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">4</p>
          <p className="text-gray-500">Sessions Booked</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-2xl font-bold">89%</p>
          <p className="text-gray-500">Satisfaction</p>
        </div>
      </div>
    </div>
  );
}
