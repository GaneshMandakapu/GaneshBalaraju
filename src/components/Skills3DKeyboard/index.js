import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { skills } from '../../data/constants';

// Keyframes
const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotateX(0deg); }
  50% { transform: translateY(-5px) rotateX(2deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

// Container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 20px;
  min-height: 100vh;
  perspective: 1200px;
  background: radial-gradient(ellipse at 50% 0%, rgba(30, 40, 60, 0.3) 0%, transparent 50%);
`;

const Title = styled.h2`
  font-size: 48px;
  text-align: center;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #E50914 50%, #fff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shine} 4s linear infinite;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: #a0a0a0;
  margin-bottom: 50px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 20px;
    margin-bottom: 30px;
  }
`;

const KeyboardWrapper = styled.div`
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
`;

const KeyboardBase = styled.div`
  background: linear-gradient(145deg, #2a2a30, #1a1a1e);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 
    0 60px 120px rgba(0, 0, 0, 0.7),
    0 0 0 3px rgba(40, 40, 50, 0.8),
    inset 0 2px 0 rgba(255, 255, 255, 0.05),
    inset 0 -2px 0 rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 16px;
  }
  
  @media (max-width: 500px) {
    padding: 10px;
    border-radius: 12px;
  }
`;

const KeyboardRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const KeyRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  
  &:nth-child(even) {
    transform: translateX(25px);
  }
  
  @media (max-width: 768px) {
    gap: 5px;
    
    &:nth-child(even) {
      transform: translateX(15px);
    }
  }
  
  @media (max-width: 500px) {
    gap: 4px;
    
    &:nth-child(even) {
      transform: translateX(12px);
    }
  }
`;

// 3D Keycap styling - mimicking mechanical keyboard keys
const Key = styled.div`
  width: 70px;
  height: 70px;
  background: ${props => props.$color};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 3D keycap effect - the key "body" */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$color};
    border-radius: 10px;
    transform: translateZ(-15px);
    box-shadow: 
      0 15px 0 ${props => props.$darkColor || props.$color}bb,
      0 15px 30px rgba(0, 0, 0, 0.4);
  }
  
  /* Top surface highlight */
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    height: 30%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    border-radius: 8px 8px 50% 50%;
    pointer-events: none;
  }
  
  /* Hover state */
  &:hover {
    transform: translateY(-8px) translateZ(5px);
    filter: brightness(1.1);
    
    &::before {
      box-shadow: 
        0 20px 0 ${props => props.$darkColor || props.$color}bb,
        0 25px 40px rgba(0, 0, 0, 0.5);
    }
  }
  
  /* Active/pressed state */
  &:active {
    transform: translateY(2px) translateZ(-3px);
    
    &::before {
      box-shadow: 
        0 8px 0 ${props => props.$darkColor || props.$color}bb,
        0 10px 20px rgba(0, 0, 0, 0.3);
    }
  }
  
  ${props => props.$isHovered && css`
    animation: ${float} 2s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    
    &::before {
      border-radius: 8px;
      transform: translateZ(-10px);
      box-shadow: 
        0 10px 0 ${props => props.$darkColor || props.$color}bb,
        0 10px 20px rgba(0, 0, 0, 0.4);
    }
  }
  
  @media (max-width: 500px) {
    width: 42px;
    height: 42px;
    border-radius: 6px;
    
    &::before {
      border-radius: 6px;
      transform: translateZ(-8px);
    }
  }
`;

const KeyIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  position: relative;
  z-index: 2;
  transition: transform 0.2s ease;
  
  ${Key}:hover & {
    transform: scale(1.15);
  }
  
  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
  }
  
  @media (max-width: 500px) {
    width: 22px;
    height: 22px;
  }
`;

const Tooltip = styled.div`
  position: fixed;
  background: ${props => props.$color};
  border-radius: 12px;
  padding: 14px 22px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 0 3px rgba(255, 255, 255, 0.2);
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 14px;
  animation: ${pulse} 0.3s ease;
  transform: translate(-50%, -130%);
  
  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-top-color: ${props => props.$color};
  }
`;

const CategoryLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 30px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.$color};
    background: ${props => props.$color}22;
    transform: translateY(-2px);
  }
  
  &::before {
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 5px;
    background: ${props => props.$color};
    box-shadow: 0 3px 8px ${props => props.$color}66;
  }
  
  @media (max-width: 768px) {
    font-size: 11px;
    padding: 8px 12px;
    gap: 6px;
    
    &::before {
      width: 12px;
      height: 12px;
    }
  }
