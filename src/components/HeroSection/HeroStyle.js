import styled from "styled-components";
import { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientMove = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.5), 
                0 0 60px rgba(229, 9, 20, 0.2);
  }
  50% { 
    box-shadow: 0 0 50px rgba(229, 9, 20, 0.7), 
                0 0 100px rgba(229, 9, 20, 0.3);
  }
`;

export const HeroContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.9) 0%,
    rgba(10, 10, 10, 0.95) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px 120px;
  min-height: 100vh;
  
  @media (max-width: 960px) {
    padding: 60px 16px 100px;
    min-height: auto;
  }
  
  @media (max-width: 640px) {
    padding: 40px 16px 80px;
  }
  
  z-index: 1;
  overflow: hidden;
  
  /* Subtle grid pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(229, 9, 20, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(229, 9, 20, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }
  
  /* Gradient orb */
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    
    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
      top: 5%;
      right: 0;
    }
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  opacity: 0.4;

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
    opacity: 0.2;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 60px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const HeroLeftContainer = styled.div`
  width: 100%;
  max-width: 600px;
  order: 1;
  animation: ${slideUp} 1s ease-out;
  
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const HeroRightContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  order: 2;
  justify-content: center;
  align-items: center;
  animation: ${slideUp} 1s ease-out 0.2s backwards;
  
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    max-width: 300px;
  }
`;

export const Title = styled.h1`
  font-weight: 800;
  font-size: 56px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  letter-spacing: -1px;
  margin-bottom: 16px;
  
  @media (max-width: 960px) {
    text-align: center;
    font-size: 48px;
  }

  @media (max-width: 640px) {
    font-size: 36px;
    margin-bottom: 12px;
  }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 28px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.5;
  margin-bottom: 24px;
  
  @media (max-width: 960px) {
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: 640px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

export const Span = styled.span`
  background: linear-gradient(90deg, #E50914, #ff6b6b, #E50914);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientMove} 3s ease infinite;
  font-weight: 700;
`;

export const SubTitle = styled.p`
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 36px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 500px;

  @media (max-width: 960px) {
    text-align: center;
    max-width: 100%;
  }

  @media (max-width: 640px) {
    font-size: 15px;
    line-height: 1.6;
  }
`;

export const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  width: 100%;
  max-width: 280px;
  text-align: center;
  padding: 18px 32px;
  color: ${({ theme }) => theme.white};
  border-radius: 60px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #E50914 0%, #B81D24 50%, #E50914 100%);
  background-size: 200% auto;
  box-shadow: 0 10px 40px rgba(229, 9, 20, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    background-position: right center;
    box-shadow: 0 15px 50px rgba(229, 9, 20, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 640px) {
    padding: 14px 28px;
    font-size: 16px;
    max-width: 240px;
  }
`;

export const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 350px;
  border-radius: 50%;
  border: 3px solid rgba(229, 9, 20, 0.5);
  animation: ${glowPulse} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    max-width: 280px;
    max-height: 280px;
  }

  @media (max-width: 640px) {
    max-width: 220px;
    max-height: 220px;
  }
`;
