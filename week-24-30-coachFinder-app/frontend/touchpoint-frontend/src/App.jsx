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
import AppearanceMode from "./pages/dashboard/AppearanceMode";
import EditUserProfile from "./pages/dashboard/EditUserProfile";
import ChangePassword from "./pages/dashboard/ChangePassword";
import WrapperWithTransition from "./components/ui/WrapperWithTransition";

export default function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);
  return (
    <>
      <Router>
        <SessionWatcher />
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route
            path="/home"
            element={
              <WrapperWithTransition>
                <Home />
              </WrapperWithTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <WrapperWithTransition>
                  <Login />
                </WrapperWithTransition>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <WrapperWithTransition>
                <Register />
              </WrapperWithTransition>
            }
          />
          <Route
            path="/coaches"
            element={
              <WrapperWithTransition>
                <CoachList />
              </WrapperWithTransition>
            }
          />
          <Route
            path="/coaches/new"
            element={
              <ProtectedRoute>
                <WrapperWithTransition>
                  <CoachRegistration />
                </WrapperWithTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/:id"
            element={
              <WrapperWithTransition>
                <CoachDetail />
              </WrapperWithTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <WrapperWithTransition>
                  <Dashboard />
                </WrapperWithTransition>
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <WrapperWithTransition>
                  <RoleBasedDashboard />
                </WrapperWithTransition>
              }
            />
            <Route
              path="overview"
              element={
                <WrapperWithTransition>
                  <RoleBasedDashboard />
                </WrapperWithTransition>
              }
            />
            <Route
              path="find"
              element={
                <WrapperWithTransition>
                  <FindCoach />
                </WrapperWithTransition>
              }
            />
            <Route
              path="messages"
              element={
                <WrapperWithTransition>
                  <Messages />
                </WrapperWithTransition>
              }
            />
            <Route path="settings" element={<AccountSettings />}>
              <Route path="appearance" element={<AppearanceMode />} />
              <Route path="edit-profile" element={<EditUserProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
