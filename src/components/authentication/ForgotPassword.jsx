import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generateCaptcha = () => {
  const operations = ['+', '-'];
  let a, b, result, operation;

  do {
    a = Math.floor(Math.random() * 10);
    b = Math.floor(Math.random() * 10);
    operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      default:
        result = a + b;
    }
  } while (result < 0); // Ensure no negative results

  return { question: `${a} ${operation} ${b}`, answer: result };
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captcha.answer) {
      setError("Captcha incorrect. Veuillez réessayer.");
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/auth/forgot-password', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Un email de réinitialisation de mot de passe a été envoyé.');
      setError('');
    } catch (error) {
      console.error(error.response || error.message || error);
      if (error.response && error.response.status === 404) {
        setError('L\'adresse email n\'existe pas.');
      } else {
        setError('Erreur lors de l\'envoi de l\'email de réinitialisation.');
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2>Réinitialisation de mot de passe</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCaptcha">
              <Form.Label>Combien font {captcha.question} ?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Répondez au captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit" className="mt-3">
              Envoyer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;