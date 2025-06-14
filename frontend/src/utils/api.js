import { getToken } from './auth';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1/gen';

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


const api = {
 
  get: (url, options = {}) => {
    return apiFetch(url, {
      method: 'GET',
      ...options
    });
  },
  
  post: (url, data = {}, options = {}) => {
    return apiFetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  },
  

  put: (url, data = {}, options = {}) => {
    return apiFetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  },

  delete: (url, options = {}) => {
    return apiFetch(url, {
      method: 'DELETE',
      ...options
    });
  }
};

export default api;
