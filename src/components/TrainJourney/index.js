import React, { useLayoutEffect, useRef, useMemo, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBriefcase, FiBookOpen, FiMapPin, FiUsers } from 'react-icons/fi';
import { experiences, education, clientDelivery } from '../../data/constants';
import { SectionTitle, SectionKicker, SectionLead } from '../shared/Section';

gsap.registerPlugin(ScrollTrigger);

const RED = '#E50914';
const AMPLITUDE = 120;
/** Floor for a row's height — rows grow past this when their card is taller. */
const MIN_ROW = 320;
/** Offset from the section's top edge to the SVG track's origin. */
const TRACK_TOP = 260;
/** Horizontal centre of the 600px-wide track layer. */
const CX = 300;
/** Samples taken along the path once, then interpolated per frame. */
const PATH_SAMPLES = 700;

const Wrapper = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 100px 24px 40px;
  scroll-margin-top: 80px;

  @media (max-width: 768px) {
    padding: 72px 18px 20px;
  }
`;

const TrackLayer = styled.svg`
  position: absolute;
  top: ${TRACK_TOP}px;
  left: 50%;
  width: 600px;
  transform: translateX(-50%);
  overflow: visible;
  pointer-events: none;
  z-index: 0;

  /* The zigzag track has no room to breathe on narrow screens, where the
     timeline collapses to a single column anyway. */
  @media (max-width: 900px) {
    display: none;
  }
`;

const Marker = styled.div`
  position: absolute;
  top: ${TRACK_TOP}px;
  left: 50%;
  margin-left: -300px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${RED};
  border: 3px solid #fff;
  box-shadow: 0 0 14px rgba(229, 9, 20, 0.7);
  pointer-events: none;
  z-index: 2;
  will-change: transform;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Timeline = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1160px;
  margin-top: 60px;
  padding-bottom: 120px;

  @media (max-width: 900px) {
    margin-top: 40px;
    padding-bottom: 40px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $left }) => ($left ? 'flex-end' : 'flex-start')};
  width: 50%;
  /*
   * min-height, never a fixed height. This row used to be locked to a constant
   * so the SVG wave could be generated from index * rowHeight. Any card whose
   * content exceeded that constant overflowed the row, and because the row
   * centres its child, half the excess spilled upward — a long card would
   * render on top of the section heading. The track is now measured from where
   * the rows actually land, so they are free to size to their content.
   */
  min-height: ${MIN_ROW}px;
  padding: 26px ${({ $left }) => ($left ? '130px' : '0')} 26px
    ${({ $left }) => ($left ? '0' : '130px')};
  margin-left: ${({ $left }) => ($left ? '0' : 'auto')};
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 0;
    margin: 0 0 20px;
    padding: 0;
    justify-content: center;
  }
`;

const Card = styled.article`
  position: relative;
  width: 100%;
  max-width: 450px;
  padding: 26px;
  border-radius: 16px;
  /* Opaque rather than translucent: the old card used backdrop-filter: blur(),
     which forces the compositor to re-sample everything behind it on every
     scroll frame. Visually near-identical over a dark background. */
  background: #131317;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(229, 9, 20, 0.45);
  }

  &.active {
    border-color: rgba(229, 9, 20, 0.45);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

/** Colour per entry kind: work (red), education (blue), client work (amber). */
const KIND_COLOR = {
  work: '229, 9, 20',
  education: '90, 200, 250',
  client: '255, 149, 0',
};

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  margin-bottom: 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: rgb(${({ $kind }) => KIND_COLOR[$kind] || KIND_COLOR.work});
  background: rgba(${({ $kind }) => KIND_COLOR[$kind] || KIND_COLOR.work}, 0.1);
  border: 1px solid rgba(${({ $kind }) => KIND_COLOR[$kind] || KIND_COLOR.work}, 0.28);

  svg {
    width: 11px;
    height: 11px;
  }
`;

const Role = styled.h3`
  font-size: 17px;
  font-weight: 650;
  line-height: 1.35;
  color: #fff;
  margin-bottom: 5px;
`;

const Org = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;

  svg {
    width: 12px;
    height: 12px;
    opacity: 0.7;
  }
`;

const Period = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: rgba(255, 255, 255, 0.38);
  margin-bottom: 16px;
`;

const Bullets = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding-left: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 16px;
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.62);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${RED};
      opacity: 0.75;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const Grade = styled.p`
  font-size: 12.5px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.42);
  margin-bottom: 12px;
