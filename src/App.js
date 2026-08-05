import React, { Suspense, lazy, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { darkTheme } from './utils/Themes.js';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { Divider } from './components/shared/Section';
import './App.css';

/**
 * Everything below the fold is code-split. The hero and navbar are all that's
 * needed for first paint; three.js, GSAP and the remaining sections stream in
 * afterwards instead of blocking the initial bundle.
 */
const WebGLBackground = lazy(() => import('./components/WebGLBackground'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const TrainJourney = lazy(() => import('./components/TrainJourney'));
const Credentials = lazy(() => import('./components/Credentials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

const Body = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow-x: hidden;
  background: transparent;
`;

/**
 * Reserves vertical space while a lazy chunk loads so sections don't pop in and
 * shift the page underneath the reader.
 */
const Placeholder = styled.div`
  min-height: 60vh;
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* The shader background is decorative — never block content on it. */}
      <Suspense fallback={null}>
        <WebGLBackground />
      </Suspense>

      <a className="skip-link" href="#projects">
        Skip to content
      </a>

      <Navbar />

      <Body>
        <HeroSection />

        <Suspense fallback={<Placeholder />}>
          <Divider />
          <Skills />

          <Divider />
          <Projects openModal={openModal} setOpenModal={setOpenModal} />

          <Divider />
          <TrainJourney />

          <Divider />
          <Credentials />

          <Divider />
          <Contact />

          <Footer />

          {openModal.state && (
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </Suspense>
      </Body>
    </ThemeProvider>
  );
}

export default App;
