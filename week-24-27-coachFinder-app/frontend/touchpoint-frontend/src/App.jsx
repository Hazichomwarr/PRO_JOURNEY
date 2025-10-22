import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoachList from "./pages/CoachList";
import CoachDetail from "./pages/CoachDetail";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
// import Navbar from "./components/layout/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Overview from "./components/layout/dashboard/Overview";
import FindCoach from "./pages/dashboard/FindCoach";
import AccountSettings from "./pages/dashboard/AccountSettings";
import Messages from "./pages/dashboard/Messages";

export default function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/home" element={<FindCoach />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coaches" element={<CoachList />} />
          <Route path="/coach/:id" element={<CoachDetail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="overview" element={<Overview />} />
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
