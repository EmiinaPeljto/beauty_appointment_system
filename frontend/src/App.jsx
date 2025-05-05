import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import "./app.css"
import LogIn from './pages/LogIn.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
