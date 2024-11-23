import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, NavDropdown } from 'react-bootstrap';
import SearchForm from '../../components/molecules/SearchForm';
import UserTrips from './UserTrips';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const defaultAvatar = require('../../assets/img/avatar.png');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const userId = user.id;
        const tripsResponse = await axios.get(`http://localhost:8080/api/trips/passenger/${userId}`);
        setTrips(tripsResponse.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, [user]);

  const handleSelect = (eventKey) => {
    if (eventKey === "logout") {
      localStorage.removeItem('user');
      navigate('/login');
    } else {
      navigate(eventKey);
    }
  };

  const updateUserProfilePicture = (newProfilePicture) => {
    const updatedUser = { ...user, profilePicture: newProfilePicture };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-between align-items-center">
          <h1>Où voulez-vous aller ?</h1>
          <NavDropdown
            title={<img src={user.profilePicture || defaultAvatar} alt="Profile" width="40" height="40" className="rounded-circle" />}
            id="nav-dropdown"
          >
            <NavDropdown.Item href={`/profile/${user.id}`}>Mon Profil</NavDropdown.Item>
            <NavDropdown.Item href="/logout">Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <SearchForm />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Mes Trajets</h2>
          <UserTrips trips={trips} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;