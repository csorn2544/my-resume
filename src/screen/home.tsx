import { useState } from "react";
import "../assets/home.css";
import studentImage from "../assets/images/ไฟล์รูปนิสิต.jpg";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? "dark" : "light"; // Determine theme based on darkMode state

  const myInformation = {
    imagePath: studentImage,
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
        <img src={myInformation.imagePath} alt="Student" className="student-image" />
      </div>
      <div className="row2">
        <div className={`container2 ${theme}`}>
          <h1 className="header1">Work Experiences</h1>
          {myInformation.workExperiences.map((job, index) => (
            <div key={index}>
              <p>{job.name}</p>
              <p>Position: {job.position}</p>
              <p>{job.period}</p>
            </div>
          ))}
        </div>
        <div className={`container2 ${theme}`}>
          <h1 className="header1">Objective</h1>
          <p className="objective-text">{myInformation.objective}</p>
        </div>
      </div>
      <div className="toggle-container">
        <input
          type="checkbox"
          id="darkModeToggle"
          className="toggle-input"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <label htmlFor="darkModeToggle" className="toggle-label">
          Toggle Dark Mode
        </label>
      </div>
    </div>
  );
};

export default Home;
