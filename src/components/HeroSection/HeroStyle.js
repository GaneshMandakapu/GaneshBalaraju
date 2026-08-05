import styled, { keyframes, css } from 'styled-components';

/**
 * Hero styles.
 *
 * Animation rule applied throughout: only `transform` and `opacity` are
 * animated, since those run on the compositor. The previous version looped a
 * multi-layer `box-shadow` on the portrait (`glowPulse`), which forced a repaint
 * of a large blurred area every frame for the entire time the page was open.
 */

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const gradientMove = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
`;

/** Opacity-only pulse — composited, unlike an animated box-shadow. */
const haloPulse = keyframes`
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50%      { opacity: 0.75; transform: scale(1.06); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/** Entrance animations are opt-out under prefers-reduced-motion. */
export const enter = (delay = '0s') => css`
  animation: ${slideUp} 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay} backwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const HeroContainer = styled.header`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 120px 24px 80px;
  overflow: hidden;
  scroll-margin-top: 80px;

  /* Static grid — painted once, never animated. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(229, 9, 20, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(229, 9, 20, 0.035) 1px, transparent 1px);
    background-size: 54px 54px;
    mask-image: radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%);
    pointer-events: none;
  }

  @media (max-width: 960px) {
    min-height: auto;
    padding: 110px 18px 64px;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1180px;
  gap: 64px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 44px;
  }
`;

export const HeroLeftContainer = styled.div`
  width: 100%;
  max-width: 620px;
  order: 1;

  @media (max-width: 960px) {
    order: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const HeroRightContainer = styled.div`
  display: flex;
  order: 2;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  ${enter('0.15s')}

  @media (max-width: 960px) {
    order: 1;
  }
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 15px 7px 12px;
  margin-bottom: 22px;
  font-size: 13px;
  font-weight: 500;
  color: #ff5a63;
  background: rgba(229, 9, 20, 0.08);
  border: 1px solid rgba(229, 9, 20, 0.25);
  border-radius: 999px;
  ${enter()}

  /* Status dot. Opacity-only pulse. */
  span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #46d160;
    box-shadow: 0 0 8px #46d160;
    animation: ${haloPulse} 2.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const Title = styled.h1`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(38px, 7vw, 64px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 18px;
  ${enter('0.05s')}
`;

export const TextLoop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: clamp(19px, 3vw, 28px);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 22px;
  min-height: 1.5em; /* Reserve space so the typewriter can't shift layout. */
  ${enter('0.1s')}

  @media (max-width: 960px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const Span = styled.span`
  background: linear-gradient(90deg, #e50914, #ff6b6b, #e50914);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientMove} 4s ease infinite;
  font-weight: 700;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/** One-line positioning statement, sits between the typewriter and the bio. */
export const Tagline = styled.p`
  font-size: 17px;
  font-weight: 500;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.82);
  max-width: 560px;
  margin-bottom: 14px;
  ${enter('0.13s')}

  @media (max-width: 640px) {
    font-size: 15.5px;
  }
`;

export const SubTitle = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.52);
  max-width: 560px;
  margin-bottom: 34px;
  ${enter('0.15s')}

  @media (max-width: 960px) {
    max-width: 100%;
  }

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  ${enter('0.2s')}

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 15px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease,
    border-color 0.25s ease;

  &:active {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const PrimaryButton = styled.a`
  ${buttonBase};
  color: #fff;
  background: linear-gradient(135deg, #e50914, #b81d24);
  box-shadow: 0 8px 28px rgba(229, 9, 20, 0.32);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 38px rgba(229, 9, 20, 0.45);
  }
`;

export const GhostButton = styled.a`
  ${buttonBase};
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.28);
  }
`;

export const QuickLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 26px;
  ${enter('0.25s')}

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const QuickLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.25s ease, color 0.25s ease, border-color 0.25s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    transform: translateY(-3px);
    color: #e50914;
    border-color: rgba(229, 9, 20, 0.5);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

/* ---------------------------------------------------------------- portrait */

export const PortraitWrapper = styled.div`
  position: relative;
  width: clamp(220px, 32vw, 320px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
`;

/**
 * Soft glow behind the portrait. Sits on its own layer and animates opacity +
 * scale only, so it never triggers a repaint of the image itself.
 */
export const PortraitHalo = styled.div`
  position: absolute;
  inset: -12%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(229, 9, 20, 0.55) 0%, transparent 68%);
  filter: blur(26px);
  animation: ${haloPulse} 5s ease-in-out infinite;
  will-change: opacity, transform;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.5;
  }
`;

export const PortraitRing = styled.div`
  position: absolute;
  inset: -7%;
  border-radius: 50%;
  border: 1px dashed rgba(229, 9, 20, 0.35);
  animation: ${spin} 26s linear infinite;
  pointer-events: none;

  /* Bead riding the ring. */
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    border-radius: 50%;
    background: #e50914;
    box-shadow: 0 0 12px rgba(229, 9, 20, 0.9);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Portrait = styled.img`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(229, 9, 20, 0.45);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: scale(1.03);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

/* -------------------------------------------------------------- highlights */

export const HighlightStrip = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 90px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 1px;
    padding-bottom: 64px;
  }
`;

export const HighlightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 22px 12px;
  text-align: center;
  border-left: 1px solid rgba(255, 255, 255, 0.07);

  &:first-child {
    border-left: none;
  }

  strong {
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 700;
    line-height: 1;
    background: linear-gradient(135deg, #fff, #e50914);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span {
    font-size: 13px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.45);
    max-width: 15ch;
  }

  @media (max-width: 700px) {
    &:nth-child(odd) {
      border-left: none;
    }
  }
`;
