import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  .service {
    h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      color: #6c757d;
    }
  }
`;

const Services = () => {
  return (
    <Section className="container my-5">
      <div className="row">
        <div className="col-md-4 service">
          <h3>Vos trajets préférés à petits prix</h3>
          <p>Où que vous alliez, en bus ou en covoiturage, trouvez le trajet idéal parmi notre large choix de destinations à petits prix.</p>
        </div>
        <div className="col-md-4 service">
          <h3>Voyagez en toute confiance</h3>
          <p>Nous prenons le temps qu'il faut pour connaître nos membres et nos compagnies de bus partenaires. Nous vérifions les avis, les profils et les pièces d’identité.</p>
        </div>
        <div className="col-md-4 service">
          <h3>Recherchez, cliquez et réservez !</h3>
          <p>Réserver un trajet devient encore plus simple! Facile d'utilisation et dotée de technologies avancées, notre appli vous permet de réserver un trajet à proximité en un rien de temps.</p>
        </div>
      </div>
    </Section>
  );
};

export default Services;