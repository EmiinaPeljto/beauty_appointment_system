import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * A wrapper component that protects routes from unauthenticated users
 * If the user is not authenticated, they are redirected to the login page
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
