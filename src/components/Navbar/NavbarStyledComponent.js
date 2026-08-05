import styled from 'styled-components';

/**
 * Navbar chrome.
 *
 * `react-router-dom` used to be pulled in purely so the logo could be a <Link>
 * on a single-page site with no routes. It's a plain anchor now, and the router
 * is gone from the render tree entirely.
 */

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 68px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease;

  /* Blur is only switched on once scrolled — an always-on backdrop-filter over
     the animated background costs a full-viewport re-sample every frame. */
  &[data-scrolled='true'] {
    background: rgba(8, 8, 10, 0.82);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom-color: rgba(255, 255, 255, 0.07);
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 18px;
  }
`;

export const NavLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;

  span {
    color: #e50914;
  }
`;

export const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  position: relative;
  display: block;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.62);
  text-decoration: none;
  transition: color 0.22s ease, background 0.22s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }

  /* Active section, driven by the scroll spy. */
  &[aria-current='true'] {
    color: #fff;
  }

  &[aria-current='true']::after {
    content: '';
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 2px;
    height: 2px;
    border-radius: 2px;
    background: #e50914;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const GitHubButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(135deg, #e50914, #b81d24);
  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(229, 9, 20, 0.38);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const MobileIcon = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  cursor: pointer;

  svg {
    width: 19px;
    height: 19px;
  }

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 68px;
  left: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(12, 12, 15, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  transform-origin: top;
  animation: menuIn 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);

  @keyframes menuIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MobileLink = styled.a`
  padding: 13px 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;

  &:hover,
  &[aria-current='true'] {
    color: #fff;
    background: rgba(229, 9, 20, 0.12);
  }
`;
