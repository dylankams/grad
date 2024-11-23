import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import CovoituragePage from './components/pages/CovoituragePage';
import BusPage from './components/pages/BusPage';
import TripOfferPage from './components/pages/TripOfferPage';
import HomePage from './components/templates/HomePageTemplate';
import LoginForm from './components/authentication/LoginForm';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPasswordForm from './components/authentication/ResetPasswordForm';
import RegisterForm from './components/authentication/RegisterForm';
import ConfirmRegistration from './components/authentication/ConfirmRegistration';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserProfile from './components/dashboard/UserProfile';
import UserTrips from './components/dashboard/UserTrips';
import ReviewForm from './components/molecules/ReviewForm';
import AuthProvider, { AuthContext } from './context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: '/login',
        state: { from: location.pathname, message: 'Vous devez vous connecter pour accéder à cette page.' }
      }}
    />
  );
};

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user ? children : <Navigate to="/" />;
};

const App = () => {
  useEffect(() => {
    const handleActivity = () => {
      localStorage.setItem('lastActivity', Date.now());
    };

    const checkSession = () => {
      const lastActivity = parseInt(localStorage.getItem('lastActivity'), 10);
      const now = Date.now();
      if (now - lastActivity > 30 * 60 * 1000) {
        // 30 minutes
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    const interval = setInterval(checkSession, 60 * 1000); // Check every minute

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/covoiturage" element={<CovoituragePage />} />
            <Route path="/bus" element={<BusPage />} />
            <Route path="/offer-trip" element={<TripOfferPage />} />
            <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterForm /></PublicRoute>} />
            <Route path="/confirm" element={<ConfirmRegistration />} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="/reset-password/:token" element={<PublicRoute><ResetPasswordForm /></PublicRoute>} />
            <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/trips" element={<PrivateRoute><UserTrips /></PrivateRoute>} />
            <Route path="/review" element={<ReviewForm />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;