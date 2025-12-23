import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
// import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(255, 69, 0, 0.15) 0%, rgba(255, 69, 0, 0) 50%), linear-gradient(141.27deg, rgba(0, 121, 211, 0) 50%, rgba(0, 121, 211, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`

const Section = styled.div`
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: ${({ delay }) => delay || '0s'};

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router >
        <Navbar />
        <Body>
          <Section delay="0.1s">
            <HeroSection />
          </Section>

          <Section delay="0.2s">
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
          </Section>

          <Section delay="0.3s">
            <Wrapper>
              <Skills />
            </Wrapper>
          </Section>

          <Section delay="0.4s">
            <Experience />
          </Section>

          <Section delay="0.5s">
            <Wrapper>
              <Education />
            </Wrapper>
          </Section>

          <Section delay="0.6s">
            <Contact />
          </Section>

          <Footer />
          
          {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
