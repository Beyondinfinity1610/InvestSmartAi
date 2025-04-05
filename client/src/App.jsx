import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import PortfolioSetup from "./pages/PortfolioSetup";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/settings";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings />
          }
        />
        <Route
          path="/portfolio"
          element={
            <Portfolio
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route
          path="/portfolio-setup"
          element={
            <PortfolioSetup
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
