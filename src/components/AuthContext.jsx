import React, { useState, useContext, createContext } from 'react';
import { apiLogin, apiSignup } from '../components/api';

// --- 1. Auth Context ---
// Manages the user's authentication state

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin(email, password);
      setUser(data.user);
      setIsLoggedIn(true);
      // You would save the token here, e.g., localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiSignup(name, email, password);
      setUser(data.user);
      setIsLoggedIn(true);
      // You would save the token here
      return true;
    } catch (err) {
      setError(err.message || 'Failed to sign up');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // You would remove the token here, e.g., localStorage.removeItem('token');
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    error,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};