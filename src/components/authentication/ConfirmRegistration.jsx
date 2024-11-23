import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmRegistration = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (token) {
        axios.get(`http://localhost:8080/api/auth/confirm?token=${token}`)
          .then(response => {
            setMessage(response.data);
            toast.success('Merci d\'avoir confirmé votre inscription !', {
              onClose: () => navigate('/login')
            });
          })
          .catch(error => {
            setMessage('Le lien de confirmation est invalide ou a expiré.');
          });
      } else {
        setMessage('Token de confirmation manquant.');
      }
    }
  }, [location.search, navigate]);

  return (
    <div>
      <ToastContainer />
      <h2>Confirmation d'inscription</h2>
      <p>{message}</p>
    </div>
  );
};

export default ConfirmRegistration;