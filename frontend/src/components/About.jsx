// About.jsx
import React from "react";
import { 
  AboutContainer, 
  Title, 
  Content, 
  SectionTitle, 
  SectionContent, 
  TeamContainer, 
  TeamMember 
} from "../assets/css/AboutStyles"; // Importing the styled components

const About = () => {
  return (
    <AboutContainer>
      <Title>About Us</Title>
      <Content>
        Welcome to our e-commerce platform! We provide the best products at the most affordable prices. Our mission is to offer a seamless shopping experience and quality service to our customers.
      </Content>

      <SectionTitle>Our Vision</SectionTitle>
      <SectionContent>
        Our vision is to be the leading online platform offering diverse products, with a commitment to customer satisfaction and convenience.
      </SectionContent>

      <SectionTitle>Meet the Team</SectionTitle>
      <TeamContainer>
        <TeamMember>
          <img 
            src="https://randomuser.me/api/portraits/men/1.jpg" 
            alt="Team Member 1" 
          />
          <h3>John Doe</h3>
          <p>CEO & Founder</p>
        </TeamMember>
        <TeamMember>
          <img 
            src="https://randomuser.me/api/portraits/women/2.jpg" 
            alt="Team Member 2" 
          />
          <h3>Jane Smith</h3>
          <p>Lead Developer</p>
        </TeamMember>
        <TeamMember>
          <img 
            src="https://randomuser.me/api/portraits/women/3.jpg" 
            alt="Team Member 3" 
          />
          <h3>Emma Brown</h3>
          <p>Marketing Specialist</p>
        </TeamMember>
      </TeamContainer>
    </AboutContainer>
  );
};

export default About;
