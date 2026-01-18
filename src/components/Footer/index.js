import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Bio } from '../../data/constants';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const FooterContainer = styled.footer`
  width: 100%;
  padding: 60px 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.95) 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.3), transparent);
  }
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Logo = styled.h2`
  font-weight: 800;
  font-size: 28px;
  background: linear-gradient(135deg, #fff, #E50914);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`;

const TagLine = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.6;
  max-width: 300px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #E50914;
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  transition: all 0.3s ease;
  text-decoration: none;
  
  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
  
  &:hover {
    background: rgba(229, 9, 20, 0.1);
    border-color: rgba(229, 9, 20, 0.5);
    color: #E50914;
    transform: translateY(-3px);
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  margin-bottom: 30px;
`;

const BottomBar = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 6px;
  
  span {
    color: #E50914;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const MadeWith = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E50914, #B81D24);
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(229, 9, 20, 0.4);
  transition: all 0.3s ease;
  z-index: 100;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(20px)')};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(229, 9, 20, 0.6);
  }
`;

function Footer() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <BrandSection>
            <Logo>Ganesh Balaraju</Logo>
            <TagLine>
              Full Stack Developer & AI Enthusiast based in Berlin, Germany.
              Building digital experiences that make a difference.
            </TagLine>
            <SocialIcons>
              <SocialIcon href={Bio.github} target="_blank" title="GitHub">
                <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              </SocialIcon>
              <SocialIcon href={Bio.linkedin} target="_blank" title="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </SocialIcon>
            </SocialIcons>
          </BrandSection>

          <FooterSection>
            <SectionTitle>Quick Links</SectionTitle>
            <FooterLink href="#about">→ About</FooterLink>
            <FooterLink href="#skills">→ Skills</FooterLink>
            <FooterLink href="#projects">→ Projects</FooterLink>
            <FooterLink href="#journey">→ Experience</FooterLink>
            <FooterLink href="#contact">→ Contact</FooterLink>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Resources</SectionTitle>
            <FooterLink href={Bio.resume} target="_blank">→ Resume</FooterLink>
            <FooterLink href={Bio.github} target="_blank">→ GitHub</FooterLink>
            <FooterLink href={Bio.linkedin} target="_blank">→ LinkedIn</FooterLink>
          </FooterSection>
        </FooterContent>

        <Divider />

        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} Ganesh Balaraju. All rights reserved.
          </Copyright>
          <MadeWith>
            Made with <span>❤️</span> in Berlin
          </MadeWith>
        </BottomBar>
      </FooterContainer>

      <BackToTop $visible={showBackToTop} onClick={scrollToTop} title="Back to top">
        ↑
      </BackToTop>
    </>
  );
}

export default Footer;