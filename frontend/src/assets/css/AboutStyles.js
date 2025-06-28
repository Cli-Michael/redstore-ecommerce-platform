import styled from "styled-components";

export const AboutContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Content = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SectionContent = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const TeamMember = styled.div`
  width: 250px;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #666;
  }

  @media (max-width: 768px) {
    width: 100%;
    img {
      width: 80px;
      height: 80px;
    }
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;
