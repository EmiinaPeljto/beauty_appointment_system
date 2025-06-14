import { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for submitting support requests
 * @returns {Object} Form state and submission handling functions
 */
const useSubmitSupportRequest = (successCallback) => {
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
      const requestData = {
        subject: formData.subject,
        message: formData.message
      };

      // Call the API endpoint to create a support request
      const response = await api.post('/supportRequests/add', requestData);

      // Handle successful submission
      console.log('Support request submitted successfully:', response.data);
      setStatus({
        loading: false,
        success: true,
        error: null
      });

      // Clear form after successful submission
      resetForm();
      
      // Call the success callback if provided
      if (typeof successCallback === 'function') {
        successCallback();
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
      
      // More detailed error handling
      setStatus({
        loading: false,
        success: false,
        error: error.message || 'Failed to submit support request'
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
