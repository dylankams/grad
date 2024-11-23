import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // Pour remplacer les balises <a> internes

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

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/*const verifyEmail = async (email) => {
  const apiKey = 'c481a8216e050326dd4302c9db4f48ceebbbf300';
  try {
    const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`);
    return response.data.data.status === 'valid';
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    return false;
  }
};*/

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState('');
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
  });
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    setPasswordValid({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    });
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordTouched(true);
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValid.length || !passwordValid.upper || !passwordValid.lower || !passwordValid.number) {
      setError("Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre.");
      return;
    }
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
    if (!isValidEmail(email)) {
      setError("Le format de l'adresse email est invalide.");
      return;
    }

    /*const emailIsValid = await verifyEmail(email);
    if (!emailIsValid) {
      setError("L'adresse email est invalide ou n'existe pas.");
      return;
    }*/

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username,
        email,
        password,
        newsletterConsent,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        toast.success('Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte mail.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Il semble que cette adresse email soit déjà utilisée. Veuillez saisir une autre adresse email");
      } else {
        setError("Erreur lors de l'inscription");
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Inscription</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

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

            <Form.Group controlId="formPassword">
              <Form.Label>Mot de passe</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  onBlur={() => setPasswordTouched(true)}
                />
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
              <PasswordStrengthMeter password={password} />
              {passwordTouched && (
                <ul>
                  <li className={passwordValid.length ? 'text-success' : 'text-danger'}>Au moins 8 caractères</li>
                  <li className={passwordValid.upper ? 'text-success' : 'text-danger'}>Au moins une majuscule</li>
                  <li className={passwordValid.lower ? 'text-success' : 'text-danger'}>Au moins une minuscule</li>
                  <li className={passwordValid.number ? 'text-success' : 'text-danger'}>Au moins un chiffre</li>
                </ul>
              )}
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
              {!passwordMatch && <p className="text-danger">Les mots de passe ne correspondent pas</p>}
              {passwordMatch && confirmPassword && <p className="text-success">Les mots de passe correspondent</p>}
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
            <Form.Group controlId="formNewsletterConsent">
              <Form.Check
                type="checkbox"
                label="Je ne souhaite pas recevoir d'informations, de bons plans et de cadeaux de GRAD."
                checked={newsletterConsent}
                onChange={(e) => setNewsletterConsent(e.target.checked)}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit" className="mt-3">
              S'inscrire
            </Button>
          </Form>

          <div className="mt-4">
            <p>En tant qu'abonné(e), je peux me désinscrire à tout moment en contactant GRAD ou en cliquant sur le lien dans la newsletter.</p>
            <p>
              Déjà membre ? <Link to="/login">Connexion</Link>
            </p>
            <p>
              En vous inscrivant, vous acceptez nos <Link to="/terms">Conditions générales</Link> et notre <Link to="/privacy">Politique de confidentialité</Link>.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;