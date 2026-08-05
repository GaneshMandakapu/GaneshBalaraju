import React from 'react';
import styled from 'styled-components';
import { FiAward, FiGlobe, FiUsers } from 'react-icons/fi';
import { certifications, languages, volunteering } from '../../data/constants';
import useReveal from '../../hooks/useReveal';
import { Section, SectionTitle, SectionKicker, SectionLead } from '../shared/Section';

/**
 * Certifications, languages and volunteering — all present on the CV but
 * missing from the site until now. Grouped into one section so they read as
 * supporting evidence rather than three thin sections in a row.
 */

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin-top: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  padding: 28px;
  border-radius: 18px;
  background: rgba(18, 18, 22, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.07);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);

  &[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const PanelHead = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: #e50914;
  margin-bottom: 22px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CertList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
`;

const CertItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  transition: border-color 0.25s ease, background 0.25s ease;

  /* The HubSpot RevOps certs are the headline credential for the roles being
     targeted, so they carry the brand tint rather than the neutral treatment. */
  background: ${({ $featured }) =>
    $featured ? 'rgba(255, 122, 89, 0.07)' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid
    ${({ $featured }) => ($featured ? 'rgba(255, 122, 89, 0.28)' : 'rgba(255, 255, 255, 0.06)')};

  &:hover {
    background: ${({ $featured }) =>
      $featured ? 'rgba(255, 122, 89, 0.12)' : 'rgba(255, 255, 255, 0.055)'};
    border-color: ${({ $featured }) =>
      $featured ? 'rgba(255, 122, 89, 0.5)' : 'rgba(229, 9, 20, 0.28)'};
  }
`;

const CertName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.35;

  small {
    display: block;
    margin-top: 3px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Year = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $featured }) => ($featured ? '#FF7A59' : 'rgba(255,255,255,0.65)')};
  background: ${({ $featured }) =>
    $featured ? 'rgba(255, 122, 89, 0.12)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ $featured }) => ($featured ? 'rgba(255, 122, 89, 0.35)' : 'rgba(255, 255, 255, 0.08)')};

  svg {
    width: 11px;
    height: 11px;
  }
`;

const LangList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LangRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LangLabel = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);

  em {
    font-style: normal;
    font-size: 12.5px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.42);
    text-align: right;
  }
`;

const Meter = styled.div`
  position: relative;
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;

  /* Scales along X only, so the fill animation stays on the compositor. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(90deg, #b81d24, #e50914);
    transform: scaleX(${({ $value }) => $value / 100});
    transform-origin: left;
    transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)
      ${({ $delay }) => $delay}ms;
  }

  &[data-visible='false']::after {
    transform: scaleX(0);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`;

const VolunteerCard = styled.div`
  margin-top: 22px;
  padding: 18px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2px;
  }

  p:first-of-type {
    font-size: 13px;
    color: #e50914;
    margin-bottom: 8px;
  }

  p:last-of-type {
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Credentials = () => {
  const [certRef, certVisible] = useReveal();
  const [langRef, langVisible] = useReveal();

  return (
    <Section id="credentials">
      <SectionKicker>Beyond the code</SectionKicker>
      <SectionTitle>Credentials</SectionTitle>
      <SectionLead>
        Certifications, the languages I work in, and where I give time back.
      </SectionLead>

      <Columns>
        <Panel ref={certRef} data-visible={certVisible}>
          <PanelHead>
            <FiAward aria-hidden="true" />
            Certifications
          </PanelHead>
          <CertList>
            {certifications.map((cert) => (
              <CertItem key={cert.name} $featured={cert.featured}>
                <CertName>
                  {cert.name}
                  <small>{cert.issuer}</small>
                </CertName>
                <Year $featured={cert.featured}>{cert.year}</Year>
              </CertItem>
            ))}
          </CertList>
        </Panel>

        <Panel ref={langRef} data-visible={langVisible}>
          <PanelHead>
            <FiGlobe aria-hidden="true" />
            Languages
          </PanelHead>
          <LangList>
            {languages.map((lang, i) => (
              <LangRow key={lang.name}>
                <LangLabel>
                  {lang.name}
                  <em>{lang.level}</em>
                </LangLabel>
                <Meter
                  data-visible={langVisible}
                  $value={lang.proficiency}
                  $delay={i * 120}
                  role="presentation"
                />
              </LangRow>
            ))}
          </LangList>

          <PanelHead style={{ marginTop: 34 }}>
            <FiUsers aria-hidden="true" />
            Volunteering
          </PanelHead>
          {volunteering.map((v) => (
            <VolunteerCard key={v.org} style={{ marginTop: 0 }}>
              <h4>{v.role}</h4>
              <p>{v.org}</p>
              <p>{v.desc}</p>
            </VolunteerCard>
          ))}
        </Panel>
      </Columns>
    </Section>
  );
};

export default React.memo(Credentials);
