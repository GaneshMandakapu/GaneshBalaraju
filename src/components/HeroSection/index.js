import React from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import styled from 'styled-components';
import { motion } from "framer-motion";
import Hero3DBackground from './Hero3DBackground';

const HeroImage = styled.img`
  width: 100%;
  max-width: 220px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  animation: fadeIn 1.2s ease;

  @media (max-width: 768px) {
    max-width: 140px;
    border-radius: 12px;
  }
  @media (max-width: 480px) {
    max-width: 100px;
    border-radius: 8px;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95);}
    to { opacity: 1; transform: scale(1);}
  }
`;

const HeroSection = () => {
    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <Hero3DBackground />
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
                        <ResumeButton href={Bio.resume} target='display'>Check Resume</ResumeButton>
                        {/* CounterAPI visitor count */}
                        <div style={{ marginTop: '16px', color: '#888', fontSize: '1rem' }}>
                            <div className="counterapi" style={{ minHeight: '44px' }}></div>
                        </div>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                            <HeroImage 
                                src="/HeroImage.jpeg" 
                                alt="hero"
                            />
                        </motion.div>
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>
        </div>
    )
}

export default HeroSection