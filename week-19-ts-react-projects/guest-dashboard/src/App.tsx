import React from "react";
import { Routes, Route } from "react-router-dom";
import GuestListPage from "./pages/GuestListPage";
import GuestFormPage from "./pages/GuestFormPage";
import GuestEditPage from "./pages/GuestEditPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<GuestListPage />} />
        <Route path="/guests" element={<GuestListPage />} />
        <Route path="/guests/new" element={<GuestFormPage />} />
        <Route path="/guests/:id/update" element={<GuestEditPage />} />
        <Route
          path="*"
          element={<React.Fragment>Page Not found</React.Fragment>}
        />
      </Routes>
    </>
  );
}
