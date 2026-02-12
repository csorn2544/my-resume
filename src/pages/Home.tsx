import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

interface HomeProps {
  darkMode: boolean;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  showResetModal: boolean;
  setShowResetModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetConfirm: () => void;
  handleResetCancel: () => void;
}

const Home: React.FC<HomeProps> = ({ darkMode, setTotalCount }) => {
  const theme = darkMode ? "light" : "dark";
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [plusOneList, setPlusOneList] = useState<
    {
      emoji: ReactNode;
      id: number;
      x: number;
      y: number;
    }[]
  >([]);
  const [nextId, setNextId] = useState(0);
  const emojiList = [
    "👍",
    "🎉",
    "🔥",
    "💯",
    "🚀",
    "😄",
    "👏",
    "✨",
    "🥳",
    "😎",
  ];
  const myInformation = {
    imagePath:
      "https://github.com/csorn2544.png",
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
        color: "linear-gradient(to right, #2563eb, #1e40af)",
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

  // handleResetConfirm and handleResetCancel are now props
  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const { clientX, clientY } = event;
    const id = nextId;
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    setNextId(nextId + 1);
    setPlusOneList((prevList) => {
      const newList = [
        ...prevList,
        { id, x: clientX, y: clientY, emoji: randomEmoji },
      ];
      if (newList.length > 100) {
        newList.shift();
      }
      return newList;
    });
    setTotalCount((prevCount) => prevCount + 1);

    setTimeout(() => {
      setPlusOneList((prevList) => prevList.filter((item) => item.id !== id));
    }, 1000);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
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
                draggable="false"
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
            alt="Profile Image"
            className={`profile-image ${isHovered ? "hovered" : ""}`}
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
              {plusOne.emoji}
            </div>
          ))}
        </div>
      </div>
      <div className="row2">
        <div className={`container2 ${theme}`}>
          <h1 className="header2">Work Experiences</h1>
          <div className="work-experience-list">
            {myInformation.workExperiences.map((job, index) => (
              <div
                key={index}
                className="job-details"
                style={
                  {
                    "--job-color": job.color,
                  } as React.CSSProperties
                }
              >
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
    </div>
  );
};

export default Home;
