import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Home from "./screen/home";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? "dark" : "light";

  return (
    <Router>
      <div className={`body ${theme}`}>
        <button onClick={toggleDarkMode} className="toggle-btn">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>

        <Routes>
          <Route path="/" element={<Home darkMode={darkMode}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
