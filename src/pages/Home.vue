<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faMoon,
  faSun,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import LogoLoop from "../components/LogoLoop.vue";
import Magnet from "../components/Magnet.vue";
import TiltedCard from "../components/TiltedCard.vue";
import { useTheme } from "../composables/useTheme";
import type { LogoItem } from "../types/logo";

interface WorkExperience {
  name: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

const { darkMode, toggleTheme } = useTheme();
const theme = computed(() => (darkMode.value ? "dark" : "light"));
const mobileNavOpen = ref(false);
const activeSection = ref("home");
const navHidden = ref(false);
const scrollProgress = ref(0);
const imageLoaded = ref(false);
const isDragging = ref(false);
const headingElement = ref<HTMLHeadingElement | null>(null);
const startPosition = ref({ x: 0, y: 0 });

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
];

const footerLogos: LogoItem[] = [
  {
    icon: faGithub,
    title: "GitHub Pages",
    href: "https://pages.github.com",
  },
  {
    src: "https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png",
    alt: "Vite",
    title: "Vite",
    href: "https://vite.dev",
  },
  {
    icon: faReact,
    title: "React",
    href: "https://react.dev",
  },
];

const changelogItems = [
  {
    version: "Migration",
    title: "Vue 3 migration",
    description: "Promoted the Vue 3 implementation to the primary portfolio while retaining the previous React source as a local backup.",
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
];

const myInformation = {
  imagePath: "https://github.com/csorn2544.png",
  name: "Chanisorn",
  surname: "Ueasomsaksakul",
  title: "Software Developer",
  company: "Bangkok Bank",
  oneLiner: "Building modern web applications with clean UI and great user experiences.",
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
  objective: "I am passionate about taking on new challenges that allow me to continually enhance my skills and gain valuable practical experience. With a focus on efficiency and productivity, I am dedicated to making meaningful contributions that benefit both myself and the organization I work with. I am eager to tackle new projects and collaborate with a dynamic team to achieve shared goals.",
  workExperiences: [
    {
      name: "Bangkok Bank",
      position: "Programmer",
      period: "Currently Working Here",
      description: "Contributing to software development initiatives and building maintainable solutions for internal and business-facing workflows.",
      technologies: ["TypeScript", "React", "Git"],
    },
    {
      name: "Ananda Development Public Company Limited",
      position: "IT Intern",
      period: "Nov 2023 - March 2024",
      description: "Supported application development tasks and collaborated with teams to improve product quality and delivery speed.",
      technologies: ["JavaScript", "SQL", "REST APIs"],
    },
    {
      name: "National Telecom Public Company Limited",
      position: "Researcher Assistant Intern",
      period: "April 2023 - June 2023",
      description: "Assisted with technical research and prototype implementation work for practical telecom-focused use cases.",
      technologies: ["Python", "Networking", "Data Analysis"],
    },
  ] satisfies WorkExperience[],
};

let revealObserver: IntersectionObserver | null = null;
let sectionObserver: IntersectionObserver | null = null;
let lastScrollY = 0;

const handleScroll = () => {
  const currentY = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = scrollableHeight > 0
    ? (currentY / scrollableHeight) * 100
    : 0;
  navHidden.value = currentY > lastScrollY && currentY > 120;
  lastScrollY = currentY;
};

const handleSectionJump = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  mobileNavOpen.value = false;
};

const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true;
  startPosition.value = { x: event.clientX, y: event.clientY };
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !headingElement.value) return;

  const deltaX = Math.max(-36, Math.min(36, event.clientX - startPosition.value.x));
  const deltaY = Math.max(-24, Math.min(24, event.clientY - startPosition.value.y));
  headingElement.value.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
};

const handleMouseUp = () => {
  isDragging.value = false;
  if (headingElement.value) headingElement.value.style.transform = "none";
};

