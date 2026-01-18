import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 20px;
  
  @media (max-width: 960px) {
    padding: 60px 20px;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 20px;
`

const Title = styled.h2`
  font-size: 48px;
  text-align: center;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #E50914 50%, #fff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shine} 4s linear infinite;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 20px;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  max-width: 900px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(229, 9, 20, 0.4);
    background: rgba(229, 9, 20, 0.05);
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const InfoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #E50914, #B81D24);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const ContactForm = styled.form`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(15, 15, 18, 0.98));
  padding: 36px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  gap: 16px;
  position: relative;
  overflow: hidden;
  
  /* Decorative gradient */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #E50914, #ff6b6b, #E50914);
    background-size: 200% auto;
    animation: ${shine} 3s linear infinite;
  }
  
  @media (max-width: 768px) {
    padding: 28px;
  }
`

const ContactTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 10px;
`

const ContactSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ContactInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 18px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    border-color: rgba(229, 9, 20, 0.5);
    background: rgba(229, 9, 20, 0.03);
    box-shadow: 0 0 20px rgba(229, 9, 20, 0.1);
  }
  
  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 18px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    border-color: rgba(229, 9, 20, 0.5);
    background: rgba(229, 9, 20, 0.03);
    box-shadow: 0 0 20px rgba(229, 9, 20, 0.1);
  }
  
  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(135deg, #E50914 0%, #B81D24 50%, #E50914 100%);
  background-size: 200% auto;
  padding: 16px 24px;
  margin-top: 8px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(229, 9, 20, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 20px;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: rgba(229, 9, 20, 0.1);
    border-color: rgba(229, 9, 20, 0.5);
    color: #E50914;
    transform: translateY(-3px);
    animation: ${float} 2s ease-in-out infinite;
  }
`;

const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_x7ech4b', 'template_nv7k7mj', form.current, 'SybVGsYS52j2TfLbi')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Get In Touch</Title>
        <Desc>
          Have a project in mind or want to discuss opportunities?
          I'd love to hear from you!
        </Desc>
        <ContactWrapper>
          <ContactInfo>
            <InfoCard>
              <InfoIcon>📍</InfoIcon>
              <InfoText>
                <InfoLabel>Location</InfoLabel>
                <InfoValue>Berlin, Germany</InfoValue>
              </InfoText>
            </InfoCard>
            <InfoCard>
              <InfoIcon>💼</InfoIcon>
              <InfoText>
                <InfoLabel>Status</InfoLabel>
                <InfoValue>Open to opportunities</InfoValue>
              </InfoText>
            </InfoCard>
            <InfoCard>
              <InfoIcon>⚡</InfoIcon>
              <InfoText>
                <InfoLabel>Response Time</InfoLabel>
                <InfoValue>Within 24 hours</InfoValue>
              </InfoText>
            </InfoCard>
            <SocialLinks>
              <SocialLink href="https://github.com/GaneshMandakapu" target="_blank" title="GitHub">
                <span>📦</span>
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/ganeshbalaraju/" target="_blank" title="LinkedIn">
                <span>💼</span>
              </SocialLink>
              <SocialLink href="mailto:ganeshbalaraju@example.com" title="Email">
                <span>✉️</span>
              </SocialLink>
            </SocialLinks>
          </ContactInfo>

          <ContactForm ref={form} onSubmit={handleSubmit}>
            <ContactTitle>Send a Message 💬</ContactTitle>
            <ContactSubtitle>Fill out the form and I'll get back to you soon.</ContactSubtitle>
            <InputGroup>
              <ContactInput placeholder="Your Name" name="from_name" required />
              <ContactInput placeholder="Your Email" name="from_email" type="email" required />
            </InputGroup>
            <ContactInput placeholder="Subject" name="subject" required />
            <ContactInputMessage placeholder="Your Message" rows="4" name="message" required />
            <ContactButton type="submit">
              Send Message <span>🚀</span>
            </ContactButton>
          </ContactForm>
        </ContactWrapper>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="✨ Message sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  )
}

export default Contact