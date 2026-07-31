import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import WorkInProgress from "./pages/WorkInProgress";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? (JSON.parse(stored) as boolean) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = darkMode ? "dark" : "light";

  return (
    <div className={`app-shell ${theme}`}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={<Home darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />}
        />
        <Route path="/work-in-progress" element={<WorkInProgress />} />
      </Routes>
    </div>
  );
}

export default App;
