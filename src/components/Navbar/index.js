import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavItems,
  NavLink,
  ButtonContainer,
  GitHubButton,
  MobileIcon,
  MobileMenu,
  MobileLink,
} from './NavbarStyledComponent';

/**
 * Every entry here resolves to a section that actually exists. Previously
 * "Experience" and "Education" pointed at #experience and #education, but those
 * components had been replaced by the combined journey section — both links
 * were dead.
 */
const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('about');
  const sentinelRef = useRef(null);

  /* Scrolled state via a sentinel element rather than a scroll listener —
     no work happens on the main thread while scrolling. */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Scroll spy. One observer watches every section; the entry nearest the top
     of the viewport wins. */
  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-64px 0px -55% 0px', threshold: 0 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
    /* Sections mount lazily, so re-run once more after first paint to pick up
       any that weren't in the DOM yet. */
  }, [scrolled]);

  const go = useCallback((e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    // Explicit smooth scroll: `scroll-behavior: smooth` was removed from the
    // stylesheet because it fights GSAP's scrub in the journey section.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <div ref={sentinelRef} style={{ position: 'absolute', top: 0, height: 1, width: 1 }} />
      <Nav data-scrolled={scrolled}>
        <NavbarContainer>
          <NavLogo href="#about" onClick={(e) => go(e, 'about')}>
            Ganesh<span>.</span>
          </NavLogo>

          <NavItems>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <NavLink
                  href={`#${id}`}
                  aria-current={active === id}
                  onClick={(e) => go(e, id)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </NavItems>

          <ButtonContainer>
            <GitHubButton href={Bio.github} target="_blank" rel="noopener noreferrer">
              <FaGithub aria-hidden="true" />
              GitHub
            </GitHubButton>
          </ButtonContainer>

          <MobileIcon
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </MobileIcon>

          {open && (
            <MobileMenu>
              {SECTIONS.map(({ id, label }) => (
                <MobileLink
                  key={id}
                  href={`#${id}`}
                  aria-current={active === id}
                  onClick={(e) => go(e, id)}
                >
                  {label}
                </MobileLink>
              ))}
              <GitHubButton
                href={Bio.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 8, justifyContent: 'center' }}
              >
                <FaGithub aria-hidden="true" />
                GitHub
              </GitHubButton>
            </MobileMenu>
          )}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default React.memo(Navbar);
