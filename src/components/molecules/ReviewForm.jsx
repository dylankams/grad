import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ReviewForm = ({ driverId }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    try {
      const response = await axios.post('/api/reviews', { driverId, rating, comment });
      if (response.data) {
        setSuccess('Avis soumis avec succès');
        setRating('');
        setComment('');
      } else {
        setError('Erreur lors de la soumission de l\'avis');
      }
    } catch (error) {
      setError('Erreur lors de la soumission de l\'avis');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Laisser un avis</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRating">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Sélectionnez une note</option>
                <option value="1">1 - Très mauvais</option>
                <option value="2">2 - Mauvais</option>
                <option value="3">3 - Correct</option>
                <option value="4">4 - Bon</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formComment">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez votre commentaire"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <Button variant="primary" type="submit" className="mt-3">
              Envoyer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewForm;