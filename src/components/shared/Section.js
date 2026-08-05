import styled from 'styled-components';

/**
 * Shared section chrome. Previously every section re-declared its own title,
 * description and container styles with slightly different values; centralising
 * them keeps vertical rhythm consistent and cuts a lot of duplicated CSS.
 */

export const Section = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 24px;
  scroll-margin-top: 80px;

  @media (max-width: 768px) {
    padding: 72px 18px;
  }
`;

export const SectionKicker = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #e50914;
  margin-bottom: 14px;
`;

export const SectionTitle = styled.h2`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 700;
  color: #fff;
  text-align: center;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
`;

export const SectionLead = styled.p`
  font-size: 17px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
  max-width: 620px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

/**
 * Thin rule between sections. The old version animated a box-shadow glow on a
 * fixed-width bar; this is a static gradient, which costs nothing to paint.
 */
export const Divider = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 1px;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(229, 9, 20, 0.35),
    transparent
  );
`;
