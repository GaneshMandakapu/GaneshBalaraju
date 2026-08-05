import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { FiArrowUp, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Bio } from '../../data/constants';

const Wrapper = styled.footer`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 70px 24px 30px;
  background: linear-gradient(180deg, transparent, rgba(8, 8, 10, 0.9));
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 44px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
    gap: 34px;
  }
`;

const Brand = styled.div`
  @media (max-width: 760px) {
    grid-column: 1 / -1;
  }
`;

const Logo = styled.p`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 21px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;

  span {
    color: #e50914;
  }
`;

const Tagline = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.45);
  max-width: 330px;
  margin-bottom: 20px;
`;

const Socials = styled.div`
  display: flex;
  gap: 10px;
`;

const Social = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  transition: transform 0.22s ease, color 0.22s ease, border-color 0.22s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    transform: translateY(-3px);
    color: #e50914;
    border-color: rgba(229, 9, 20, 0.45);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const Column = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const ColumnTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4px;
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.62);
  text-decoration: none;
  width: fit-content;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #e50914;
    transform: translateX(3px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: 46px auto 0;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
`;

const BackToTop = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 90;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #e50914, #b81d24);
  box-shadow: 0 8px 26px rgba(229, 9, 20, 0.4);
  /* Toggled with opacity/transform rather than mount/unmount so showing it
     never triggers layout. */
  opacity: 0;
  transform: translateY(14px) scale(0.9);
  pointer-events: none;
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);

  svg {
    width: 18px;
    height: 18px;
  }

  &[data-visible='true'] {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
  }

  @media (max-width: 640px) {
    right: 16px;
    bottom: 16px;
  }
`;

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
];

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const sentinelRef = useRef(null);

  /* The old implementation ran an unthrottled scroll listener that called
     setState on every scroll event. A sentinel does the same job with no
     main-thread work while scrolling. */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowTop(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toTop = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  return (
    <>
      {/* Marks ~600px down the page; once it scrolls out of view, show the button. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{ position: 'absolute', top: 600, height: 1, width: 1 }}
      />

      <Wrapper>
        <Inner>
          <Brand>
            <Logo>
              Ganesh Balaraju<span>.</span>
            </Logo>
            <Tagline>
              {Bio.title} based in {Bio.location}. {Bio.tagline}
            </Tagline>
            <Socials>
              <Social
                href={Bio.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <FaGithub aria-hidden="true" />
              </Social>
              <Social
                href={Bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <FaLinkedinIn aria-hidden="true" />
              </Social>
              <Social href={`mailto:${Bio.email}`} aria-label="Send an email">
                <FiMail aria-hidden="true" />
              </Social>
            </Socials>
          </Brand>

          <Column aria-label="Site sections">
            <ColumnTitle>Explore</ColumnTitle>
            {LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </Column>

          <Column aria-label="Resources">
            <ColumnTitle>Resources</ColumnTitle>
            <FooterLink href={Bio.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </FooterLink>
            <FooterLink href={Bio.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </FooterLink>
            <FooterLink href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </FooterLink>
            <FooterLink href={`mailto:${Bio.email}`}>Email</FooterLink>
          </Column>
        </Inner>

        <Bottom>
          <span>© {new Date().getFullYear()} Ganesh Balaraju</span>
          <span>Built with React · Berlin</span>
        </Bottom>
      </Wrapper>

      <BackToTop data-visible={showTop} onClick={toTop} aria-label="Back to top">
        <FiArrowUp aria-hidden="true" />
      </BackToTop>
    </>
  );
};

export default React.memo(Footer);
