import React from 'react'
import SplineHeroBackground from '../SplineHeroBackground'
import { HeroContainer, HeroBg, HeroLeftContainer, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(1deg); }
  75% { transform: translateY(4px) rotate(-1deg); }
`;

const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.4),
                0 0 60px rgba(229, 9, 20, 0.2),
                0 20px 60px rgba(0, 0, 0, 0.5);
  }
  50% { 
    box-shadow: 0 0 50px rgba(229, 9, 20, 0.6),
                0 0 100px rgba(229, 9, 20, 0.3),
                0 30px 80px rgba(0, 0, 0, 0.6);
  }
`;

const rotateRing = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const HeroImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${floatAnimation} 6s ease-in-out infinite;
`;

const HeroImageRing = styled.div`
  position: absolute;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  border-radius: 50%;
  border: 2px dashed rgba(229, 9, 20, 0.3);
  animation: ${rotateRing} 20s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background: #E50914;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.8);
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 280px;
  border-radius: 50%;
  animation: ${glowPulse} 4s ease-in-out infinite;
  border: 4px solid rgba(229, 9, 20, 0.4);
  transition: all 0.4s ease;
  object-fit: cover;
  aspect-ratio: 1/1;
  position: relative;
  z-index: 2;

  &:hover {
    transform: scale(1.05);
    border-color: rgba(229, 9, 20, 0.8);
  }

  @media (max-width: 768px) {
    max-width: 220px;
  }
  
  @media (max-width: 480px) {
    max-width: 180px;
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(229, 9, 20, 0.1);
  border: 1px solid rgba(229, 9, 20, 0.3);
  border-radius: 50px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #E50914;
  font-weight: 500;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #46D160;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
  
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const QuickLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 20px;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: rgba(229, 9, 20, 0.1);
    border-color: rgba(229, 9, 20, 0.5);
    color: #E50914;
    transform: translateY(-3px);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const HeroSection = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <SplineHeroBackground
            sceneUrl="https://my.spline.design/trafficlight-TAmzuiSulsfO5wd2e9VCVgYh/"
          />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <StatusBadge>Available for opportunities</StatusBadge>
            <Title>Hi, I am <br /> {Bio.name}</Title>
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{Bio.description}</SubTitle>
            <ResumeButton href={Bio.resume} target='_blank' rel="noopener noreferrer">
              📄 Download Resume
            </ResumeButton>
            <QuickLinks>
              <QuickLink href={Bio.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              </QuickLink>
              <QuickLink href={Bio.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </QuickLink>
            </QuickLinks>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <HeroImageWrapper>
              <HeroImageRing />
              <HeroImage
                src="/HeroImage.jpeg"
                alt="Ganesh Balaraju - Full Stack Developer"
              />
            </HeroImageWrapper>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  )
}

export default HeroSection