import React from 'react';
import Typewriter from 'typewriter-effect';
import { FiDownload, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Bio, highlights } from '../../data/constants';
import {
  HeroContainer,
  HeroInnerContainer,
  HeroLeftContainer,
  HeroRightContainer,
  StatusBadge,
  Title,
  TextLoop,
  Span,
  SubTitle,
  Tagline,
  Actions,
  PrimaryButton,
  GhostButton,
  QuickLinks,
  QuickLink,
  PortraitWrapper,
  PortraitHalo,
  PortraitRing,
  Portrait,
  HighlightStrip,
  HighlightItem,
} from './HeroStyle';

/**
 * The Spline traffic-light iframe that used to sit behind this section is gone.
 * It pulled several megabytes and opened a second WebGL context on top of the
 * one the site already runs for its background — the single most expensive
 * thing on the page. The shader background plus the static grid here reads the
 * same without the cost.
 */
const HeroSection = () => (
  <>
    <HeroContainer id="about">
      <HeroInnerContainer>
        <HeroLeftContainer>
          <StatusBadge>
            <span aria-hidden="true" />
            {Bio.availability}
          </StatusBadge>

          <Title>
            Hi, I'm
            <br />
            {Bio.name}
          </Title>

          <TextLoop>
            <Span>
              <Typewriter
                options={{
                  strings: Bio.roles,
                  autoStart: true,
                  loop: true,
                  delay: 55,
                  deleteSpeed: 30,
                }}
              />
            </Span>
          </TextLoop>

          <Tagline>{Bio.tagline}</Tagline>
          <SubTitle>{Bio.description}</SubTitle>

          <Actions>
            <PrimaryButton
              href={Bio.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDownload aria-hidden="true" />
              Download Resume
            </PrimaryButton>
            <GhostButton href={`mailto:${Bio.email}`}>
              <FiMail aria-hidden="true" />
              Get in touch
            </GhostButton>
          </Actions>

          <QuickLinks>
            <QuickLink
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <FaGithub aria-hidden="true" />
            </QuickLink>
            <QuickLink
              href={Bio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn aria-hidden="true" />
            </QuickLink>
          </QuickLinks>
        </HeroLeftContainer>

        <HeroRightContainer>
          <PortraitWrapper>
            <PortraitHalo aria-hidden="true" />
            <PortraitRing aria-hidden="true" />
            <Portrait
              src="/HeroImage.jpeg"
              alt={`${Bio.name}, ${Bio.title}`}
              width={320}
              height={320}
              /* Above the fold — must not be lazy, and should be fetched early. */
              fetchpriority="high"
              decoding="async"
            />
          </PortraitWrapper>
        </HeroRightContainer>
      </HeroInnerContainer>
    </HeroContainer>

    <HighlightStrip>
      {highlights.map((item) => (
        <HighlightItem key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </HighlightItem>
      ))}
    </HighlightStrip>
  </>
);

export default React.memo(HeroSection);
