import React from 'react';
import styled from 'styled-components';
import { skills } from '../../data/constants';
import { getIcon } from '../../data/icons';
import useReveal from '../../hooks/useReveal';
import { Section, SectionTitle, SectionKicker, SectionLead } from '../shared/Section';

/**
 * Replaces the old 3D keycap grid.
 *
 * That version bound a `mousemove` listener to `window` and called setState on
 * every event, re-rendering all ~30 keycaps continuously while the cursor moved
 * anywhere on the page. Here the only interaction is CSS hover, so React
 * renders this subtree once and never again.
 */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1100px;
  margin-top: 48px;
`;

const Group = styled.div`
  position: relative;
  padding: 28px;
  border-radius: 18px;
  background: rgba(18, 18, 22, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.07);
  opacity: 0;
  transform: translateY(24px);
  /* Composited properties only — no layout or repaint on hover. */
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 0.35s ease, opacity 0.5s ease;

  &[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $accent }) => $accent}55;
  }

  /* Accent rule keyed to the category colour. */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 28px;
    right: 28px;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${({ $accent }) => $accent}, transparent);
    opacity: 0.7;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const GroupTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
  margin-bottom: 20px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 15px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
  cursor: default;

  svg {
    width: 17px;
    height: 17px;
    color: ${({ $color }) => $color};
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ $color }) => $color}66;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const SkillGroup = ({ group, index }) => {
  const [ref, visible] = useReveal();

  return (
    <Group
      ref={ref}
      data-visible={visible}
      $accent={group.accent}
      style={{ transitionDelay: `${Math.min(index, 5) * 70}ms` }}
    >
      <GroupTitle $accent={group.accent}>{group.title}</GroupTitle>
      <Chips>
        {group.skills.map((skill) => {
          const { Icon, color } = getIcon(skill.icon);
          return (
            <Chip key={skill.name} $color={color}>
              <Icon aria-hidden="true" />
              {skill.name}
            </Chip>
          );
        })}
      </Chips>
    </Group>
  );
};

const Skills = () => (
  <Section id="skills">
    <SectionKicker>What I work with</SectionKicker>
    <SectionTitle>Skills &amp; Tooling</SectionTitle>
    <SectionLead>
      CRM and process work on one side, the engineering to automate it on the
      other — I tend to own both ends of a revenue workflow.
    </SectionLead>

    <Grid>
      {skills.map((group, i) => (
        <SkillGroup key={group.title} group={group} index={i} />
      ))}
    </Grid>
  </Section>
);

export default React.memo(Skills);
