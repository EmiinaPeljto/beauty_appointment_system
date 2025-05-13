// Authentication utility functions

/**
 * Save the JWT token to localStorage
 * @param {string} token - The JWT token
 */
export const setToken = (token) => {
  localStorage.setItem('auth_token', token);
};

/**
 * Get the JWT token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Remove the JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

/**
 * Save the user data to localStorage
 * @param {Object} user - The user object
 */
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get the user data from localStorage
 * @returns {Object|null} The user object or null if not found
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Remove the user data from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

/**
 * Check if the user is authenticated
 * @returns {boolean} True if the user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Logout the user by removing the token and user data
 */
export const logout = () => {
  removeToken();
  removeUser();
};
