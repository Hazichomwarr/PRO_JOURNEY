//  App.tsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GuestListPage from "./pages/GuestListPage";
import GuestFormPage from "./pages/GuestFormPage";
import GuestEditPage from "./pages/GuestEditPage";
import Navbar from "./components/Navbar";
import GuestProvider from "./context/GuestProvider";
import { AnimatePresence } from "framer-motion";
import WithPageTransition from "./components/WithPageTransition";

//Wrap pages once  at the top
const GuestListWithTransition = WithPageTransition(GuestListPage);
const GuestFormWithTransition = WithPageTransition(GuestFormPage);
const GuestEditWithTransition = WithPageTransition(GuestEditPage);

export default function App() {
  const location = useLocation();

  return (
    <div className=" min-h-screen flex flex-col bg-slate-50 h-screen">
      <GuestProvider>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<GuestListWithTransition />} />
            <Route path="/guests" element={<GuestListWithTransition />} />
            <Route path="/guests/new" element={<GuestFormWithTransition />} />
            <Route
              path="/guests/:id/update"
              element={<GuestEditWithTransition />}
            />
            <Route
              path="*"
              element={
                <div className="flex justify-center items-center flex-1 text-center text-xl">
                  Page Not found
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </GuestProvider>
    </div>
  );
}
