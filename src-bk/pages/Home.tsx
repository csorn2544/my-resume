import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faMoon, faSun, faTimes } from "@fortawesome/free-solid-svg-icons";
import Magnet from "../components/Magnet";
import LogoLoop from "../components/LogoLoop.tsx";
import TiltedCard from "../components/TiltedCard.tsx";

interface HomeProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

interface WorkExperience {
  name: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  color?: string;
}

const WorkInProgressState: React.FC<{ label: string }> = ({ label }) => (
  <div className="wip-state reveal" role="status" aria-live="polite">
    <p className="wip-kicker">{label}</p>
    <h3>Work in Progress</h3>
    <p>This section will appear automatically when real content is available.</p>
  </div>
);

const Home: React.FC<HomeProps> = ({ darkMode, onToggleTheme }) => {
  const theme = darkMode ? "dark" : "light";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navHidden, setNavHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
    ],
    [],
  );

  const footerLogos = useMemo(
    () => [
      {
        node: (
          <span className="footer-logo-glyph" aria-hidden="true">
            <FontAwesomeIcon icon={faGithub} />
          </span>
        ),
        title: "GitHub Pages",
        href: "https://pages.github.com",
      },
      {
        src: `https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png`,
        alt: "Vite",
        title: "Vite",
        href: "https://vite.dev",
      },
      {
        node: (
          <span className="footer-logo-glyph" aria-hidden="true">
            <FontAwesomeIcon icon={faReact} />
          </span>
        ),
        title: "React",
        href: "https://react.dev",
      },
    ],
    [],
  );

  const changelogItems = useMemo(
    () => [
      {
        version: "Migration",
        title: "Parallel Vue 3 build",
        description: "Added a behavior-matched Vue 3 implementation at /vue/ while keeping the React portfolio available for side-by-side validation.",
      },
      {
        version: "Mobile",
        title: "Compact social controls",
        description: "Changed mobile social links to centered icon-only buttons with accessible labels and consistent touch targets.",
      },
      {
        version: "Tablet",
        title: "iPad responsive layouts",
        description: "Refined spacing and hero proportions across iPad Pro, Air, and mini, centered the stacked Air and mini portrait, and softened the light-mode background to reduce glare.",
      },
      {
        version: "Theme",
        title: "Blue gradient system",
        description: "Shifted the site toward the #2563EB and #1E40AF palette and applied the gradient treatment across accents, labels, borders, and controls.",
      },
      {
        version: "Hero",
        title: "Tilted profile card",
        description: "Replaced the static profile image block with a TiltedCard interaction while keeping the portrait loading behavior intact.",
      },
      {
        version: "Social",
        title: "Magnet buttons",
        description: "Added magnetic motion to the hero social links so the primary callouts feel more dynamic without changing the core layout.",
      },
      {
        version: "Footer",
        title: "Powered-by logo loop",
        description: "Integrated the scrolling Powered By logo loop and fixed the Vite asset path usage for static hosting behavior.",
      },
    ],
    [],
  );

  const myInformation = {
    imagePath: "https://github.com/csorn2544.png",
    name: "Chanisorn",
    surname: "Ueasomsaksakul",
    title: "Software Developer",
    company: "Bangkok Bank",
    oneLiner:
      "Building modern web applications with clean UI and great user experiences.",
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
        description:
          "Contributing to software development initiatives and building maintainable solutions for internal and business-facing workflows.",
        technologies: ["TypeScript", "React", "Git"],
        color: "linear-gradient(to right, #2563eb, #1e40af)",
      },
      {
        name: "Ananda Development Public Company Limited",
        position: "IT Intern",
        period: "Nov 2023 - March 2024",
        description:
          "Supported application development tasks and collaborated with teams to improve product quality and delivery speed.",
        technologies: ["JavaScript", "SQL", "REST APIs"],
      },
      {
        name: "National Telecom Public Company Limited",
        position: "Researcher Assistant Intern",
        period: "April 2023 - June 2023",
        description:
          "Assisted with technical research and prototype implementation work for practical telecom-focused use cases.",
        technologies: ["Python", "Networking", "Data Analysis"],
      },
    ] satisfies WorkExperience[],
    skills: [] as string[],
    projects: [] as Array<{
      name: string;
      summary: string;
      stack: string[];
      url?: string;
    }>,
    education: [] as Array<{
      school: string;
      degree: string;
      period: string;
    }>,
  };

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
    if (!revealTargets.length) return;

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    revealTargets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (currentY / scrollableHeight) * 100 : 0;

      setScrollProgress(progress);
      setNavHidden(currentY > lastY && currentY > 120);
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45, rootMargin: "-10% 0px -25% 0px" },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  const handleSectionJump = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
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
    const headerElement = document.querySelector(".header1") as HTMLElement | null;
    if (headerElement) {
      headerElement.style.transform = "none";
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    if (!isDragging) return;

    const deltaX = Math.max(-36, Math.min(36, event.clientX - startPosition.x));
    const deltaY = Math.max(-24, Math.min(24, event.clientY - startPosition.y));
    const headerElement = event.currentTarget as HTMLElement;
    headerElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  return (
    <main className={`portfolio ${theme}`}>
      <div className="background-layer" aria-hidden="true">
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
        <div className="gradient-blob blob-3" />
        <div className="grid-overlay" />
      </div>

      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className={`top-nav ${navHidden ? "hidden" : ""}`}>
        <button className="brand-button" onClick={() => handleSectionJump("home")}>
          CU
        </button>

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => handleSectionJump(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          <button
            className="mobile-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={mobileNavOpen ? faTimes : faBars} />
          </button>
        </div>
      </header>

      {mobileNavOpen ? (
        <div className="mobile-nav-sheet" role="dialog" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleSectionJump(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      <section id="home" className="section hero-section">
        <div className="hero-grid reveal">
          <div className="hero-copy">
            <h1
              className={`header1 ${isDragging ? "grabbing" : ""}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              {myInformation.name}
              <br />
              {myInformation.surname}
            </h1>
            <p className="hero-role">
              {myInformation.title}
              <span>{myInformation.company}</span>
            </p>
            <p className="hero-intro">{myInformation.oneLiner}</p>
            <div className="hero-socials">
              {myInformation.contact.map((contact) => (
                <Magnet
                  key={contact.name}
                  padding={50}
                  magnetStrength={35}
                  wrapperClassName="social-magnet"
                >
                  <a
                    href={contact.url}
                    className="social-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={contact.name}
                  >
                    <FontAwesomeIcon icon={contact.icon} />
                    <span className="social-label">{contact.name}</span>
                  </a>
                </Magnet>
              ))}
            </div>
          </div>

          <div className="hero-image-zone">
            <div className="image-glow" />
            <div className="floating-shape shape-a" />
            <div className="floating-shape shape-b" />
            <div className="portrait-frame">
              {!imgLoaded ? <div className="portrait-skeleton" /> : null}
              <TiltedCard
                imageSrc={myInformation.imagePath}
                altText="Chanisorn Ueasomsaksakul"
                captionText={`${myInformation.name} ${myInformation.surname}`}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip={false}
                imageClassName={`hero-portrait ${imgLoaded ? "loaded" : ""}`}
                onImageLoad={() => setImgLoaded(true)}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="section-heading reveal">
          <h2>About Me</h2>
        </div>
        <div className="about-layout reveal">
          <article className="about-copy">
            <p>{myInformation.objective}</p>
          </article>
          <aside className="about-aside">
            <p>Current Role</p>
            <h3>{myInformation.title}</h3>
            <p>Company</p>
            <h3>{myInformation.company}</h3>
          </aside>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="section-heading reveal">
          <h2>Work Experience</h2>
        </div>
        {myInformation.workExperiences.length > 0 ? (
          <div className="experience-stack reveal">
            {myInformation.workExperiences.map((job, index) => (
              <article key={`${job.name}-${job.period}`} className="experience-row">
                <p className="experience-step">{String(index + 1).padStart(2, "0")}</p>
                <div className="experience-main">
                  <header>
                    <h3>{job.name}</h3>
                    <p>{job.position}</p>
                  </header>
                  <p className="experience-period">{job.period}</p>
                  <p className="experience-description">{job.description}</p>
                  <div className="experience-tech-list">
                    {job.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <WorkInProgressState label="Experience" />
        )}
      </section>

      <footer className="portfolio-footer reveal">
        <div className="section-heading reveal">
          <h2>Powered By</h2>
        </div>
        <div className="footer-loop-shell">
          <LogoLoop
            logos={footerLogos}
            speed={56}
            direction="left"
            logoHeight={28}
            gap={28}
            hoverSpeed={0}
            fadeOut
            fadeOutColor={darkMode ? "#121417" : "#f4f5f7"}
            ariaLabel="Footer credits"
            className="footer-logo-loop"
          />
        </div>
        <div className="footer-changelog reveal">
          <div className="footer-changelog-heading">
            <p>Overall Changelog</p>
          </div>
          <div className="footer-changelog-list">
            {changelogItems.map((item) => (
              <article key={`${item.version}-${item.title}`} className="footer-changelog-item">
                <span>{item.version}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
