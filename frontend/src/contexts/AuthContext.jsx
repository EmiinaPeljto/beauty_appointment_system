import React, { createContext, useState, useContext, useEffect } from 'react';
import { setToken, getToken, removeToken, setUser, getUser, removeUser, isAuthenticated } from '../utils/auth';
import api from '../utils/api';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // State to keep track of the current user and loading state
  const [user, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the user is authenticated on load
  useEffect(() => {
    const initAuth = async () => {
      try {
        // First check if token exists
        const token = getToken();
        
        if (token) {
          // Get user from localStorage
          const userData = getUser();
          console.log("Loaded user from storage:", userData);
          
          if (userData) {
            setCurrentUser(userData);
            
            // Optionally validate token with backend
            try {
              // Call a protected endpoint to verify the token
              await api.get('/protected/profile');
              console.log("Token validated successfully");
            } catch (err) {
              console.error("Token validation failed:", err);
              // If the token is invalid, log the user out
              logout();
            }
          } else {
            // If we have a token but no user data, something is wrong
            console.warn("Token exists but no user data found");
            logout();
          }
        } else {
          // No token, make sure we're logged out
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Authentication initialization error:', err);
        setError(err.message);
        logout(); // Ensure clean state on error
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Make a request to the login endpoint
      const response = await fetch('http://localhost:3000/api/v1/gen/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Save token and user data
      setToken(data.token);
      setUser(data.user);
      setCurrentUser(data.user);
      
      return data;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Make a request to the register endpoint
      const response = await fetch('http://localhost:3000/api/v1/gen/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      return data;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    removeToken();
    removeUser();
    setCurrentUser(null);
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user, // Simple check if user object exists
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