`;

const Endpoint = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${RED};
  background: rgba(229, 9, 20, 0.08);
  border: 1px solid rgba(229, 9, 20, 0.25);

  svg {
    width: 13px;
    height: 13px;
  }
`;

const KIND_META = {
  work: { Icon: FiBriefcase, label: 'Work' },
  education: { Icon: FiBookOpen, label: 'Education' },
  client: { Icon: FiUsers, label: 'Client Delivery' },
};

/**
 * Newest first, so the journey reads present -> past as you scroll down.
 *
 * Ranking uses the *last* year in the date range, not the first: an entry like
 * "Apr 2023 – Oct 2026" is more recent than its start year suggests, and
 * sorting on the start year would bury the ongoing Master's below finished
 * roles. Start year breaks ties.
 */
const buildJourney = () => {
  const years = (d) => {
    const found = String(d || '').match(/\d{4}/g) || [];
    const nums = found.map(Number);
    return { start: nums[0] || 0, end: nums[nums.length - 1] || 0 };
  };

  const entries = [
    ...experiences.map((e) => ({
      key: `w${e.id}`,
      kind: 'work',
      title: e.role,
      org: e.company,
      date: e.date,
      location: e.location,
      bullets: e.bullets,
      skills: e.skills,
      // Ongoing roles always lead.
      rank: e.current ? [9999, 9999] : null,
      ...years(e.date),
    })),
    ...clientDelivery.map((c) => ({
      key: `c${c.id}`,
      kind: 'client',
      title: c.title,
      org: c.client,
      date: c.date,
      location: c.location,
      bullets: c.bullets,
      skills: c.skills,
      rank: null,
      ...years(c.date),
    })),
    ...education.map((e) => ({
      key: `e${e.id}`,
      kind: 'education',
      title: e.degree,
      org: e.school,
      date: e.date,
      location: e.location,
      grade: e.grade,
      bullets: e.desc ? [e.desc] : [],
      skills: [],
      rank: null,
      ...years(e.date),
    })),
  ];

  return entries.sort((a, b) => {
    const [ae, as] = a.rank || [a.end, a.start];
    const [be, bs] = b.rank || [b.end, b.start];
    return be - ae || bs - as;
  });
};

