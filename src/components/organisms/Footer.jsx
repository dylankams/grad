import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #343a40;
  color: #ffffff;
  padding: 40px;
  .footer-top {
    display: flex;
    justify-content: space-between;
    .footer-links {
      h5 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
      ul {
        list-style: none;
        padding: 0;
        li {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
  .footer-bottom {
    text-align: center;
    margin-top: 20px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <div className="footer-top">
          <div className="footer-links">
            <h5>Comment voyager avec Grad</h5>
            <ul>
              <li>Trajets populaires en covoiturage</li>
              <li>Destinations populaires en covoiturage</li>
              <li>Voyager en covoiturage en Europe</li>
            </ul>
          </div>
          <div className="footer-links">
            <h5>Covoiturage</h5>
            <ul>
              <li>Douala &rarr; Yaoundé</li>
              <li>Yaoundé &rarr; Bamenda</li>
              <li>Douala &rarr; Bafoussam</li>
            </ul>
          </div>
          <div className="footer-links">
            <h5>Grad Bus</h5>
            <ul>
              <li>Douala &rarr; Yaoundé</li>
              <li>Yaoundé &rarr; Bafoussam</li>
              <li>Douala &rarr; Garoua</li>
            </ul>
          </div>
          <div className="footer-links">
            <h5>En savoir plus</h5>
            <ul>
              <li>Covoiturer depuis une gare</li>
              <li>Assurance et covoiturage</li>
              <li>Qui sommes-nous?</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; Grad, 2024</p>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;