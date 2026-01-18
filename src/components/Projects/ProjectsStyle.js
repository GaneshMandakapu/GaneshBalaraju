import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const Container = styled.div`
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 60px 20px;
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    gap: 20px;
`;

export const Title = styled.h2`
    font-size: 48px;
    text-align: center;
    font-weight: 800;
    background: linear-gradient(135deg, #fff 0%, #E50914 50%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shine} 4s linear infinite;
    margin-bottom: 8px;
    
    @media (max-width: 768px) {
        font-size: 36px;
    }
`;

export const Desc = styled.p`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.6;
    
    @media (max-width: 768px) {
        font-size: 16px;
        padding: 0 20px;
    }
`;

export const ToggleButtonGroup = styled.div`
    display: flex;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 6px;
    margin: 30px 0 20px;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
    
    @media (max-width: 768px) {
        padding: 4px;
        gap: 2px;
    }
`

export const ToggleButton = styled.button`
    padding: 12px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    border: none;
    background: ${({ active }) => active ? 'linear-gradient(135deg, #E50914, #B81D24)' : 'transparent'};
    color: ${({ active }) => active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
    transition: all 0.3s ease;
    box-shadow: ${({ active }) => active ? '0 4px 15px rgba(229, 9, 20, 0.3)' : 'none'};
    
    &:hover {
        color: #fff;
        background: ${({ active }) => active ? 'linear-gradient(135deg, #E50914, #B81D24)' : 'rgba(229, 9, 20, 0.1)'};
    }
    
    @media (max-width: 768px) {
        padding: 10px 16px;
        font-size: 12px;
    }
`

export const Divider = styled.div`
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0 4px;
    
    @media (max-width: 768px) {
        display: none;
    }
`

export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 32px;
    flex-wrap: wrap;
    padding: 20px 0;
    
    @media (max-width: 768px) {
        gap: 24px;
    }
`;
