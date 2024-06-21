import "../assets/home.css";

const Home = () => {
  const myInformation = {
    name: "Chanisorn",
    surname: "Ueasomsaksakul",
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
    <div className="home">
      <div className="row">
        <div className="container">
          <h1 className="header1">
            {myInformation.name} {myInformation.surname}
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <h1>Work Experiences</h1>
          {myInformation.workExperiences.map((job, index) => (
            <div key={index}>
              <p>{job.name}</p>
              <p>Position: {job.position}</p>
              <p>{job.period}</p>
            </div>
          ))}
        </div>
        <div className="container">
          <h1>Objective</h1>
          <p className="objective-text">{myInformation.objective}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
