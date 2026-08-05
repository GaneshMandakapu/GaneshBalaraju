import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

/**
 * Project detail dialog.
 *
 * Hand-rolled rather than MUI's <Modal> so the site doesn't ship
 * @mui/material + @emotion for one overlay. Keeps the parts that matter:
 * Escape to close, scroll lock, focus moved into the dialog, and a click on the
 * backdrop (but not the panel) dismissing it.
 */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.78);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  }

  @media (max-width: 640px) {
    padding: 0;
    align-items: flex-end;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  overflow-y: auto;
  border-radius: 18px;
  background: #131317;
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
  animation: panelIn 0.26s cubic-bezier(0.2, 0.8, 0.2, 1);

  @keyframes panelIn {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.98);
    }
  }

  @media (max-width: 640px) {
    max-height: 92vh;
    border-radius: 18px 18px 0 0;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  transition: background 0.2s ease;

  svg {
    width: 17px;
    height: 17px;
  }

  &:hover {
    background: rgba(229, 9, 20, 0.85);
  }
`;

const Cover = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
`;

const Body = styled.div`
  padding: 26px 28px 28px;

  @media (max-width: 640px) {
    padding: 22px 20px 24px;
  }
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 3px;
`;

const Subtitle = styled.p`
  font-size: 13.5px;
  font-weight: 500;
  color: #e50914;
  margin-bottom: 6px;
`;

const DateLabel = styled.p`
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 18px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 18px;
`;

const Tag = styled.span`
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
`;

const Desc = styled.p`
  font-size: 14.5px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.62);
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 26px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Action = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  padding: 13px 22px;
  border-radius: 999px;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  ${({ $primary }) =>
    $primary
      ? `
    color: #fff;
    background: linear-gradient(135deg, #E50914, #B81D24);
  `
      : `
    color: rgba(255,255,255,0.85);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
  `}

  &:hover {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const Note = styled.p`
  margin-top: 24px;
  padding: 12px 15px;
  border-radius: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  const panelRef = useRef(null);

  const close = useCallback(
    () => setOpenModal({ state: false, project: null }),
    [setOpenModal]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    // Lock background scroll while the dialog is open, restoring whatever the
    // page had before rather than assuming it was ''.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [close]);

  if (!project) return null;

  const hasLinks = project.github || project.webapp;

  return (
    <Backdrop onClick={close} role="presentation">
      <Panel
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={close} aria-label="Close">
          <FiX aria-hidden="true" />
        </CloseButton>

        {project.image && <Cover src={project.image} alt="" />}

        <Body>
          <Title>{project.title}</Title>
          {project.subtitle && <Subtitle>{project.subtitle}</Subtitle>}
          <DateLabel>{project.date}</DateLabel>

          {project.tags?.length > 0 && (
            <Tags>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
          )}

          <Desc>{project.description}</Desc>

          {/* Both buttons used to render unconditionally, so projects with no
              public link produced anchors pointing at "[Link to GitHub repo]". */}
          {hasLinks ? (
            <Actions>
              {project.github && (
                <Action href={project.github} target="_blank" rel="noopener noreferrer">
                  <FiGithub aria-hidden="true" />
                  View code
                </Action>
              )}
              {project.webapp && (
                <Action
                  $primary
                  href={project.webapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiExternalLink aria-hidden="true" />
                  View live
                </Action>
              )}
            </Actions>
          ) : (
            <Note>
              {project.confidential
                ? 'Internal production system — not publicly accessible. Happy to walk through the architecture and trade-offs on request.'
                : "This project isn't publicly hosted — happy to walk through the code on request."}
            </Note>
          )}
        </Body>
      </Panel>
    </Backdrop>
  );
};

export default ProjectDetails;
