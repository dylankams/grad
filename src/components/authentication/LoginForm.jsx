import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthProvider';
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

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCaptchaVerify = (value) => {
    setCaptchaInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captcha.answer) {
      setError("Captcha incorrect. Veuillez réessayer.");
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      if (response.data) {
        const { user, roles } = response.data;
        login({ ...user, roles }, navigate);
        toast.success('Connexion réussie!', {
          onClose: () => {
            const redirectTo = location.state?.from || (roles.includes('ROLE_ADMIN') ? '/admin-dashboard' : '/user-dashboard');
            navigate(redirectTo);
          }
        });
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2>Connexion</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Mot de passe</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlash /> : <Eye />}
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
              Connexion
            </Button>
          </Form>
          <p className="mt-3">
            <a href="/forgot-password">Mot de passe oublié ?</a>
          </p>
          <p>
            Vous n'êtes pas encore inscrit ? <a href="/register">Créer un compte</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;