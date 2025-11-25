import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import SessionWatcher from "./components/SessionWatcher";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PublicRoute from "./components/layout/PublicRoute";
import WrapperWithTransition from "./components/ui/WrapperWithTransition";

// Layouts
import Navbar from "./components/layout/Navbar";
import DashboardLayout from "./components/layout/dashboard/DashboardLayout";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Coach pages
import FindCoach from "./pages/dashboard/FindCoach";
import CoachDetail from "./pages/CoachDetail";
import CoachRegistration from "./pages/CoachRegistration";

// User pages
import UserProfile from "./pages/user/UserProfile";

// Dashboard pages
import RoleBasedDashboard from "./components/layout/dashboard/RoleBasedDashboard";
import Messages from "./pages/dashboard/Messages";
import AccountSettings from "./pages/dashboard/AccountSettings";
import AppearanceMode from "./pages/dashboard/AppearanceMode";
import EditUserProfile from "./pages/dashboard/EditUserProfile";
import ChangePassword from "./pages/dashboard/ChangePassword";
import DeleteAccount from "./pages/dashboard/DeleteAccount";

// Sessions
import SessionRegistration from "./pages/sessions/SessionRegistration";

export default function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  // Restore auth session on load
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <Router>
      <SessionWatcher />

      {/* Static navigation */}
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <WrapperWithTransition>
              <Home />
            </WrapperWithTransition>
          }
        />

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
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/request-password-reset"
          element={<RequestPasswordReset />}
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
          path="/user/:id"
          element={
            <WrapperWithTransition>
              <UserProfile />
            </WrapperWithTransition>
          }
        />

        {/* DASHBOARD ROUTES (static layout + animated pages) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout /> {/* ⬅️ Stays mounted, does NOT animate */}
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

          {/* SETTINGS */}
          <Route path="settings" element={<AccountSettings />}>
            <Route
              path="appearance"
              element={
                <WrapperWithTransition>
                  <AppearanceMode />
                </WrapperWithTransition>
              }
            />
            <Route
              path="edit-profile"
              element={
                <WrapperWithTransition>
                  <EditUserProfile />
                </WrapperWithTransition>
              }
            />
            <Route
              path="change-password"
              element={
                <WrapperWithTransition>
                  <ChangePassword />
                </WrapperWithTransition>
              }
            />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Route>
        </Route>

        {/* Sessions routes */}
        <Route path="/sessions/new" element={<SessionRegistration />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <WrapperWithTransition>
              <NotFound />
            </WrapperWithTransition>
          }
        />
      </Routes>
    </Router>
  );
}
