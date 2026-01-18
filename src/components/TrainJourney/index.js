import React, { useLayoutEffect, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences, education } from '../../data/constants';

gsap.registerPlugin(ScrollTrigger);

const DB_RED = '#EC0016';
const AMPLITUDE = 120; // How wide the zigzag is
const ITEM_SPACING = 450; // Vertical space between stations

// ... (previous styled components)

// Replaced Car/Fuel Station with professional abstract cursor
const JourneyCursor = styled.div`
    width: 24px;
    height: 24px;
    background: #EC0016;
    border: 3px solid #fff;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 15px rgba(236, 0, 22, 0.6);
    z-index: 50;
    
    /* Pulsing Ring effect */
    &::after {
        content: '';
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 100%; height: 100%;
        border-radius: 50%;
        border: 1px solid #EC0016;
        animation: ${keyframes`
            0% { width: 100%; height: 100%; opacity: 1; }
            100% { width: 250%; height: 250%; opacity: 0; }
        `} 2s infinite;
    }
`;

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  overflow: visible;
`;

const HeaderTitle = styled.h2`
    font-size: 3rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 40px;
    text-transform: uppercase;
    letter-spacing: 5px;
    text-align: center;
    position: relative;
    z-index: 20;
    
    span {
        color: ${DB_RED};
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

// SVG Container for the whole track
const SvgTrackContainer = styled.svg`
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px; /* Wide enough for zigzag */
    height: 100%;
    overflow: visible;
    pointer-events: none;
    z-index: 10;
    
    @media (max-width: 768px) {
        width: 100%;
        opacity: 0.6; /* Subtler track on mobile to let text pop */
    }
`;

// The moving train wrapper
const TrainPositioner = styled.div`
    position: absolute;
    top: 200px; 
    left: 50%;
    margin-left: -300px; /* Align 0 with SVG left edge */
    /* margin-left: -300px; */ /* Align 0 with SVG left edge, removed as xPercent handles centering */
    z-index: 50;
    pointer-events: none;
    /* transform handled by GSAP */
`;

const TimelineContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    position: relative;
    z-index: 20;
    padding-bottom: 200px;
    margin-top: 100px; /* Offset to start after train enters */
`;

const TimelineItem = styled.div`
    display: flex;
    justify-content: ${props => props.$isLeft ? 'flex-end' : 'flex-start'};
    padding: 0 0;
    width: 50%;
    margin-left: ${props => props.$isLeft ? '0' : 'auto'};
    margin-right: ${props => props.$isLeft ? 'auto' : '0'};
    padding-right: ${props => props.$isLeft ? '160px' : '0'}; /* Space for track */
    padding-left: ${props => props.$isLeft ? '0' : '160px'};
    box-sizing: border-box;
    position: relative;
    height: ${ITEM_SPACING}px; /* Fixed height to match wave cycle */
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        padding: 0 10px;
        margin: 0;
        /* Force overlap or stacks */
    }
`;

const Card = styled.div`
    background: rgba(20, 20, 25, 0.9);
    border: 1px solid #333;
    padding: 24px;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.02);
        border-color: ${DB_RED};
        background: rgba(30,30,35,0.95);
        box-shadow: 0 0 20px rgba(236,0,22,0.2);
    }
    
    &.active {
        border-color: ${DB_RED};
        box-shadow: 0 0 20px rgba(236,0,22,0.2);
    }

    @media (max-width: 768px) {
        max-width: 85%;
        padding: 16px;
        background: rgba(10, 10, 10, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 100; /* Ensure on top of track */
    }
`;

const Year = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: ${DB_RED};
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const Title = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 4px 0;
    line-height: 1.3;
`;

const Sub = styled.p`
    font-size: 13px;
    color: #aaa;
    margin: 0 0 12px 0;
`;

const Description = styled.p`
    font-size: 13px;
    color: #ccc;
    margin: 0 0 12px 0;
    line-height: 1.5;
    opacity: 0.9;
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
`;

const SkillTag = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, ${DB_RED}88, ${DB_RED}44);
    padding: 4px 10px;
    border-radius: 12px;
    border: 1px solid ${DB_RED}66;
`;

const Grade = styled.div`
    font-size: 12px;
    color: #888;
    margin-top: 4px;
    font-style: italic;
