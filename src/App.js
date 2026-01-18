import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills3DKeyboard from "./components/Skills3DKeyboard";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import TrainJourney from "./components/TrainJourney";
import WebGLBackground from "./components/WebGLBackground";
import styled, { keyframes } from "styled-components";

// Ambient floating particles
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
`;

const AmbientParticle = styled.div`
  position: fixed;
  width: ${props => props.$size || '4px'};
  height: ${props => props.$size || '4px'};
  background: ${props => props.$color || 'rgba(229, 9, 20, 0.5)'};
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: ${floatAnimation} ${props => props.$duration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  top: ${props => props.$top};
  left: ${props => props.$left};
  filter: blur(1px);
`;

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  z-index: 1;
`

// Premium section wrapper with gradient
const GradientWrapper = styled.div`
  background: linear-gradient(
    180deg, 
    rgba(0, 0, 0, 1) 0%, 
    rgba(20, 10, 10, 0.95) 50%, 
    rgba(0, 0, 0, 1) 100%
  );
  width: 100%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.3), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.3), transparent);
  }
`;

// Skills wrapper with unique styling
const SkillsWrapper = styled.div`
  background: radial-gradient(ellipse at center, rgba(229, 9, 20, 0.05) 0%, transparent 70%);
  width: 100%;
  padding: 60px 0;
  position: relative;
`;

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

// Section divider with glow
const SectionDivider = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  
  &::after {
    content: '';
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #E50914, transparent);
    box-shadow: 0 0 20px rgba(229, 9, 20, 0.5);
    border-radius: 2px;
  }
`;

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    duration: `${Math.random() * 4 + 4}s`,
    delay: `${Math.random() * 2}s`,
    color: i % 3 === 0 ? 'rgba(229, 9, 20, 0.3)' : 'rgba(255, 255, 255, 0.2)'
  }));

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        {/* Ambient particles */}
        {particles.map(p => (
          <AmbientParticle
            key={p.id}
            $top={p.top}
            $left={p.left}
            $size={p.size}
            $duration={p.duration}
            $delay={p.delay}
            $color={p.color}
          />
        ))}

        <WebGLBackground />
        <Navbar />
        <Body>
          {/* Hero Section */}
          <Section delay="0.1s">
            <HeroSection />
          </Section>

          {/* Projects Section */}
          <SectionDivider />
          <Section delay="0.2s">
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
          </Section>

          {/* Skills Section with 3D Keyboard */}
          <SectionDivider />
          <SkillsWrapper>
            <Section delay="0.3s">
              <Skills3DKeyboard />
            </Section>
          </SkillsWrapper>

          {/* Journey Map - Experience & Education combined */}
          <SectionDivider />
          <TrainJourney />

          {/* Contact Section */}
          <SectionDivider />
          <GradientWrapper>
            <Section delay="0.4s">
              <Contact />
            </Section>
          </GradientWrapper>

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
