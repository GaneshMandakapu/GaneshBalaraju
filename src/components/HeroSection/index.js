import React, { useEffect, useState } from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';

const HeroSection = () => {
    const [visitorCount, setVisitorCount] = useState(null);

    useEffect(() => {
        // Use CountAPI (https://countapi.xyz/) for free visitor counting
        fetch('https://api.countapi.xyz/hit/ganeshbalaraju.vercel.app/visits')
            .then(res => res.json())
            .then(data => setVisitorCount(data.value))
            .catch(() => setVisitorCount('N/A'));
    }, []);

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
                        <ResumeButton href={Bio.resume} target='display'>Check Resume</ResumeButton>
                        {/* CounterAPI visitor count */}
                        <div style={{ marginTop: '16px', color: '#888', fontSize: '1rem' }}>
                            <div className="counterapi" style={{ minHeight: '44px' }}></div>
                        </div>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <img 
                            src="/HeroImage.jpeg" 
                            alt="hero" 
                            style={{ width: '100%', maxWidth: '350px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }} 
                        />
                    </HeroRightContainer>
                </HeroInnerContainer>

            </HeroContainer>
        </div>
    )
}

export default HeroSection