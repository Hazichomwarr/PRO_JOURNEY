import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoachList from "./pages/CoachList";
import CoachDetail from "./pages/CoachDetail";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import FindCoach from "./pages/dashboard/FindCoach";
import AccountSettings from "./pages/dashboard/AccountSettings";
import Messages from "./pages/dashboard/Messages";
import CoachRegistration from "./pages/CoachRegistration";
import PublicRoute from "./components/layout/PublicRoute";
import RoleBasedDashboard from "./components/layout/dashboard/RoleBasedDashboard";
import SessionWatcher from "./components/SessionWatcher";
import React from "react";

export default function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);
  return (
    <Router>
      <SessionWatcher />
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/coaches" element={<CoachList />} />
          <Route
            path="/coaches/new"
            element={
              <ProtectedRoute>
                <CoachRegistration />
              </ProtectedRoute>
            }
          />
          <Route path="/coach/:id" element={<CoachDetail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<RoleBasedDashboard />} />
            <Route path="overview" element={<RoleBasedDashboard />} />
            <Route path="find" element={<FindCoach />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
