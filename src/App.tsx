import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import WorkInProgress from "./pages/WorkInProgress";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
  const stored = localStorage.getItem("darkMode");
  return stored ? JSON.parse(stored) : false;
});
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);
  const handleResetConfirm = () => {
    setTotalCount(0);
    setShowResetModal(false);
  };
  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  

  const theme = darkMode ? "light" : "dark";

  return (
    <div className={`body ${theme}`}>
      <div className="top-right-controls">
        <div>
          <button
            className="toggle-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </div>
        {/* Navbar toggle below dark mode toggle */}
        <div>
          <button onClick={toggleNavbar} aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div
          className={`count-circle ${theme}`}
          onClick={() => setShowResetModal(true)}
        >
          <p>{totalCount}</p>
        </div>
      </div>

      {showResetModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Reset count?</p>
            <div className="modal-buttons">
              <button onClick={handleResetConfirm}>Yes</button>
              <button onClick={handleResetCancel}>No</button>
            </div>
          </div>
        </div>
      )}
      {navbarOpen && (
        <>
          <div className="navbar-backdrop" onClick={closeNavbar}></div>
          <div className="side-navbar">
            <button
              className="close-navbar"
              onClick={closeNavbar}
              aria-label="Close navigation"
              style={{ float: "right", marginBottom: 10 }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div
              className="navbar-links-vertical"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                width: "100%",
              }}
            >
              <NavLink to="/home" className="nav-link" onClick={closeNavbar}>
                Home
              </NavLink>
              <NavLink
                to="/work-in-progress"
                className="nav-link"
                onClick={closeNavbar}
              >
                Work In Progress
              </NavLink>
            </div>
          </div>
        </>
      )}
      {/* Main content */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <Home
              darkMode={darkMode}
              setTotalCount={setTotalCount}
              showResetModal={showResetModal}
              setShowResetModal={setShowResetModal}
              handleResetConfirm={handleResetConfirm}
              handleResetCancel={handleResetCancel}
            />
          }
        />
        <Route path="/work-in-progress" element={<WorkInProgress />} />
      </Routes>
      <footer className={`footer ${theme}`}>
        <p>Powered By GitHub Pages</p>
        <div className="tech-icons">
          <img
            src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png"
            alt="Vite logo"
            className="tech-icon"
          />
          +
          <img
            src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png"
            alt="React logo"
            className="tech-icon"
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
