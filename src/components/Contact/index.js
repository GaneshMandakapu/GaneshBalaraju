import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { FiMapPin, FiMail, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { Section, SectionTitle, SectionKicker, SectionLead } from '../shared/Section';

const EMAILJS = {
  serviceId: 'service_x7ech4b',
  templateId: 'template_nv7k7mj',
  publicKey: 'SybVGsYS52j2TfLbi',
};

const Layout = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 22px;
  width: 100%;
  max-width: 1000px;
  margin-top: 48px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  padding: 30px;
  border-radius: 18px;
  background: rgba(18, 18, 22, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.07);
`;

const InfoRow = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-of-type {
    border-bottom: none;
  }

  svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
    color: #e50914;
  }
`;

const InfoText = styled.div`
  min-width: 0;

  small {
    display: block;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.35);
    margin-bottom: 3px;
  }

  strong {
    display: block;
    font-size: 14.5px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    word-break: break-word;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

const Social = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.22s ease, color 0.22s ease, border-color 0.22s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    transform: translateY(-3px);
    color: #e50914;
    border-color: rgba(229, 9, 20, 0.45);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const fieldStyles = `
  width: 100%;
  padding: 14px 16px;
  border-radius: 11px;
  font-size: 14.5px;
  font-family: inherit;
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.2s ease, background 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.32);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(229, 9, 20, 0.6);
  }
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Textarea = styled.textarea`
  ${fieldStyles};
  resize: vertical;
  min-height: 130px;
`;

const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 4px;
  padding: 15px 28px;
  border: none;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #e50914, #b81d24);
  transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(229, 9, 20, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover:not(:disabled) {
      transform: none;
    }
  }
`;

/**
 * Replaces MUI's Snackbar — @mui/material plus @emotion was a very large
 * dependency to ship for a single toast.
 */
const Toast = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 13px 16px;
  border-radius: 11px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $error }) => ($error ? '#ff8a8a' : '#7ee2a8')};
  background: ${({ $error }) => ($error ? 'rgba(255,59,48,0.1)' : 'rgba(52,199,89,0.1)')};
  border: 1px solid
    ${({ $error }) => ($error ? 'rgba(255,59,48,0.3)' : 'rgba(52,199,89,0.3)')};

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });

    emailjs
      .sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, EMAILJS.publicKey)
      .then(() => {
        formRef.current?.reset();
        setStatus({ state: 'sent', message: 'Thanks — your message is on its way.' });
      })
      .catch(() => {
        // The previous handler only console.logged failures, so a message that
        // never sent looked identical to success from the visitor's side.
        setStatus({
          state: 'error',
          message: `Something went wrong. You can email me directly at ${Bio.email}.`,
        });
      });
  }, []);

  const sending = status.state === 'sending';

  return (
    <Section id="contact">
      <SectionKicker>Say hello</SectionKicker>
      <SectionTitle>Get in touch</SectionTitle>
      <SectionLead>
        Open to frontend roles and freelance work. I usually reply within a day.
      </SectionLead>

      <Layout>
        <Panel>
          <InfoRow as="div">
            <FiMapPin aria-hidden="true" />
            <InfoText>
              <small>Location</small>
              <strong>{Bio.location}</strong>
            </InfoText>
          </InfoRow>
          <InfoRow href={`mailto:${Bio.email}`}>
            <FiMail aria-hidden="true" />
            <InfoText>
              <small>Email</small>
              <strong>{Bio.email}</strong>
            </InfoText>
          </InfoRow>
          <InfoRow href={`tel:${Bio.phone.replace(/\s/g, '')}`}>
            <FiPhone aria-hidden="true" />
            <InfoText>
              <small>Phone</small>
              <strong>{Bio.phone}</strong>
            </InfoText>
          </InfoRow>

          <Socials>
            <Social
              href={Bio.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <FaGithub aria-hidden="true" />
            </Social>
            <Social
              href={Bio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn aria-hidden="true" />
            </Social>
            <Social href={`mailto:${Bio.email}`} aria-label="Send an email">
              <FiMail aria-hidden="true" />
            </Social>
          </Socials>
        </Panel>

        <Panel>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Row>
              <Input name="from_name" placeholder="Your name" autoComplete="name" required />
              <Input
                name="from_email"
                type="email"
                placeholder="Your email"
                autoComplete="email"
                required
              />
            </Row>
            <Input name="subject" placeholder="Subject" required />
            <Textarea name="message" placeholder="Your message" required />

            <Submit type="submit" disabled={sending}>
              <FiSend aria-hidden="true" />
              {sending ? 'Sending…' : 'Send message'}
            </Submit>

            <div role="status" aria-live="polite">
              {status.message && (
                <Toast $error={status.state === 'error'}>
                  {status.state === 'error' ? (
                    <FiAlertCircle aria-hidden="true" />
                  ) : (
                    <FiCheckCircle aria-hidden="true" />
                  )}
                  {status.message}
                </Toast>
              )}
            </div>
          </Form>
        </Panel>
      </Layout>
    </Section>
  );
};

export default React.memo(Contact);
