import React from "react";

export default function CoachDashboard() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Coach Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold">8</p>
          <p className="text-gray-700">Active Clients</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold">14</p>
          <p className="text-gray-700">Sessions Completed</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold">92%</p>
          <p className="text-gray-700">Clients Satisfaction</p>
        </div>
      </div>
    </section>
  );
}
