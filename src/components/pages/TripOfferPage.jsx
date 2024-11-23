import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCar, FaMoneyCheck, FaRegCheckCircle, FaUserShield, FaQuestionCircle, FaMoneyBillWave } from 'react-icons/fa';
import { Button, Container, Row, Col } from 'react-bootstrap';

const PageWrapper = styled.div`
  .section {
    padding: 40px 20px;
    margin: 20px 0;
    color: #fff;
    text-align: center;
  }

  .welcome-offer {
    background-color: #6AB04A; /* Light green */
  }

  .top-trips {
    background-color: #22A6B3; /* Light blue */
  }

  .services {
    background-color: #E67E22; /* Orange */
  }

  .blog {
    background-color: #9B59B6; /* Purple */
  }

  .bus-destinations {
    background-color: #F1C40F; /* Yellow */
    color: #000; /* Dark text for better readability on yellow background */
  }

  .fraud-prevention {
    background-color: #E74C3C; /* Red */
  }

  .footer {
    background-color: #34495E; /* Dark blue */
  }

  .fixed-button-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
    text-align: center;
    z-index: 1000;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  }

  .fixed-button {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p, ul, li {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    margin-bottom: 10px;
  }

  button {
    margin-top: 20px;
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .publish-section {
    background-color: #fff;
    padding: 20px;
    text-align: center;
  }
`;

const TripOfferPage = () => {
  const [showFixedButton, setShowFixedButton] = useState(false);
  const [isInPublishSection, setIsInPublishSection] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollThreshold = 50; // Show fixed button after 50px of scrolling
    const publishSection = document.querySelector('.publish-section');
    const publishSectionOffsetTop = publishSection.offsetTop;
    const footerOffset = document.querySelector('.footer').offsetTop;
    const windowHeight = window.innerHeight;

    if (scrollY > scrollThreshold && scrollY + windowHeight < publishSectionOffsetTop) {
      setShowFixedButton(true);
      setIsInPublishSection(false);
    } else if (scrollY + windowHeight >= publishSectionOffsetTop) {
      setShowFixedButton(false);
      setIsInPublishSection(true);
    } else {
      setShowFixedButton(false);
      setIsInPublishSection(false);
    }
  };

  const handlePublishClick = () => {
    const isAuthenticated = false; // Replace with actual authentication logic
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/trip-search');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <PageWrapper>
      <div className="section welcome-offer">
        <Container>
          <h2>Obtenez 16,500 CFA de bienvenue</h2>
          <p>
            À partir du 1er janvier 2024, bénéficiez de 16,500 CFA de bienvenue pour vous encourager à covoiturer !
            Pour en profiter, covoiturez et Grad s'occupe de tout !
          </p>
          <ul>
            <li><FaCar className="icon" /> Effectuez 1 covoiturage de plus de 80 km au Cameroun en tant que conducteur</li>
            <li><FaMoneyCheck className="icon" /> Recevez 16,500 CFA directement sur votre compte bancaire</li>
          </ul>
          <Button variant="primary" onClick={handlePublishClick}>Publier un trajet</Button>
        </Container>
      </div>

      <div className="section top-trips">
        <Container>
          <h2>Roulez. Partagez. Économisez.</h2>
          <Row>
            <Col md={4}>
              <p><FaRegCheckCircle className="icon" /> Gardez vos plans! Prenez la route comme prévu et optimisez les places libres de votre véhicule.</p>
            </Col>
            <Col md={4}>
              <p><FaRegCheckCircle className="icon" /> Soyez bien accompagné. Partagez votre trajet et un moment de vie avec des voyageurs de tous horizons.</p>
            </Col>
            <Col md={4}>
              <p><FaRegCheckCircle className="icon" /> Péages, essences, énergies... Divisez l'ensemble des frais avec les autres passagers en toute simplicité.</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section services">
        <Container>
          <h2>Rejoignez 21 millions de conducteurs Grad</h2>
          <Row>
            <Col md={4}>
              <p><FaUserShield className="icon" /> Plus de 100 millions de membres Grad à travers le monde</p>
            </Col>
            <Col md={4}>
              <p><FaUserShield className="icon" /> Plus de 40 millions de trajets partagés par an</p>
            </Col>
            <Col md={4}>
              <p><FaUserShield className="icon" /> Profitez d'une communauté active et solidaire</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section blog">
        <Container>
          <h2>Plus de 262,000 CFA de versements sur mon compte</h2>
          <p>Grâce à Grad alors que je l'utilise seulement depuis quelques mois... y'a pas à dire c'est fort leur truc !</p>
        </Container>
      </div>

      <div className="section bus-destinations">
        <Container>
          <h2>Publiez votre trajet en quelques minutes seulement</h2>
          <Row>
            <Col md={6}>
              <p><FaQuestionCircle className="icon" /> Créez votre compte sur Grad</p>
              <p><FaQuestionCircle className="icon" /> Indiquez votre lieu de départ et d'arrivée, la date et découvrez le prix recommandé pour augmenter vos chances d'avoir vos passagers et avis.</p>
            </Col>
            <Col md={6}>
              <video width="100%" controls>
                <source src="path_to_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section fraud-prevention">
        <Container>
          <h2>Bénéficiez d'une Prime Covoiturage de 65,000 CFA avec Grad Daily</h2>
          <p>Vous qui prenez la route tous les jours pour le travail ou vos études, recevez 65,000 CFA de Prime Covoiturage en réalisant 10 trajets en 3 mois avec Grad Daily, l'appli du covoiturage quotidien.</p>
        </Container>
      </div>

      <div className="section footer">
        <Container>
          <h2>Nous sommes là pour chacun de vos trajets</h2>
          <Row>
            <Col md={4}>
              <p><FaUserShield className="icon" /> À votre service 7/7</p>
            </Col>
            <Col md={4}>
              <p><FaUserShield className="icon" /> Grad vous accompagne</p>
            </Col>
            <Col md={4}>
              <p><FaUserShield className="icon" /> Sécurité de vos informations</p>
            </Col>
          </Row>
          <div className="footer-links">
            <h2>Mes 1ers pas de conducteur avec le Centre d'Aide</h2>
            <ul>
              <li>Comment fixer le prix de mon trajet ?</li>
              <li>Quand vais-je recevoir mon paiement ?</li>
              <li>Mon trajet contient une erreur, que faire ?</li>
              <li>Je souhaite annuler mon trajet publié en tant que conducteur</li>
            </ul>
            <Button variant="primary">Trouver d'autres réponses</Button>
          </div>
        </Container>
      </div>

      <div className="publish-section">
        <Button variant="primary" onClick={handlePublishClick}>Publier un trajet</Button>
      </div>

      {showFixedButton && !isInPublishSection && (
        <div className="fixed-button-container">
          <Button variant="primary" className="fixed-button" onClick={handlePublishClick}>Publier un trajet</Button>
        </div>
      )}
    </PageWrapper>
  );
};

export default TripOfferPage;