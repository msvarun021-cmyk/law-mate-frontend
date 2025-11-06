import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user session on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    // Note: In a real app, the token would be returned from the /login endpoint
    // For this Flask-Login demo, the session cookie is handled by the browser.
    // We'll store user data in localStorage for simplicity.
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // If we were using tokens
    delete api.defaults.headers.common['Authorization'];
  };
  
  const register = async (username, email, password) => {
    return await authService.register(username, email, password);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);