import React, { useState, useEffect } from "react";
import "./App.css";

const GA_ID = "G-R0SSHMLP09"; // Your Google Analytics ID

function App() {
  // Dark mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" || window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Initialize Google Analytics (basic)
  useEffect(() => {
    if (!window.gtag) {
      // Load GA script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `;
      document.head.appendChild(script2);
    }
  }, []);

  // Contact form state and validation
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = "Please enter your name.";
    if (!formData.email.trim()) errors.email = "Please enter your email.";
    else if (!validateEmail(formData.email)) errors.email = "Please enter a valid email.";
    if (!formData.message.trim()) errors.message = "Please enter your message.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormSuccess(false);
      return;
    }

    // Normally here you'd send the form data via API or email service
    // For demo, just show success and reset form
    setFormSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormSuccess(false), 6000);
  };

  return (
    <div className="App">
      <button
        className="toggle-btn"
        aria-label="Toggle dark/light mode"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <header className="header">
        <img
          src="https://avatars.githubusercontent.com/u/145824036?s=400&u=a478a9deee94acd8d88382f40d9179a62436e77c&v=4"
          alt="Portrait of Andrew Otzenberger"
          className="portrait"
          loading="lazy"
        />
        <h1>Andrew Otzenberger</h1>
        <p className="bio">
          Computer Science Student | NAIA Top-25 Tennis Player | Aspiring Software Engineer
        </p>
        <a href="/Andrew_Otzenberger_Resume.pdf" download className="resume-btn" aria-label="Download Resume">
          Download Resume
        </a>
      </header>

      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>
            Computer Science student passionate about the intersection of IT, physics, and data-driven problem solving. Experienced in Python, MATLAB, web scraping, and analytics, with projects spanning scientific computing, data visualization, and IT infrastructure.
            As a nationally ranked NAIA Top-25 tennis player and former NCAA Division I athlete, I bring discipline and problem-solving skills to every project.
            My undergraduate research visualized electric field vectors and potentials in MATLAB, while a visit to CERN deepened my appreciation for large-scale scientific computing. I’ve also developed independent Python-based analytics and web scraping tools to extract actionable insights from real-time data.
            I thrive on solving complex problems, learning new technologies, and applying technical expertise to impactful projects.
          </p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <ul className="cards-list">
            <li className="card" tabIndex={0}>
              <h3>EMP Pulse and Circuit Response Simulator</h3>
              <p>A real-time simulation of electromagnetic pulse (EMP) effects on a digital RC circuit with interactive sliders to explore different parameters.</p>
              <a href="https://github.com/andrewotz/EMP-Pulse-Circuit-Response-Simulator" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
            </li>
            <li className="card" tabIndex={0}>
              <h3>Interactive Quantum Harmonic Oscillator Visualizer</h3>
              <p>Interactive plots of wavefunctions and probability densities of quantum harmonic oscillator energy states, demonstrating fundamental quantum physics concepts.</p>
              <a href="https://github.com/andrewotz/Interactive-Quantum-Harmonic-Oscillator-Visualization" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
            </li>
            <li className="card" tabIndex={0}>
              <h3>Interactive 2D Electric Field Potential Simulator</h3>
              <p>Visualizes electric fields and potential in a 2D plane generated by multiple point charges. Users can dynamically adjust charge positions and magnitudes through an interactive interface, gaining intuitive insight into electrostatic phenomena. Ideal for physics education and exploring fundamental concepts of electromagnetism.</p>
              <a href="https://github.com/andrewotz/Interactive-2D-Electric-Field-Potential-Simulator" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
            </li>
            <li className="card" tabIndex={0}>
              <h3>CERN Particle Simulator</h3>
              <p>A particle collision simulator inspired by CERN experiments, showing particle trajectories and collision effects in real time.</p>
              <a href="https://github.com/andrewotz/CERN-Particle-Simulator" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
            </li>
            <li className="card" tabIndex={0}>
              <h3>Cryptographic Random Coin Flip Demo</h3>
              <p>A demonstration comparing pseudo-random and quantum-random coin flips for a cryptography class presentation.</p>
              <a href="https://github.com/andrewotz/Cryptography-RNG-Comparison-Demo" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub</a>
            </li>
          </ul>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          <ul className="cards-list">
            <li className="card" tabIndex={0}>
              <h3>Undergraduate Researcher - LSU Physics Department</h3>
              <p>Visualized electric field vectors and potentials using MATLAB to support research on electrostatics and electromagnetic theory.</p>
            </li>
            <li className="card" tabIndex={0}>
              <h3>Intern - IT Infrastructure & Analytics</h3>
              <p>Developed Python tools for web scraping and data analysis to support operational insights and decision making.</p>
            </li>
            <li className="card" tabIndex={0}>
              <h3>Volunteer Tutor - Computer Science & Physics</h3>
              <p>Assisted students with coding, algorithm design, and physics concepts in tutoring sessions.</p>
            </li>
            <li className="card" tabIndex={0}>
              <h3>Technical Volunteer - Local Science Outreach</h3>
              <p>Helped organize workshops and demonstrations, teaching basic computational physics and programming.</p>
            </li>
            <li className="card" tabIndex={0}>
              <h3>Peer Mentor - Computer Science Department</h3>
              <p>Guided first-year students through introductory programming assignments and departmental resources.</p>
            </li>
          </ul>
        </section>

        <section id="tennis">
          <h2>Tennis Achievements</h2>
          <ul className="cards-list tennis-list">
            <li className="card" tabIndex={0}>NAIA Men’s Singles Nationally Ranked #24</li>
            <li className="card" tabIndex={0}>Former NCAA Division I Men's Tennis Athlete</li>
            <li className="card" tabIndex={0}>Competitive mindset and discipline from elite college-level sports</li>
          </ul>
        </section>

        <section id="contact">
          <h2>Contact Me</h2>
          <form id="contact-form" noValidate onSubmit={handleSubmit}>
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              aria-required="true"
              aria-describedby="name-error"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <span id="name-error" className="error-message">{formErrors.name}</span>}

            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              aria-required="true"
              aria-describedby="email-error"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span id="email-error" className="error-message">{formErrors.email}</span>}

            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              aria-required="true"
              aria-describedby="message-error"
              value={formData.message}
              onChange={handleInputChange}
            />
            {formErrors.message && <span id="message-error" className="error-message">{formErrors.message}</span>}

            <button type="submit" className="submit-btn">Send Message</button>

            {formSuccess && <div className="success-message" role="alert">Thank you! Your message has been sent.</div>}
          </form>
        </section>
      </main>

      <footer>
        <p>
          © 2025 Andrew Otzenberger |{" "}
          <a href="https://github.com/andrewotz" target="_blank" rel="noopener noreferrer">GitHub</a> |{" "}
          <a href="https://www.linkedin.com/in/andrew-otzenberger-45a753319/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </footer>
    </div>
  );
}

export default App;