const TrainJourney = () => {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const markerRef = useRef(null);
  const progressRef = useRef(null);

  const stations = useMemo(buildJourney, []);

  /**
   * Track geometry is measured from the laid-out rows rather than computed from
   * a fixed row height, so the wave follows the cards no matter how tall their
   * content is.
   */
  const [track, setTrack] = useState({ d: '', height: 0 });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const timeline = timelineRef.current;
    if (!root || !timeline) return;

    const measure = () => {
      const items = timeline.querySelectorAll('.journey-item');
      if (!items.length) return;

      const rootTop = root.getBoundingClientRect().top;
      const pts = [{ x: CX, y: 0 }];

      items.forEach((item, i) => {
        const r = item.getBoundingClientRect();
        pts.push({
          x: i % 2 === 0 ? CX - AMPLITUDE : CX + AMPLITUDE,
          // Row centre, expressed in the track layer's coordinate space.
          y: r.top - rootTop - TRACK_TOP + r.height / 2,
        });
      });

      const endY = pts[pts.length - 1].y + 140;
      pts.push({ x: CX, y: endY });

      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const midY = a.y + (b.y - a.y) / 2;
        d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
      }

      // Skip the update when nothing moved, or the ResizeObserver below would
      // re-trigger itself on its own output.
      setTrack((prev) => (prev.d === d ? prev : { d, height: endY }));
    };

    measure();

    // Catches font loading, responsive reflow and window resizes in one go —
    // any of them change where the rows sit.
    const ro = new ResizeObserver(measure);
    ro.observe(timeline);
    return () => ro.disconnect();
  }, [stations]);

  /* Card reveals are independent of the track and run on every viewport. */
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.journey-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: reduce ? 0 : 28 },
          {
            opacity: 1,
            y: 0,
            duration: reduce ? 0 : 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          }
        );

        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 35%',
          onToggle: ({ isActive }) => card.classList.toggle('active', isActive),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [stations]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const marker = markerRef.current;
    const progress = progressRef.current;
    if (!root || !marker || !progress || !track.d) return;

    // The zigzag track is hidden below 900px, so there's nothing to drive.
    if (window.matchMedia('(max-width: 900px)').matches) return;

    const ctx = gsap.context(() => {
      const len = progress.getTotalLength();
      gsap.set(progress, { strokeDasharray: len, strokeDashoffset: len });

      // Sample the path once up front. The old version called
      // getPointAtLength() twice per scroll frame; interpolating a prebuilt
      // table removes that synchronous SVG geometry work from the hot path.
      const table = new Float32Array(PATH_SAMPLES * 2);
      for (let i = 0; i < PATH_SAMPLES; i++) {
        const p = progress.getPointAtLength((i / (PATH_SAMPLES - 1)) * len);
        table[i * 2] = p.x;
        table[i * 2 + 1] = p.y;
      }

      const quickX = gsap.quickSetter(marker, 'x', 'px');
      const quickY = gsap.quickSetter(marker, 'y', 'px');

      const state = { p: 0 };
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 60%',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        })
        .to(progress, { strokeDashoffset: 0, ease: 'none' }, 0)
        .to(
          state,
          {
            p: 1,
            ease: 'none',
            onUpdate: () => {
              const f = state.p * (PATH_SAMPLES - 1);
              const i = Math.min(Math.floor(f), PATH_SAMPLES - 2);
              const t = f - i;
              const i2 = i * 2;
              quickX(table[i2] + (table[i2 + 2] - table[i2]) * t);
              quickY(table[i2 + 1] + (table[i2 + 3] - table[i2 + 1]) * t);
            },
          },
          0
        );
    }, rootRef);

    return () => ctx.revert();
  }, [track.d]);

  return (
    <Wrapper ref={rootRef} id="experience">
      <SectionKicker>Where I've been</SectionKicker>
      <SectionTitle>Experience &amp; Education</SectionTitle>
      <SectionLead>
        From API integration work in Bangalore to owning a live CRM and the
        reporting around it in Berlin — plus on-site client delivery in Almaty.
      </SectionLead>

      <Endpoint style={{ marginTop: 28 }}>
        <FiMapPin aria-hidden="true" />
        Berlin, Germany
      </Endpoint>

      <TrackLayer style={{ height: track.height }} aria-hidden="true">
        {/* Static wide stroke stands in for a glow. A drop-shadow filter here
            would be re-rasterised on every scrub frame. */}
        <path
          d={track.d}
          stroke={RED}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.07"
        />
        <path
          d={track.d}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          ref={progressRef}
          d={track.d}
          stroke={RED}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </TrackLayer>

      <Marker ref={markerRef} aria-hidden="true" />

      <Timeline ref={timelineRef}>
        {stations.map((s, i) => {
          const { Icon, label } = KIND_META[s.kind] || KIND_META.work;
          return (
            <Item key={s.key} $left={i % 2 === 0} className="journey-item">
              <Card className="journey-card">
                <Badge $kind={s.kind}>
                  <Icon aria-hidden="true" />
                  {label}
                </Badge>
                <Role>{s.title}</Role>
                <Org>
                  {s.org}
                  {s.location && (
                    <>
                      <FiMapPin aria-hidden="true" />
                      {s.location}
                    </>
                  )}
                </Org>
                <Period>{s.date}</Period>
                {s.grade && <Grade>{s.grade}</Grade>}
                {s.bullets?.length > 0 && (
                  <Bullets>
                    {s.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </Bullets>
                )}
                {s.skills?.length > 0 && (
                  <Tags>
                    {s.skills.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </Tags>
                )}
              </Card>
            </Item>
          );
        })}
      </Timeline>

      <Endpoint>
        <FiMapPin aria-hidden="true" />
        Bangalore, India
      </Endpoint>
    </Wrapper>
  );
};

export default React.memo(TrainJourney);
