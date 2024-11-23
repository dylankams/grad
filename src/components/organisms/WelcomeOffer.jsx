import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 8px;
  .welcome-text {
    h2 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1.5rem;
    }
  }
`;

const WelcomeOffer = () => {
  return (
    <Section className="container my-5 p-5">
      <div className="row align-items-center">
        <div className="col-md-6 welcome-text">
          <h2>Recevez 25€ de bienvenue!</h2>
          <p>
            Conducteurs, conductrices, bonne nouvelle : vos bonnes habitudes sont récompensées ! Bénéficiez de 25€ de bienvenue en réalisant un covoiturage.
          </p>
          <button className="btn btn-primary">En savoir plus</button>
        </div>
        <div className="col-md-6">
          <img src="https://example.com/welcome-image.jpg" alt="Welcome Offer" className="img-fluid" />
        </div>
      </div>
    </Section>
  );
};

export default WelcomeOffer;