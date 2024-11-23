import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .trips-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .btn {
      margin: 5px;
    }
  }
`;

const TopTrips = () => {
  return (
    <Section className="container my-5">
      <h2>Où allez-vous?</h2>
      <div className="trips-list">
        <button className="btn btn-outline-primary">Douala &rarr; Yaoundé</button>
        <button className="btn btn-outline-primary">Yaoundé &rarr; Bamenda</button>
        <button className="btn btn-outline-primary">Douala &rarr; Bafoussam</button>
      </div>
    </Section>
  );
};

export default TopTrips;