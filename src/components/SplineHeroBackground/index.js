import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const orbit = keyframes`
  from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
`;

const SplineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: ${props => props.$interactive ? 'auto' : 'none'};
  overflow: hidden;
  
  /* Gradient overlay for better text readability */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 40%,
      rgba(0, 0, 0, 0.5) 100%
    );
    pointer-events: none;
    z-index: 1;
  }
`;

const SplineIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
`;

// Fallback animated background when no Spline URL is provided
const FallbackBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at 70% 30%,
    rgba(229, 9, 20, 0.15) 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse at 30% 70%,
    rgba(100, 100, 255, 0.08) 0%,
    transparent 40%
  );
  overflow: hidden;
`;

const FloatingOrb = styled.div`
  position: absolute;
  width: ${props => props.$size || '200px'};
  height: ${props => props.$size || '200px'};
  border-radius: 50%;
  background: ${props => props.$color || 'rgba(229, 9, 20, 0.2)'};
  filter: blur(${props => props.$blur || '60px'});
  animation: ${float} ${props => props.$duration || '8s'} ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  top: ${props => props.$top};
  left: ${props => props.$left};
  opacity: ${props => props.$opacity || 0.6};
`;

const OrbitingParticle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #E50914;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-top: -5px;
  margin-left: -5px;
  animation: ${orbit} ${props => props.$duration || '15s'} linear infinite;
  animation-delay: ${props => props.$delay || '0s'};
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.8);
  opacity: ${props => props.$opacity || 0.8};
  
  &::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, rgba(229, 9, 20, 0.5), transparent);
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
  }
`;

const GridPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(229, 9, 20, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(229, 9, 20, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
`;

/**
 * SplineHeroBackground - 3D Spline scene for hero section
 * 
 * Uses iframe embed for reliable Spline integration.
 * You can get the embed URL from Spline:
 * 1. Open your scene in Spline
 * 2. Click Export → Viewer
 * 3. Copy the iframe src URL (my.spline.design/...)
 */
const SplineHeroBackground = ({
  // Default to the traffic light scene, or use fallback if empty
  sceneUrl = "https://my.spline.design/trafficlight-TAmzuiSulsfO5wd2e9VCVgYh/",
  interactive = false,
  className
}) => {
  // If URL provided, use iframe embed
  if (sceneUrl) {
    return (
      <SplineContainer className={className} $interactive={interactive}>
        <SplineIframe
          src={sceneUrl}
          title="3D Scene"
          loading="lazy"
          allow="autoplay"
        />
      </SplineContainer>
    );
  }

  // Fallback animation when no URL
  return (
    <SplineContainer className={className}>
      <FallbackBackground>
        <GridPattern />
        <FloatingOrb
          $size="400px"
          $color="rgba(229, 9, 20, 0.15)"
          $top="10%"
          $left="60%"
          $blur="80px"
          $duration="10s"
        />
        <FloatingOrb
          $size="300px"
          $color="rgba(100, 100, 255, 0.1)"
          $top="50%"
          $left="20%"
          $blur="60px"
          $duration="12s"
          $delay="2s"
        />
        <FloatingOrb
          $size="200px"
          $color="rgba(229, 9, 20, 0.2)"
          $top="70%"
          $left="70%"
          $blur="50px"
          $duration="8s"
          $delay="1s"
        />
        <OrbitingParticle $duration="20s" $delay="0s" $opacity="0.6" />
        <OrbitingParticle $duration="25s" $delay="5s" $opacity="0.4" />
        <OrbitingParticle $duration="30s" $delay="10s" $opacity="0.3" />
      </FallbackBackground>
    </SplineContainer>
  );
};

export default SplineHeroBackground;
