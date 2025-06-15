import React from 'react'
import styled from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';
import { GaneshBalaraju } from '../../data/constants';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0px 80px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 80px 0;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const HorizontalTimeline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  width: 100%;
  overflow-x: auto;
`;

const TimelineStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
`;

const TimelineDotBus = styled.div`
  width: 28px;
  height: 28px;
  background: #854CE6;
  border-radius: 50%;
  border: 4px solid #fff;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const TimelineLine = styled.div`
  height: 4px;
  background: #854CE6;
  flex: 1;
  margin: 0 4px;
`;

const index = () => {
    // Only use experiences for the vertical timeline
    return (
        <Container id="experience">
            <Wrapper>
                <Title>Experience</Title>
                <TimelineSection>
                    <Timeline>
                        {experiences.map((item, idx) => (
                            <TimelineItem key={item.year || item.id || idx}>
                                <TimelineSeparator>
                                    <TimelineDot
                                        variant="outlined"
                                        color="secondary"
                                    />
                                    {idx !== experiences.length - 1 && (
                                        <TimelineConnector style={{ background: '#854CE6' }} />
                                    )}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <ExperienceCard experience={item} />
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </TimelineSection>

                {/* Horizontal "bus" timeline at the bottom */}
                <Title style={{ marginTop: 48, fontSize: 28 }}>My Journey</Title>
                <HorizontalTimeline>
                  {GaneshBalaraju.map((item, idx) => (
                    <React.Fragment key={item.year}>
                      <TimelineStep>
                        <TimelineDotBus>{idx + 1}</TimelineDotBus>
                        <div style={{ fontWeight: 600, fontSize: 16 }}>{item.year}</div>
                        <div style={{ fontSize: 14, color: "#888", textAlign: "center", marginTop: 4 }}>{item.text}</div>
                      </TimelineStep>
                      {idx !== GaneshBalaraju.length - 1 && <TimelineLine />}
                    </React.Fragment>
                  ))}
                </HorizontalTimeline>
            </Wrapper>
        </Container>
    )
}

export default index