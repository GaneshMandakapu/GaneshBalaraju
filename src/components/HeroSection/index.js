import React from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import styled from 'styled-components';

const HeroImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: floatIn 1.2s ease-out;
  
  @keyframes floatIn {
    0% { 
      opacity: 0; 
      transform: translateY(30px) scale(0.9);
    }
    60% {
      transform: translateY(-5px) scale(1.02);
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) scale(1);
    }
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 220px;
  border-radius: 50%;
  box-shadow: 0 10px 40px rgba(255, 69, 0, 0.4), 
              0 0 0 8px rgba(255, 69, 0, 0.1);
  border: 4px solid rgba(255, 69, 0, 0.3);
  transition: all 0.4s ease;
  object-fit: cover;
  aspect-ratio: 1/1;

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 15px 50px rgba(255, 69, 0, 0.6), 
                0 0 0 12px rgba(255, 69, 0, 0.15);
    border-color: rgba(255, 69, 0, 0.5);
  }

  @media (max-width: 768px) {
    max-width: 180px;
    box-shadow: 0 8px 30px rgba(255, 69, 0, 0.3), 
                0 0 0 6px rgba(255, 69, 0, 0.1);
    border: 3px solid rgba(255, 69, 0, 0.3);
  }
  
  @media (max-width: 480px) {
    max-width: 140px;
    box-shadow: 0 6px 20px rgba(255, 69, 0, 0.3), 
                0 0 0 4px rgba(255, 69, 0, 0.1);
    border: 2px solid rgba(255, 69, 0, 0.3);
  }
`;

const HeroSection = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer >
          <HeroLeftContainer id="Left">
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
            <ResumeButton href={Bio.resume} target='display'>Get Resume</ResumeButton>
            {/* CounterAPI visitor count */}
            <div style={{ marginTop: '16px', color: '#888', fontSize: '1rem' }}>
              <div className="counterapi" style={{ minHeight: '44px' }}></div>
            </div>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <HeroImageContainer>
              <HeroImage
                src="/HeroImage.jpeg"
                alt="Ganesh Balaraju - Full Stack Developer"
              />
            </HeroImageContainer>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  )
}

export default HeroSection