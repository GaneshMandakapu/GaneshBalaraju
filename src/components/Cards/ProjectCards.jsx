import React from 'react';
import styled from 'styled-components';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import useReveal from '../../hooks/useReveal';

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: #131317;
  border: 1px solid rgba(255, 255, 255, 0.07);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 0.3s ease;

  &[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  /* The old card animated a 3D rotate plus two large box-shadows on hover,
     which repainted the whole card. A small lift reads the same and stays on
     the compositor. */
  &:hover {
    transform: translateY(-6px);
    border-color: rgba(229, 9, 20, 0.4);
  }

  &:focus-visible {
    outline: 2px solid #e50914;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #0c0c0f;

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 55%;
    background: linear-gradient(transparent, #131317);
    pointer-events: none;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);

  ${Card}:hover & {
    transform: scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    ${Card}:hover & {
      transform: none;
    }
  }
`;

const FeaturedFlag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #fff;
  background: rgba(229, 9, 20, 0.92);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 22px 22px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 650;
  line-height: 1.3;
  color: #fff;
  margin-bottom: 3px;
`;

const Subtitle = styled.p`
  font-size: 12.5px;
  font-weight: 500;
  color: #e50914;
  margin-bottom: 10px;
`;

const Description = styled.p`
  flex: 1;
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.55);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

const Links = styled.div`
  display: flex;
  gap: 8px;
`;

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.22s ease, border-color 0.22s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    color: #e50914;
    border-color: rgba(229, 9, 20, 0.45);
  }
`;

const DateLabel = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
`;

const More = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  transition: color 0.22s ease;

  svg {
    width: 13px;
    height: 13px;
  }

  ${Card}:hover & {
    color: #e50914;
  }
`;

const ProjectCards = ({ project, setOpenModal, index = 0 }) => {
  const [ref, visible] = useReveal();

  const open = () => setOpenModal({ state: true, project });

  /* Stop link clicks from also triggering the card's modal. */
  const stop = (e) => e.stopPropagation();

  return (
    <Card
      ref={ref}
      data-visible={visible}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
    >
      <Media>
        {project.featured && <FeaturedFlag>Featured</FeaturedFlag>}
        <Image src={project.image} alt="" loading="lazy" decoding="async" />
      </Media>

      <Content>
        <Tags>
          {project.tags?.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {project.tags?.length > 3 && <Tag>+{project.tags.length - 3}</Tag>}
        </Tags>

        <Title>{project.title}</Title>
        {project.subtitle && <Subtitle>{project.subtitle}</Subtitle>}
        <Description>{project.description}</Description>

        <Footer>
          {/* Only render a link when one actually exists — several projects
              previously rendered buttons pointing at the literal string
              "[Link to GitHub repo]". */}
          {project.github || project.webapp ? (
            <Links>
              {project.github && (
                <IconLink
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  aria-label={`${project.title} source on GitHub`}
                >
                  <FiGithub aria-hidden="true" />
                </IconLink>
              )}
              {project.webapp && (
                <IconLink
                  href={project.webapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  aria-label={`${project.title} live site`}
                >
                  <FiExternalLink aria-hidden="true" />
                </IconLink>
              )}
            </Links>
          ) : (
            <DateLabel>{project.date}</DateLabel>
          )}

          <More>
            Details
            <FiArrowUpRight aria-hidden="true" />
          </More>
        </Footer>
      </Content>
    </Card>
  );
};

export default React.memo(ProjectCards);
