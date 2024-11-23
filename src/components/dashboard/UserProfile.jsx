import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UserProfile = ({ updateUserProfilePicture }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [aboutYou, setAboutYou] = useState('');
  const [vehicles, setVehicles] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`);
        setUser(response.data);
        setAboutYou(response.data.aboutYou || '');
        setVehicles(response.data.vehicles || '');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('userId', user.id);

    try {
      const response = await axios.post('http://localhost:8080/api/users/upload/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      updateUserProfilePicture(response.data.profilePicture);
      toast.success('Photo de profil mise à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors du téléchargement de la photo de profil');
    }
  };

  const handleDocumentsSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('documents', documents);
    formData.append('userId', user.id);

    try {
      const response = await axios.post('http://localhost:8080/api/users/upload/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Documents soumis avec succès');
    } catch (error) {
      toast.error('Erreur lors du téléchargement des documents');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, {
        aboutYou,
        vehicles
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  /*if (!user) {
    return <div>Chargement...</div>;
  }*/

  return (
    <Container>
      <Row>
        <Col>
          <h2>Mon Profil</h2>
          <Form onSubmit={handleProfilePictureSubmit}>
            <Form.Group>
              <Form.Label>Modifier la photo de profil</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, setProfilePicture)} />
            </Form.Group>
            <Button variant="primary" type="submit">Mettre à jour</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Documents</h2>
          <Form onSubmit={handleDocumentsSubmit}>
            <Form.Group>
              <Form.Label>Charger les documents (PDF contenant pièce d'identité, permis B et justificatif de domicile)</Form.Label>
              <Form.Control type="file" accept="application/pdf" onChange={(e) => setDocuments(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit">Soumettre les documents</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>À propos de vous</h2>
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group>
              <Form.Label>À propos de vous</Form.Label>
              <Form.Control as="textarea" rows={3} value={aboutYou} onChange={(e) => setAboutYou(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Véhicules</Form.Label>
              <Form.Control as="textarea" rows={3} value={vehicles} onChange={(e) => setVehicles(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Mettre à jour le profil</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;