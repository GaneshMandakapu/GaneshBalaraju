import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');

  // Get unique categories from projects
  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = toggle === 'all'
    ? projects
    : projects.filter(item => item.category === toggle);

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Featured Projects</Title>
        <Desc>
          A showcase of my work spanning web applications, AI solutions, and mobile development.
          Each project represents a unique challenge and learning experience.
        </Desc>
        <ToggleButtonGroup>
          {categories.map((category, index) => (
            <ToggleButton
              key={index}
              active={toggle === category}
              onClick={() => setToggle(category)}
            >
              {category === 'all' ? '🎯 All' :
                category === 'web app' ? '🌐 Web Apps' :
                  category === 'android app' ? '📱 Mobile' :
                    category === 'data science' ? '📊 Data Science' :
                      category === 'visualization' ? '🎨 Visualization' :
                        category.charAt(0).toUpperCase() + category.slice(1)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <CardContainer>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects