import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import EmailVerificationForm from '../components/EmailVerificationForm';

const EmailVerification = () => {
  const location = useLocation();
  const email = location.state?.email;

  // If no email is provided (direct navigation to this page), redirect to registration
  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12">
        <EmailVerificationForm email={email} />
      </div>
    </div>
  );
};

export default EmailVerification;