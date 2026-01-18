import React from 'react'
import styled, { keyframes } from 'styled-components'
import { skills } from '../../data/constants'

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 20px;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`

export const Title = styled.h2`
  font-size: 48px;
  text-align: center;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #E50914 50%, #fff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shine} 4s linear infinite;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 20px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  justify-items: center;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.9), rgba(15, 15, 18, 0.95));
  border: 1px solid rgba(229, 9, 20, 0.2);
  border-radius: 20px;
  padding: 28px 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Glowing top border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20%;
    right: 20%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #E50914, transparent);
    border-radius: 2px;
  }
  
  /* Ambient glow */
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(229, 9, 20, 0.08) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(229, 9, 20, 0.5);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(229, 9, 20, 0.15);
    
    &::after {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    max-width: 100%;
  }
`

const SkillTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &::after {
    content: '';
    flex: 1;
    max-width: 60px;
    height: 1px;
    background: linear-gradient(90deg, rgba(229, 9, 20, 0.5), transparent);
  }
  
  &::before {
    content: '';
    flex: 1;
    max-width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.5));
  }
`

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`

const SkillItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    border-color: rgba(229, 9, 20, 0.5);
    background: rgba(229, 9, 20, 0.1);
    transform: translateY(-3px);
    animation: ${float} 2s ease-in-out infinite;
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 12px;
  }
`

const SkillImage = styled.img`
  width: 26px;
  height: 26px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
  
  ${SkillItem}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`

const CategoryIcon = styled.span`
  font-size: 24px;
  margin-right: 4px;
`;

const getCategoryIcon = (title) => {
  switch (title.toLowerCase()) {
    case 'frontend': return '🎨';
    case 'backend': return '⚙️';
    case 'ios development': return '📱';
    case 'ai & data science': return '🤖';
    case 'developer tools & others': return '🛠️';
    default: return '💻';
  }
};

const Skills = () => {
  return (
    <Container id="skills">
      <Wrapper>
        <Title>Tech Stack</Title>
        <Desc>
          Technologies and tools I work with to bring ideas to life.
          From frontend to backend, AI to mobile development.
        </Desc>
        <SkillsContainer>
          {skills.map((skill, index) => (
            <Skill key={index}>
              <SkillTitle>
                <CategoryIcon>{getCategoryIcon(skill.title)}</CategoryIcon>
                {skill.title}
              </SkillTitle>
              <SkillList>
                {skill.skills.map((item, idx) => (
                  <SkillItem key={idx}>
                    <SkillImage src={item.image} alt={item.name} loading="lazy" />
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </Skill>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills