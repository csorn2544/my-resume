import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import "./App.css";

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const theme = darkMode ? "dark" : "light";
  const [plusOneList, setPlusOneList] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [nextId, setNextId] = useState(0);
  const [totalCount, setTotalCount] = useState(() => {
    const cachedCount = localStorage.getItem("plusOneCount");
    return cachedCount ? parseInt(cachedCount) : 0;
  });
  const [showResetModal, setShowResetModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const myInformation = {
    imagePath:
      "https://raw.githubusercontent.com/csorn2544/my-resume/main/src/assets/images/%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%99%E0%B8%B4%E0%B8%AA%E0%B8%B4%E0%B8%95.jpg",
    name: "Chanisorn",
    surname: "Ueasomsaksakul",
    contact: [
      {
        name: "Instagram",
        icon: faInstagram,
        url: "https://www.instagram.com/csorn2544",
      },
      {
        name: "GitHub",
        icon: faGithub,
        url: "https://github.com/csorn2544",
      },
      {
        name: "Linkedin",
        icon: faLinkedin,
        url: "https://www.linkedin.com/in/chanisorn-ueasomsaksakul-329351220/",
      },
    ],
    objective:
      "I am passionate about taking on new challenges that allow me to continually enhance my skills and gain valuable practical experience. With a focus on efficiency and productivity, I am dedicated to making meaningful contributions that benefit both myself and the organization I work with. I am eager to tackle new projects and collaborate with a dynamic team to achieve shared goals.",
      workExperiences: [
        {
          name: "Bangkok Bank",
          position: "Programmer",
          period: "Currently Working Here",
          color: "linear-gradient(to right, #4A90E2, #007AFF)",
        },
        {
          name: "Ananda Development Public Company Limited",
          position: "IT Intern",
          period: "Nov 2023 - March 2024",
          color: "black",
        },
        {
          name: "National Telecom Public Company Limited",
          position: "Researcher Assistant Intern",
          period: "April 2023 - June 2023",
          color: "black",
        },
      ],
  };

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    const id = nextId;

    setNextId(nextId + 1);
    setPlusOneList((prevList) => {
      const newList = [...prevList, { id, x: clientX, y: clientY }];
      if (newList.length > 100) {
        newList.shift(); // Remove the oldest element if length exceeds 100
      }
      return newList;
    });
    setTotalCount((prevCount) => prevCount + 1);

    setTimeout(() => {
      setPlusOneList((prevList) => prevList.filter((item) => item.id !== id));
    }, 1000);
  };

  const handleResetConfirm = () => {
    setTotalCount(0);
    setShowResetModal(false);
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    setIsDragging(true);
    const { clientX, clientY } = event;
    setStartPosition({ x: clientX, y: clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const headerElement = document.querySelector(".header1") as HTMLElement;
    headerElement.style.transform = "none";
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLHeadingElement>) => {
    if (!isDragging) return;

    const { clientX, clientY } = event;

    const container = document.querySelector(".container1") as HTMLElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const maxX = containerWidth - event.currentTarget.offsetWidth;
    const maxY = containerHeight * 0.6 - event.currentTarget.offsetHeight;

    let deltaX = clientX - startPosition.x;
    let deltaY = clientY - startPosition.y;

    deltaX = Math.max(0, Math.min(deltaX, maxX));
    deltaY = Math.max(0, Math.min(deltaY, maxY));

    const headerElement = event.currentTarget as HTMLElement;
    headerElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  return (
    <div className={`home ${theme}`}>
      <div className="row1">
        <div className={`container1 ${theme}`}>
          <h1
            className={`header1 ${isDragging ? "grabbing" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            {myInformation.name} {myInformation.surname}
          </h1>
          <div className="contact-buttons">
            {myInformation.contact.map((contact, index) => (
              <a
                key={index}
                href={contact.url}
                className={`contact-button ${theme}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={contact.icon} className="contact-icon" />{" "}
                {contact.name}
              </a>
            ))}
          </div>
        </div>
        <div className="image-container">
          <img
            src={myInformation.imagePath}
            alt="Student"
            className={`student-image ${isHovered ? "hovered" : ""}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            draggable="false"
          />
          {plusOneList.map((plusOne) => (
            <div
              key={plusOne.id}
              className="plus-one"
              style={{ left: `${plusOne.x}px`, top: `${plusOne.y}px` }}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
          ))}
        </div>
      </div>
      <div className="row2">
        <div className={`container2 ${theme}`}>
          <h1 className="header2">Work Experiences</h1>
          <div className="work-experience-list">
            {myInformation.workExperiences.map((job, index) => (
              <div key={index} className="job-details">
                <p className="job-name">{job.name}</p>
                <p className="job-position">
                  Position:{" "}
                  <span style={{ fontWeight: "bold" }}>{job.position}</span>
                </p>
                <p
                  className="job-period"
                  style={{
                    background: job.color,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {job.period}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`container2 ${theme}`}>
          <h1 className="header2">Objective</h1>
          <p className={`objective-text ${theme}`}>{myInformation.objective}</p>
        </div>
      </div>
      <div
        className={`count-circle ${theme}`}
        onClick={() => setShowResetModal(true)}
      >
        <p>{totalCount}</p>
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
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? "dark" : "light";

  return (
    <div className={`body ${theme}`}>
      <button onClick={toggleDarkMode} className="toggle-btn">
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
      <Home darkMode={darkMode} />
    </div>
  );
}

export default App;
