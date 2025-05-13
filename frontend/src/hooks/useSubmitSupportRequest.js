import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for submitting support requests
 * @returns {Object} Form state and submission handling functions
 */
const useSubmitSupportRequest = () => {
  const { user } = useAuth();
  // Simplify form data to only include what's needed
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      subject: '',
      message: ''
    });
    setStatus({
      loading: false,
      success: false,
      error: null
    });
  };

  // Submit the support request
  const submitRequest = async (e) => {
    if (e) {
      e.preventDefault();
    }

    // Validate form data
    if (!formData.subject || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error: 'Please fill in all required fields',
      });
      return;
    }

    setStatus({
      loading: true,
      success: false,
      error: null,
    });

    try {
      // Get the authentication token using the correct key
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        throw new Error('You must be logged in to submit a support request');
      }
      
      // Prepare request data
      const requestData = {
        subject: formData.subject,
        message: formData.message
      };

      // Call the API endpoint to create a support request
      const response = await axios.post(
        'http://localhost:3000/api/v1/gen/supportRequests/add',
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Handle successful submission
      console.log('Support request submitted successfully:', response.data);
      setStatus({
        loading: false,
        success: true,
        error: null
      });

      // Clear form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error submitting support request:', error);
      
      // More detailed error handling
      let errorMessage = 'Failed to submit support request';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        
        if (error.response.status === 401) {
          errorMessage = 'You need to be logged in to submit a request';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection';
      }
      
      setStatus({
        loading: false,
        success: false,
        error: errorMessage
      });
    } 
    return null;
  };

  return {
    formData,
    status,
    handleChange,
    submitRequest,
    resetForm
  };
};

export default useSubmitSupportRequest;
