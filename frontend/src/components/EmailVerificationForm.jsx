import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import useEmailVerification from '../hooks/useEmailVerification';

const EmailVerificationForm = ({ email }) => {
  const [code, setCode] = useState('');
  const [resendStatus, setResendStatus] = useState({ sent: false, message: '' });
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { verifyCode, resendCode, loading, error, success } = useEmailVerification();

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Redirect to login page on successful verification
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      return;
    }
    
    await verifyCode(email, code);
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    const result = await resendCode(email);
    if (result.success) {
      setResendStatus({ sent: true, message: 'Verification code resent successfully!' });
      setCountdown(60); // Set 60 seconds cooldown
      
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setResendStatus({ sent: false, message: '' });
      }, 5000);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-pink-100">
            <FiMail className="h-8 w-8 text-pink-600" />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Email Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to <span className="font-semibold">{email}</span>
          </p>
        </div>

        {success ? (
          <div className="rounded-md bg-green-50 p-4 text-center">
            <div className="flex justify-center">
              <FiCheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
              <h3 className="ml-3 text-sm font-medium text-green-800">Verification successful!</h3>
            </div>
            <p className="mt-2 text-sm text-green-700">
              You'll be redirected to the login page shortly.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiAlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Verification failed</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {resendStatus.sent && (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiCheckCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">{resendStatus.message}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#F178B6] py-2 px-4 text-sm font-medium text-white hover:bg-[#FF66B2] focus:outline-none focus:ring-2 focus:ring-[#FF66B2] focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </div>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={countdown > 0 || loading}
                className="font-medium text-[#F178B6] hover:text-[#FF66B2] disabled:text-gray-400"
              >
                {countdown > 0 
                  ? `Resend code in ${countdown} seconds` 
                  : 'Didn\'t receive a code? Resend'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationForm;