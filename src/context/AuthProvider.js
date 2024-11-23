import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, navigate) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    if (userData.roles.includes('ROLE_ADMIN')) {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;