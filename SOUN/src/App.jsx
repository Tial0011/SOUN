import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupPage from "./Components/SignupPage/SignupPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
