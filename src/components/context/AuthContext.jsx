import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded); // Debug
      return decoded.exp * 1000 > Date.now();
    } catch (err) {
      console.error('JWT decode error:', err);
      return false;
    }
  }, []);

  const verifyToken = useCallback(async (token) => {
    try {
      console.log('Verifying token:', token); // Debug
      const response = await axios.get(`${BASE_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Verify response:', response.data); // Debug
      setUser(response.data);
      return true;
    } catch (err) {
      console.error('Token verification failed:', err.response?.data || err.message);
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
  }, [BASE_URL]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const initializeAuth = async () => {
      if (token && isAuthenticated()) {
        await verifyToken(token);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, [isAuthenticated, verifyToken]);

  const login = async (email, password) => {
    try {
      console.log('Login request payload:', { email, password }); // Debug
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log('Login response:', response.data); // Debug
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      await verifyToken(token);
      return user;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
