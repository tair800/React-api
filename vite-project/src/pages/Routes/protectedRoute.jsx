import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check for the token

  // If the token exists, render the children (i.e., the protected component)
  // Otherwise, redirect to the login page
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
