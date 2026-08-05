import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import ProjectCard from '../Cards/ProjectCards';
import { projects } from '../../data/constants';
import { Section, SectionTitle, SectionKicker, SectionLead } from '../shared/Section';

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 36px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 560px) {
    border-radius: 16px;
  }
`;

const FilterButton = styled.button`
  padding: 9px 20px;
  border: none;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.55)')};
  background: ${({ $active }) => ($active ? '#E50914' : 'transparent')};
  transition: color 0.22s ease, background 0.22s ease;

  &:hover {
    color: #fff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 22px;
  width: 100%;
  max-width: 1100px;
  margin-top: 40px;
`;

const LABELS = {
  all: 'All',
  revops: 'Revenue Ops',
  data: 'Data & AI',
  frontend: 'Frontend',
};

const Projects = ({ setOpenModal }) => {
  const [filter, setFilter] = useState('all');

  const categories = useMemo(
    () => ['all', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    []
  );

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <Section id="projects">
      <SectionKicker>Selected work</SectionKicker>
      <SectionTitle>Projects</SectionTitle>
      <SectionLead>
        Systems and interfaces I've built — from CRM integrations and pipeline
        reporting to research models and frontend work.
      </SectionLead>

      <Filters role="tablist" aria-label="Filter projects by category">
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            role="tab"
            aria-selected={filter === cat}
            $active={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {LABELS[cat] || cat}
          </FilterButton>
        ))}
      </Filters>

      <Grid>
        {visible.map((project, i) => (
          /* Keyed by filter so cards remount and replay their reveal when the
             category changes, instead of appearing already-faded-in. */
          <ProjectCard
            key={`${filter}-${project.id}`}
            project={project}
            index={i}
            setOpenModal={setOpenModal}
          />
        ))}
      </Grid>
    </Section>
  );
};

export default React.memo(Projects);
