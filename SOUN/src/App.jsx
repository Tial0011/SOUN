import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import SignupPage from "./Components/SignupPage/SignupPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import StyleDetails from "./Components/StyleDetails/StyleDetails";
import StylesGallery from "./Components/StylesGallery/StylesGallery.jsx";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.email);
      } else {
        console.log("No user detected, redirecting to login...");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "10px",
          backgroundColor: "#f3f3f3",
        }}
      >
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/styles">Styles</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/styles" element={<StylesGallery />} />
        <Route path="/style/:id" element={<StyleDetails />} />
      </Routes>
    </>
  );
}

export default App;
