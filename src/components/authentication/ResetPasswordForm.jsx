import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
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

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (parseInt(captchaInput) !== captcha.answer) {
      setError("Captcha incorrect. Veuillez réessayer.");
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/auth/reset-password/${token}`, {
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Votre mot de passe a été réinitialisé avec succès.', {
        onClose: () => navigate('/login')
      });
    } catch (error) {
      setError('Erreur lors de la réinitialisation du mot de passe.');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2>Réinitialiser le mot de passe</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Entrez votre nouveau mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirmez le mot de passe</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmez le mot de passe"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
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
              Réinitialiser le mot de passe
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordForm;