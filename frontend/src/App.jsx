import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Help from "./pages/Help.jsx";
import Services from "./pages/Services.jsx";
import SalonProfile from "./pages/SalonProfile.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointment from "./pages/Appointment.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Toaster } from "react-hot-toast";

import "./app.css";

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-center" /> {/* Toast notifications */}
      <div className="flex flex-col min-h-screen">
        {/* Render Navbar only on the "/" route */}
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Navbar />
        )}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/help" element={<Help />} />
            <Route path="/services" element={<Services />} />
            <Route path="/salon/:salonId" element={<SalonProfile />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Footer />
        )}
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;
