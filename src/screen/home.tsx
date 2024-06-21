import "../assets/home.css";
import studentImage from "../assets/images/ไฟล์รูปนิสิต.jpg";
import mailImage from "../assets/images/Gmail_icon_(2020).png";
import githubImage from "../assets/images/github-mark.png";
import hobbyImage1 from "../assets/images/hobby1.jpg";
import hobbyImage2 from "../assets/images/hobby2.jpg";
import hobbyImage3 from "../assets/images/hobby3.jpg";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="title-location-container">
        <h2 className="home-title">Chanisorn Ueasomsaksakul</h2>
        <div className="contact-container">
          <div className="mail-container">
            <img src={mailImage} className="mail-image" />
            <p className="mail-text">chanisornueasomsaksakul@gmail.com</p>
          </div>
          <div className="mail-container">
            <img src={githubImage} className="github-image" />
            <p className="github-text">csorn2544</p>
          </div>
        </div>
        <hr className="divider" />
        <div className="objective-container">
          <h2>Objective</h2>
          <p className="objective-text">
            I am passionate about taking on new challenges that allow me to
            continually enhance my skills and gain valuable practical
            experience. With a focus on efficiency and productivity, I am
            dedicated to making meaningful contributions that benefit both
            myself and the organization I work with. I am eager to tackle new
            projects and collaborate with a dynamic team to achieve shared
            goals.
          </p>
        </div>
        <div className="education-container">
          <h2>Education</h2>
          <p className="education-text">
            Kasetsart University Kamphaeng Saen Campus: Nakhon Pathom, Thailand
            <br />
            B.Eng. Faculty of Engineering Major in Computer Engineering
            <br />
            Overall GPA: 3.00
          </p>
        </div>
        <div className="hobbies-container">
      <h2>Hobbies</h2>
      <div className="hobby-container">
        <div className="hobby-item">
          <img src={hobbyImage1} className="hobby-image1" alt="Running" />
          <p className="hobby-text">Running</p>
        </div>
        <div className="hobby-item">
          <img src={hobbyImage2} className="hobby-image2" alt="Reading" />
          <p className="hobby-text">Gunpla Builder</p>
        </div>
        <div className="hobby-item">
          <img src={hobbyImage3} className="hobby-image3" alt="Painting" />
          <p className="hobby-text">Adopting Rabbit</p>
        </div>
      </div>
    </div>
      </div>
      <div className="image-container">
        <img src={studentImage} className="student-image" />
      </div>
    </div>
  );
};

export default Home;
