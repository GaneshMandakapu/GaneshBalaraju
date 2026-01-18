import React from 'react'
import styled from 'styled-components'

const Tag = styled.span`
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}CC, ${({ theme }) => theme.primary}88);
    padding: 5px 12px;
    border-radius: 20px;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;
`

const Card = styled.div`
    width: 340px;
    height: 480px;
    background: linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(20, 20, 25, 0.95));
    cursor: pointer;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    transform-style: preserve-3d;
    
    /* Glassmorphism overlay */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.2) 100%
        );
        pointer-events: none;
        z-index: 1;
        border-radius: 16px;
    }
    
    /* Glow effect on hover */
    &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
            circle at center,
            rgba(229, 9, 20, 0.15) 0%,
            transparent 50%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
        z-index: 0;
    }
    
    &:hover {
        transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-10px) scale(1.02);
        box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(229, 9, 20, 0.2);
        border-color: rgba(229, 9, 20, 0.4);
        
        &::after {
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        width: 100%;
        max-width: 340px;
        height: auto;
        min-height: 420px;
    }
`

const ImageContainer = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(transparent, rgba(20, 20, 25, 1));
        pointer-events: none;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    ${Card}:hover & {
        transform: scale(1.1);
    }
`

const CardContent = styled.div`
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    z-index: 2;
`;

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
`

const Title = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    margin: 0 0 8px 0;
    line-height: 1.3;
    transition: color 0.3s ease;
    
    ${Card}:hover & {
        color: #fff;
    }
`

const Date = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &::before {
        content: '📅';
        font-size: 12px;
    }
`

const Description = styled.p`
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.6;
    margin: 0;
    flex: 1;
`

const Members = styled.div`
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
`

const Avatar = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-left: -8px;
    background-color: ${({ theme }) => theme.bgLight};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(229, 9, 20, 0.5);
    object-fit: cover;
    transition: all 0.3s ease;
    
    &:first-child {
        margin-left: 0;
    }
    
    &:hover {
        transform: scale(1.15) translateY(-3px);
        z-index: 10;
        border-color: #E50914;
    }
`

const ViewButton = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #E50914, #B81D24);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    color: white;
    font-size: 18px;
    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
    
    ${Card}:hover & {
        opacity: 1;
        transform: translateY(0);
    }
`;

const ProjectCards = ({ project, setOpenModal }) => {
    return (
        <Card onClick={() => setOpenModal({ state: true, project: project })}>
            <ImageContainer>
                <Image src={project.image} alt={project.title} loading="lazy" />
            </ImageContainer>
            <CardContent>
                <Tags>
                    {project.tags?.slice(0, 3).map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                    {project.tags?.length > 3 && (
                        <Tag style={{ background: 'rgba(255,255,255,0.1)' }}>+{project.tags.length - 3}</Tag>
                    )}
                </Tags>
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Description>{project.description}</Description>
                {project.member && project.member.length > 0 && (
                    <Members>
                        {project.member.map((member, index) => (
                            <Avatar key={index} src={member.img} alt="Team member" />
                        ))}
                    </Members>
                )}
            </CardContent>
            <ViewButton>→</ViewButton>
        </Card>
    )
}

export default ProjectCards