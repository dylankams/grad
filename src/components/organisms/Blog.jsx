import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .card {
    margin-bottom: 1rem;
  }
`;

const Blog = () => {
  return (
    <Section className="container my-5">
      <h2>Le covoiturage selon Grad</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <img src="https://example.com/blog1.jpg" alt="Blog 1" className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">Grad fait le plein de nouveautés pour l'été</h3>
              <p className="card-text">Découvrez nos dernières innovations et mises à jour.</p>
              <button className="btn btn-primary">En savoir plus</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <img src="https://example.com/blog2.jpg" alt="Blog 2" className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">Top 5 des anecdotes de covoiturage</h3>
              <p className="card-text">Pour célébrer le cap des 100 millions de membres Grad dans le monde.</p>
              <button className="btn btn-primary">En savoir plus</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <img src="https://example.com/blog3.jpg" alt="Blog 3" className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">100 millions de membres : le message des fondateurs de Grad</h3>
              <p className="card-text">En 2021, la communauté Grad a atteint 100 millions de membres!</p>
              <button className="btn btn-primary">En savoir plus</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Blog;