`;

const HintText = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 35px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// Vibrant category colors matching the image style
const categoryColors = {
    'Frontend': { main: '#F7931E', dark: '#C67415' },  // Orange
    'Backend': { main: '#3CC2BD', dark: '#2A9994' },   // Teal/Cyan
    'iOS Development': { main: '#5856D6', dark: '#4341A8' }, // Purple
    'AI & Data Science': { main: '#FF3B30', dark: '#CC2F26' }, // Red
    'Developer Tools & Others': { main: '#34C759', dark: '#28A046' }, // Green
};

// Additional colors for variety
const extraColors = [
    { main: '#FFD60A', dark: '#CCB008' },  // Yellow
    { main: '#007AFF', dark: '#0062CC' },  // Blue
    { main: '#AF52DE', dark: '#8C42B1' },  // Purple
    { main: '#FF9500', dark: '#CC7700' },  // Orange
    { main: '#30D158', dark: '#26A746' },  // Green
];

const Skills3DKeyboard = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 15, y: -5 });
    const keyboardRef = useRef(null);

    // Flatten skills with category info and assign colors
    const allSkills = skills.flatMap((category, catIndex) =>
        category.skills.map((skill, skillIndex) => {
            const catColor = categoryColors[category.title] || extraColors[catIndex % extraColors.length];
            // Cycle through extra colors for variety within category
            const colorIndex = (catIndex * 5 + skillIndex) % extraColors.length;
            const assignedColor = skillIndex % 3 === 0 ? catColor : extraColors[colorIndex];

            return {
                ...skill,
                category: category.title,
                color: assignedColor.main,
                darkColor: assignedColor.dark,
            };
        })
    );

    // Organize into rows (5 keys per row for better visual)
    const rows = [];
    for (let i = 0; i < allSkills.length; i += 5) {
        rows.push(allSkills.slice(i, i + 5));
    }

    // 3D tilt effect on mouse move
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!keyboardRef.current) return;
            const rect = keyboardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const rotateY = ((e.clientX - centerX) / rect.width) * 20;
            const rotateX = ((centerY - e.clientY) / rect.height) * 15 + 15;

            setRotation({ x: rotateX, y: rotateY });
        };

        const handleMouseLeave = () => {
            setRotation({ x: 15, y: -5 });
        };

        const keyboard = keyboardRef.current;
        window.addEventListener('mousemove', handleMouseMove);
        keyboard?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            keyboard?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleKeyHover = (skill, e) => {
        setHoveredSkill(skill);
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    const handleKeyMove = (e) => {
        if (hoveredSkill) {
            setTooltipPos({ x: e.clientX, y: e.clientY });
        }
    };

    return (
        <Container id="skills">
            <Title>Tech Stack</Title>
            <Desc>
                Explore my skills on this 3D keyboard.
                Click or hover the keys to discover my toolkit!
            </Desc>

            <KeyboardWrapper
                ref={keyboardRef}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
            >
                <KeyboardBase>
                    <KeyboardRows>
                        {rows.map((row, rowIndex) => (
                            <KeyRow key={rowIndex}>
                                {row.map((skill, keyIndex) => (
                                    <Key
                                        key={`${rowIndex}-${keyIndex}`}
                                        $color={skill.color}
                                        $darkColor={skill.darkColor}
                                        $isHovered={hoveredSkill?.name === skill.name}
                                        onMouseEnter={(e) => handleKeyHover(skill, e)}
                                        onMouseMove={handleKeyMove}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        <KeyIcon src={skill.image} alt={skill.name} />
                                    </Key>
                                ))}
                            </KeyRow>
                        ))}
                    </KeyboardRows>
                </KeyboardBase>
            </KeyboardWrapper>

            {hoveredSkill && (
                <Tooltip
                    $color={hoveredSkill.color}
                    style={{ left: tooltipPos.x, top: tooltipPos.y }}
                >
                    <img src={hoveredSkill.image} alt={hoveredSkill.name} />
                    {hoveredSkill.name}
                </Tooltip>
            )}

            <HintText>
                <span>⌨️</span> Move mouse to rotate • Hover keys to see skills • Click to press!
            </HintText>

            <CategoryLegend>
                {Object.entries(categoryColors).map(([category, colors]) => (
                    <LegendItem key={category} $color={colors.main}>
                        {category}
                    </LegendItem>
                ))}
            </CategoryLegend>
        </Container>
    );
};

export default Skills3DKeyboard;
