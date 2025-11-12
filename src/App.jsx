import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  Sun,
  Moon,
  Github,
  Mail,
  GraduationCap,
  Code2,
  Phone,
} from "lucide-react";
import { profile, summary, skills, education } from "./data";

// -------------------- Highlighted Projects Component --------------------
function HighlightedProjects() {
  const projects = [
    {
      title: "Job Junction — Smart Job Portal",
      description:
        "A modern job portal built using HTML, CSS, and JavaScript. It supports job posting, user registration, login, and admin management — with Node.js + MySQL backend.",
      link: "https://github.com/vijayappugowda/job-junction", // ✅ Updated link
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
      color: "from-blue-600 via-indigo-600 to-purple-600",
    },
    {
      title: "Employee Attrition Prediction",
      description:
        "Machine learning model that predicts employee attrition risk. Includes an interactive dashboard for analytics built using Python, SQL, and Power BI.",
      link: "https://github.com/vijayappugowda/employee_attrition_api",
      tech: ["Python", "SQL", "Power BI", "Machine Learning"],
      color: "from-green-400 via-teal-500 to-emerald-600",
    },
    {
      title: "Cybersecurity Dashboard for Web Threats",
      description:
        "Tkinter-based GUI dashboard that performs vulnerability scans, integrates OWASP ZAP API, CVE lookup, and generates PDF security reports.",
      link: "https://github.com/vijayappugowda/CYBERSECURITY-DASHBOARD-FOR-WEB-THREATS",
      tech: ["Python", "Tkinter", "ZAP API", "ReportLab"],
      color: "from-red-500 via-orange-500 to-yellow-500",
    },
    {
      title: "Voice Assistant",
      description:
        "Voice-controlled assistant built with Python for performing automation, API-based tasks, and real-time responses using SpeechRecognition and pyttsx3.",
      link: "https://github.com/vijayappugowda/Voice_assit",
      tech: ["Python", "SpeechRecognition", "API", "Automation"],
      color: "from-pink-500 via-purple-500 to-indigo-600",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const p = projects[index];

  return (
    <motion.div
      key={p.title}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.8 }}
      className={`rounded-2xl p-6 bg-gradient-to-r ${p.color} text-white shadow-xl`}
    >
      <h3 className="text-xl font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm">{p.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transition"
        >
          🔗 View Project
        </a>
      </div>
    </motion.div>
  );
}

// -------------------- Main App --------------------
export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");
  const sectionsRef = useRef({});

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: dark ? "#ffffff" : "#1e1e1e" },
      links: {
        color: dark ? "#9ca3af" : "#6b7280",
        distance: 140,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: { enable: true, speed: 0.9, outModes: "bounce" },
      number: { density: { enable: true, area: 700 }, value: 45 },
      opacity: { value: 0.35 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    const nodes = Object.values(sectionsRef.current);
    nodes.forEach((n) => n && observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = sectionsRef.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const NavItem = ({ id, label }) => (
    <button
      onClick={() => scrollTo(id)}
      className={`px-3 py-2 rounded-md text-sm transition ${
        active === id
          ? "bg-indigo-600 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-700/40"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={dark ? "dark" : ""}>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100 transition-all">
        {/* Background Particles */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />

        {/* Navbar */}
        <nav className="fixed z-30 left-1/2 -translate-x-1/2 top-6 bg-white/10 dark:bg-gray-800/40 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex gap-2 items-center">
          <NavItem id="home" label="Home" />
          <NavItem id="skills" label="Skills" />
          <NavItem id="education" label="Education" />
          <NavItem id="contact" label="Projects" />
          <button
            onClick={() => setDark((d) => !d)}
            className="ml-3 p-1 rounded-md border border-gray-600 hover:bg-gray-200/20 dark:hover:bg-gray-700/40"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Page Content */}
        <div className="relative z-10 max-w-6xl mx-auto p-6">
          {/* HOME */}
          <section
            id="home"
            ref={(el) => (sectionsRef.current.home = el)}
            className="pt-24 pb-8"
          >
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-md">
              {profile.name}
            </h1>
            <p className="text-indigo-400 font-semibold">{profile.title}</p>
            <p className="mt-2 text-sm text-gray-300 max-w-2xl">{summary}</p>

            <div className="flex flex-wrap gap-3 mt-5">
              <span className="px-3 py-1 rounded-full bg-yellow-400 text-black font-semibold">
                🐍 Python
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-semibold">
                🧮 SQL
              </span>
              <span className="px-3 py-1 rounded-full bg-red-500 text-white font-semibold">
                ☕ Java
              </span>
              <span className="px-3 py-1 rounded-full bg-green-400 text-black font-semibold">
                📊 Power BI
              </span>
            </div>

            <div className="flex gap-4 mt-6 text-sm items-center">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:underline"
              >
                <Mail size={16} /> {profile.email}
              </a>
              <span className="flex items-center gap-2">
                <Phone size={14} /> {profile.phone}
              </span>
            </div>
          </section>

          {/* SKILLS */}
          <section
            id="skills"
            ref={(el) => (sectionsRef.current.skills = el)}
            className="py-8"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Code2 className="text-indigo-400" /> Skills
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-indigo-900/40 text-indigo-300 text-sm shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section
            id="education"
            ref={(el) => (sectionsRef.current.education = el)}
            className="py-8"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <GraduationCap className="text-indigo-400" /> Education
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              {education.map((e, i) => (
                <div key={i}>
                  <div className="font-medium">{e.title}</div>
                  <div className="text-xs text-gray-400">
                    {e.school} • {e.year}{" "}
                    {e.grade ? `• ${e.grade}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HIGHLIGHTED PROJECTS */}
          <section
            id="contact"
            ref={(el) => (sectionsRef.current.contact = el)}
            className="py-8 pb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <Code2 className="text-indigo-400" /> Highlighted Projects
              </h2>

              <HighlightedProjects />
            </motion.div>
          </section>

          {/* FOOTER */}
          <footer className="text-center text-xs text-gray-500 mt-12 pb-8">
            © {new Date().getFullYear()} {profile.name} — Built with ❤️ React +
            Tailwind
          </footer>
        </div>
      </div>
    </div>
  );
}
