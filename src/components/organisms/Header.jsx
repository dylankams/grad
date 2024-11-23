import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthProvider';
import logo from '../../assets/img/logo_grad.png';
import banner from '../../assets/img/banner.jpg';
import { Button } from 'react-bootstrap';

const HeaderWrapper = styled.header`
  background-color: #f8f9fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .header-top {
    background-color: #f8f9fa;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: 10px 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav {
    display: flex;
    align-items: center;
  }

  .logo img {
    height: 50px;
  }

  .nav-link {
    color: #000;
    font-weight: bold;
    margin-right: 15px;
  }

  .nav-link:hover {
    color: #007bff;
  }

  .auth-menu {
    display: flex;
    align-items: center;
  }

  .header-banner {
    width: 100%;
    height: 200px;
    background-image: url(${banner});
    background-size: cover;
    background-position: center;  
  }

  .header-bottom {
    background-color: #6c757d;
    color: #fff;
    padding: 20px;
  }

  @media (max-width: 768px) {
    .header-top {
      flex-direction: column;
      align-items: flex-start;
    }
    .nav {
      margin-bottom: 10px;
    }
    .auth-menu {
      margin-top: 10px;
    }
    .header-banner {
      height: 150px;
    }
    .header-bottom {
      padding: 15px;
    }
  }
`;

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <div className="header-top">
        <div className="nav">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Grad Logo" />
            </Link>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/covoiturage">Covoiturage</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bus">Bus</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/offer-trip">Publier un trajet</Link>
            </li>
          </ul>
        </div>
        <div className="auth-menu">
          {user ? (
            <Button variant="outline-primary" onClick={() => logout(navigate)}>Déconnexion</Button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary mx-2">Connexion</Link>
              <Link to="/register" className="btn btn-primary">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
