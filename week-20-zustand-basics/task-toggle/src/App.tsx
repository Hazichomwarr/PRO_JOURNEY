import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import NavBar from "./components/NavBar";

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 h-screen">
      <NavBar />
      <Routes location={location} key={location.pathname}>
        <Route index element={<TaskList />} />
        <Route path={"/tasks"} element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route
          path="*"
          element={
            <div className="text-center text-xl text-gray-500 mt-5">
              Page Not found
            </div>
          }
        />
      </Routes>
    </div>
  );
}
