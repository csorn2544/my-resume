import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
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

  const myInformation = {
    imagePath: "https://raw.githubusercontent.com/csorn2544/my-resume/main/src/assets/images/%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%99%E0%B8%B4%E0%B8%AA%E0%B8%B4%E0%B8%95.jpg",
    name: "Chanisorn",
    surname: "Ueasomsaksakul",
    contact: [
      {
        name: "Instagram",
        url: "https://www.instagram.com/csorn2544",
      },
      {
        name: "GitHub",
        url: "https://github.com/csorn2544",
      },
    ],
    objective:
      "I am passionate about taking on new challenges that allow me to continually enhance my skills and gain valuable practical experience. With a focus on efficiency and productivity, I am dedicated to making meaningful contributions that benefit both myself and the organization I work with. I am eager to tackle new projects and collaborate with a dynamic team to achieve shared goals.",
    workExperiences: [
      {
        name: "Bangkok Bank",
        position: "Programmer",
        period: "Currently Working Here",
      },
      {
        name: "Ananda Development Public Company Limited",
        position: "IT Intern",
        period: "Nov 2023 - March 2024",
      },
      {
        name: "National Telecom Public Company Limited",
        position: "Researcher Assistant Intern",
        period: "April 2023 - June 2023",
      },
    ],
  };

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    const id = nextId;
    setNextId(nextId + 1);
    setPlusOneList([...plusOneList, { id, x: clientX, y: clientY }]);
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

  return (
    <div className={`home ${theme}`}>
      <div className="row1">
        <div className={`container1 ${theme}`}>
          <h1 className="header1">
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
              +1
            </div>
          ))}
        </div>
      </div>
      <div className="row2">
        <div className={`container2 ${theme}`}>
          <h1 className="header1">Work Experiences</h1>
          <div className="work-experience-list">
            {myInformation.workExperiences.map((job, index) => (
              <div key={index} className="job-details">
                <p className="job-name">{job.name}</p>
                <p className="job-position">Position: {job.position}</p>
                <p className="job-period">{job.period}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`container2 ${theme}`}>
          <h1 className="header1">Objective</h1>
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
