import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .bus-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .btn {
      margin: 5px;
    }
  }
`;

const BusDestinations = () => {
  return (
    <Section className="container my-5">
      <h2>Le top des destinations en bus</h2>
      <div className="bus-list">
        <button className="btn btn-outline-primary">Bus Douala &rarr; Yaoundé</button>
        <button className="btn btn-outline-primary">Bus Yaoundé &rarr; Bafoussam</button>
        <button className="btn btn-outline-primary">Bus Douala &rarr; Garoua</button>
      </div>
    </Section>
  );
};

export default BusDestinations;