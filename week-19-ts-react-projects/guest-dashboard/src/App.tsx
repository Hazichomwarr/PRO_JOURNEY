import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GuestListPage from "./pages/GuestListPage";
import GuestFormPage from "./pages/GuestFormPage";
import GuestEditPage from "./pages/GuestEditPage";
import Navbar from "./components/Navbar";
import GuestProvider from "./context/GuestProvider";
import { AnimatePresence } from "framer-motion";
import WithPageTransition from "./components/WithPageTransition";

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-slate-50 h-screen">
      <GuestProvider>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={WithPageTransition(GuestListPage)()} />
            <Route
              path="/guests"
              element={WithPageTransition(GuestListPage)()}
            />
            <Route
              path="/guests/new"
              element={WithPageTransition(GuestFormPage)()}
            />
            <Route
              path="/guests/:id/update"
              element={WithPageTransition(GuestEditPage)()}
            />
            <Route
              path="*"
              element={
                <div className="text-center text-lg">Page Not found</div>
              }
            />
          </Routes>
        </AnimatePresence>
      </GuestProvider>
    </div>
  );
}
