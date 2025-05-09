import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navbar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'; // Import Footer component

import "./app.css";

import Help from './pages/Help.jsx';

function App() {
  const location = useLocation(); // Get the current route

  return (
    <div className="flex flex-col min-h-screen">
      {/* Render Navbar only on the "/" route */}
      {location.pathname === '/' && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/help" element={<Help />} /> {/* Assuming Help is the same as Home */}
        </Routes>
      </div>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}

    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;