`;

const parseYear = (dateStr) => {
    if (!dateStr) return 2023;
    const match = dateStr.match(/\d{4}/);
    return match ? parseInt(match[0]) : 2023;
};

const getMergedJourney = () => {
    const exp = experiences.map(e => ({
        ...e,
        category: 'work',
        year: parseYear(e.date),
        title: e.role,
        subtitle: e.company,
        fullDesc: e.desc,
        location: e.location,
        skills: e.skills || []
    }));
    const edu = education.map(e => ({
        ...e,
        category: 'education',
        year: parseYear(e.date),
        title: e.degree,
        subtitle: e.school,
        fullDesc: e.desc,
        location: e.location,
        grade: e.grade,
        skills: []
    }));
    return [...edu, ...exp].sort((a, b) => b.year - a.year);
};

const TrainJourney = () => {
    const sectionRef = useRef(null);
    const trainRef = useRef(null);
    const activePathRef = useRef(null);

    const stations = useMemo(() => getMergedJourney(), []);

    // Generate Path Data
    const { pathData, totalPathHeight } = useMemo(() => {
        let points = [];
        // Center of SVG is 300
        const CENTER_X = 300;

        points.push({ x: CENTER_X, y: 0 }); // Start at center top

        stations.forEach((_, i) => {
            const isLeft = i % 2 === 0;
            const y = (i * ITEM_SPACING) + (ITEM_SPACING / 2);
            // x varies around 300
            const x = isLeft ? CENTER_X - AMPLITUDE : CENTER_X + AMPLITUDE;
            points.push({ x, y });
        });

        // Add one final point at bottom center
        const lastY = stations.length * ITEM_SPACING;
        points.push({ x: CENTER_X, y: lastY + 200 }); // Extend a bit past the last item
        const height = lastY + 200;

        // Generate smooth curve using cubic Bezier
        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];

            // Control points for an S-curve
            const cp1x = current.x;
            const cp1y = current.y + (next.y - current.y) / 2;
            const cp2x = next.x;
            const cp2y = current.y + (next.y - current.y) / 2;

            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
        }

        return { pathData: path, totalPathHeight: height };
    }, [stations]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const train = trainRef.current;
        const activePath = activePathRef.current;

        if (!section || !train || !activePath) return;

        // Get total length of the SVG path
        const pathEl = activePath; // Using the active path ref to access methods
        const pathLength = pathEl.getTotalLength();

        // Set initial stroke dash (hidden)
        gsap.set(activePath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });

        // Center train on path start
        gsap.set(train, { x: 0, y: 0, xPercent: -50, yPercent: -50 }); // Offset centering

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 0.5,
                }
            });

            // Animate Path Drawing
            tl.to(activePath, {
                strokeDashoffset: 0,
                ease: "none"
            });

            // Animate Train Along Path
            const proxy = { p: 0 };
            tl.to(proxy, {
                p: 1,
                ease: "none",
                onUpdate: () => {
                    const progress = proxy.p;
                    const point = pathEl.getPointAtLength(progress * pathLength);

                    // Calculate rotation
                    // Sample a point slightly ahead
                    const nextPoint = pathEl.getPointAtLength(Math.min(progress * pathLength + 5, pathLength));
                    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;

                    // Train looks down (90deg).
                    // If angle is 90 (down), rotation should be 0.
                    // Rotation = angle - 90

                    gsap.set(train, {
                        x: point.x,
                        y: point.y,
                        rotation: angle - 90
                    });
                }
            }, 0); // Sync start

            // Animate Items
            const items = gsap.utils.toArray('.timeline-item');
            items.forEach((item) => {
                const card = item.querySelector('.timeline-card');
                gsap.fromTo(card, { opacity: 0, scale: 0.8 }, {
                    opacity: 1, scale: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 70%",
                        end: "bottom 70%",
                        toggleActions: 'play reverse play reverse'
                    }
                });

                // Active class
                ScrollTrigger.create({
                    trigger: item,
                    start: "top 60%",
                    end: "bottom 40%",
                    onEnter: () => card.classList.add('active'),
                    onEnterBack: () => card.classList.add('active'),
                    onLeave: () => card.classList.remove('active'),
                    onLeaveBack: () => card.classList.remove('active')
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [pathData]);

    return (
        <Section ref={sectionRef} id="journey">
            <HeaderTitle>Professional <span>Experience</span></HeaderTitle>

            <SvgTrackContainer style={{ height: totalPathHeight }}>
                {/* Clean Tech Track Base */}
                <path
                    d={pathData}
                    stroke="#333"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    style={{ opacity: 0.5 }}
                />

                {/* Active Progress Line */}
                <path
                    ref={activePathRef}
                    d={pathData}
                    stroke={DB_RED}
                    strokeWidth="6"
                    fill="none"
                    style={{ filter: `drop-shadow(0 0 8px ${DB_RED})` }}
                />

                {/* Start/End Locations */}
                <text x="300" y="60" textAnchor="middle" fill="#E50914" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                    📍 Berlin, Germany
                </text>

                <text x="300" y={totalPathHeight - 20} textAnchor="middle" fill="#E50914" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                    📍 Bangalore, India
                </text>
            </SvgTrackContainer>

            <TrainPositioner ref={trainRef}>
                {/* No rotation needed for a circle, but keeping it smooth doesn't hurt */}
                <JourneyCursor />
            </TrainPositioner>

            <TimelineContainer>
                {stations.map((item, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                        <TimelineItem key={i} $isLeft={isLeft} className="timeline-item">
                            <Card className="timeline-card">
                                <Year>{item.date || item.year}</Year>
                                <Title>{item.title}</Title>
                                <Sub>
                                    {item.subtitle}
                                    {item.location && <span style={{ opacity: 0.8, fontWeight: 500 }}> • {item.location}</span>}
                                </Sub>
                                {item.grade && <Grade>{item.grade}</Grade>}
                                {item.fullDesc && <Description>{item.fullDesc}</Description>}
                                {item.skills && item.skills.length > 0 && (
                                    <SkillsContainer>
                                        {item.skills.map((skill, idx) => (
                                            <SkillTag key={idx}>{skill}</SkillTag>
                                        ))}
                                    </SkillsContainer>
                                )}
                            </Card>
                        </TimelineItem>
                    );
                })}
            </TimelineContainer>
        </Section>
    );
};



export default TrainJourney;