onMounted(() => {
  const revealTargets = document.querySelectorAll<HTMLElement>(".reveal");
  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -12% 0px" },
  );
  revealTargets.forEach((element) => revealObserver?.observe(element));

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { threshold: 0.45, rootMargin: "-10% 0px -25% 0px" },
  );
  navItems.forEach(({ id }) => {
    const section = document.getElementById(id);
    if (section) sectionObserver?.observe(section);
  });

  lastScrollY = window.scrollY;
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  revealObserver?.disconnect();
  sectionObserver?.disconnect();
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <main :class="['portfolio', theme]">
    <div class="background-layer" aria-hidden="true">
      <div class="gradient-blob blob-1" />
      <div class="gradient-blob blob-2" />
      <div class="gradient-blob blob-3" />
      <div class="grid-overlay" />
    </div>

    <div class="scroll-progress" aria-hidden="true">
      <span :style="{ width: `${scrollProgress}%` }" />
    </div>

    <header :class="['top-nav', { hidden: navHidden }]">
      <button class="brand-button" type="button" @click="handleSectionJump('home')">
        CU
      </button>

      <nav class="desktop-nav" aria-label="Primary">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          :class="['nav-item', { active: activeSection === item.id }]"
          @click="handleSectionJump(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="nav-actions">
        <button class="theme-toggle" type="button" aria-label="Toggle color theme" @click="toggleTheme">
          <FontAwesomeIcon :icon="darkMode ? faSun : faMoon" />
        </button>
        <button
          class="mobile-toggle"
          type="button"
          aria-label="Toggle mobile menu"
          @click="mobileNavOpen = !mobileNavOpen"
        >
          <FontAwesomeIcon :icon="mobileNavOpen ? faTimes : faBars" />
        </button>
      </div>
    </header>

    <div v-if="mobileNavOpen" class="mobile-nav-sheet" role="dialog" aria-label="Mobile navigation">
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        @click="handleSectionJump(item.id)"
      >
        {{ item.label }}
      </button>
    </div>

    <section id="home" class="section hero-section">
      <div class="hero-grid reveal">
        <div class="hero-copy">
          <h1
            ref="headingElement"
            :class="['header1', { grabbing: isDragging }]"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseUp"
          >
            {{ myInformation.name }}<br />{{ myInformation.surname }}
          </h1>
          <p class="hero-role">
            {{ myInformation.title }}
            <span>{{ myInformation.company }}</span>
          </p>
          <p class="hero-intro">{{ myInformation.oneLiner }}</p>
          <div class="hero-socials">
            <Magnet
              v-for="contact in myInformation.contact"
              :key="contact.name"
              :padding="50"
              :magnet-strength="35"
              wrapper-class-name="social-magnet"
            >
              <a
                :href="contact.url"
                class="social-btn"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="contact.name"
              >
                <FontAwesomeIcon :icon="contact.icon" />
                <span class="social-label">{{ contact.name }}</span>
              </a>
            </Magnet>
          </div>
        </div>

        <div class="hero-image-zone">
          <div class="image-glow" />
          <div class="floating-shape shape-a" />
          <div class="floating-shape shape-b" />
          <div class="portrait-frame">
            <div v-if="!imageLoaded" class="portrait-skeleton" />
            <TiltedCard
              :image-src="myInformation.imagePath"
              alt-text="Chanisorn Ueasomsaksakul"
              :caption-text="`${myInformation.name} ${myInformation.surname}`"
              container-height="100%"
              container-width="100%"
              image-height="100%"
              image-width="100%"
              :rotate-amplitude="10"
              :scale-on-hover="1.04"
              :show-mobile-warning="false"
              :show-tooltip="false"
              :image-class-name="`hero-portrait ${imageLoaded ? 'loaded' : ''}`"
              @image-load="imageLoaded = true"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section">
      <div class="section-heading reveal">
        <h2>About Me</h2>
      </div>
      <div class="about-layout reveal">
        <article class="about-copy">
          <p>{{ myInformation.objective }}</p>
        </article>
        <aside class="about-aside">
          <p>Current Role</p>
          <h3>{{ myInformation.title }}</h3>
          <p>Company</p>
          <h3>{{ myInformation.company }}</h3>
        </aside>
      </div>
    </section>

    <section id="experience" class="section">
      <div class="section-heading reveal">
        <h2>Work Experience</h2>
      </div>
      <div class="experience-stack reveal">
        <article
          v-for="(job, index) in myInformation.workExperiences"
          :key="`${job.name}-${job.period}`"
          class="experience-row"
        >
          <p class="experience-step">{{ String(index + 1).padStart(2, "0") }}</p>
          <div class="experience-main">
            <header>
              <h3>{{ job.name }}</h3>
              <p>{{ job.position }}</p>
            </header>
            <p class="experience-period">{{ job.period }}</p>
            <p class="experience-description">{{ job.description }}</p>
            <div class="experience-tech-list">
              <span v-for="technology in job.technologies" :key="technology">
                {{ technology }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <footer class="portfolio-footer reveal">
      <div class="section-heading reveal">
        <h2>Powered By</h2>
      </div>
      <div class="footer-loop-shell">
        <LogoLoop
          :logos="footerLogos"
          :speed="56"
          direction="left"
          :logo-height="28"
          :gap="28"
          :hover-speed="0"
          fade-out
          :fade-out-color="darkMode ? '#121417' : '#f4f5f7'"
          aria-label="Footer credits"
          class-name="footer-logo-loop"
        />
      </div>
      <div class="footer-changelog reveal">
        <div class="footer-changelog-heading">
          <p>Overall Changelog</p>
        </div>
        <div class="footer-changelog-list">
          <article
            v-for="item in changelogItems"
            :key="`${item.version}-${item.title}`"
            class="footer-changelog-item"
          >
            <span>{{ item.version }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>
    </footer>
  </main>
</template>
