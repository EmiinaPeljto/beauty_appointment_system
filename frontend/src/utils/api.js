import { getToken } from './auth';

// API base URL
const API_BASE_URL = 'http://localhost:3000/api/v1/gen';

/**
 * Custom fetch function that includes the JWT token in the Authorization header
 * @param {string} url - The API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} - The fetch promise
 */
const apiFetch = async (url, options = {}) => {
  // Get the token from localStorage
  const token = getToken();
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Merge options
  const fetchOptions = {
    ...options,
    headers
  };
  
  // Make the request
  const response = await fetch(`${API_BASE_URL}${url}`, fetchOptions);
  
  // Check if the response is OK
  if (!response.ok) {
    // Handle 401 Unauthorized
    if (response.status === 401) {
      // You could redirect to login page or dispatch a logout action here
      console.error('Authentication error: Please login again');
    }
    
    // Parse error response
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  
  // Parse response
  return await response.json();
};

/**
 * API utility methods
 */
const api = {
  /**
   * Send GET request
   * @param {string} url - The API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - The fetch promise
   */
  get: (url, options = {}) => {
    return apiFetch(url, {
      method: 'GET',
      ...options
    });
  },
  
  /**
   * Send POST request
   * @param {string} url - The API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - The fetch promise
   */
  post: (url, data = {}, options = {}) => {
    return apiFetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  },
  
  /**
   * Send PUT request
   * @param {string} url - The API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - The fetch promise
   */
  put: (url, data = {}, options = {}) => {
    return apiFetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  },
  
  /**
   * Send DELETE request
   * @param {string} url - The API endpoint
   * @param {Object} options - Additional fetch options
   * @returns {Promise} - The fetch promise
   */
  delete: (url, options = {}) => {
    return apiFetch(url, {
      method: 'DELETE',
      ...options
    });
  }
};

export default api;
