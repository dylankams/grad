import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/users/${selectedUser.id}/review`, { message: reviewMessage });
      setSelectedUser(null);
      setReviewMessage('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Utilisateurs</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="info" onClick={() => setSelectedUser(user)}>Vérifier les documents</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {selectedUser && (
        <Row className="mt-4">
          <Col>
            <h2>Vérification des documents pour {selectedUser.username}</h2>
            <Form onSubmit={handleReviewSubmit}>
              <Form.Group>
                <Form.Label>Message de révision</Form.Label>
                <Form.Control
                  type="text"
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">Soumettre la révision</Button>
            </Form>
            <Button variant="secondary" onClick={() => setSelectedUser(null)}>Annuler</Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminDashboard;