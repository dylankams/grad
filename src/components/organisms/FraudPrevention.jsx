import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 8px;
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1.5rem;
  }
`;

const FraudPrevention = () => {
  return (
    <Section className="container my-5 p-5">
      <h2>Aidez-nous à vous protéger contre les arnaques</h2>
      <p>
        Chez Grad, nous mettons tout en œuvre pour vous proposer une plateforme aussi sécurisée que possible. Mais les tentatives d'arnaque demeurent une réalité, et nous tenons à vous expliquer exactement comment les éviter et les signaler.
      </p>
      <button className="btn btn-primary">En savoir plus</button>
    </Section>
  );
};

export default FraudPrevention;