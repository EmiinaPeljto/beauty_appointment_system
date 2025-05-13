import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import SupportRequestForm from './SupportRequestForm';

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer:
      "Booking is simple! Browse our salons, select your preferred service, choose an available time slot, and confirm your booking. You'll receive a confirmation email with all the details.",
  },
  {
    question: 'Can I reschedule or cancel my appointment?',
    answer:
      'Yes, you can reschedule or cancel your appointment up to 24 hours before the scheduled time without any penalty. Simply go to your profile, find the appointment, and select reschedule or cancel.',
  },
  {
    question: 'How do I leave a review for a salon?',
    answer:
      'After your appointment is completed, you can rate and review the salon by visiting your appointment history. Your feedback helps other users make informed decisions!',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major credit and debit cards, as well as digital payment methods. Payment information is securely stored for easy checkout.',
  },
  {
    question: 'How can I become a partner salon?',
    answer:
      'If you own a beauty salon and want to join our platform, please contact our business team through the support form below or email us at partners@glamifyme.com.',
  },
  {
    question: 'Are there any loyalty programs?',
    answer:
      'Yes! Regular customers earn loyalty points with each booking which can be redeemed for discounts on future services. Check your profile to see your current points balance.',
  },
];

export default function FAQSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(false); 
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleAnswer = (index) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  const handleContactClick = () => {
    if (isAuthenticated) {
      setShowSupportModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const closeModals = () => {
    setShowSupportModal(false);
    setShowLoginModal(false);
  };

  return (
    <section className='py-10'>
      <div className="relative z-10">
        <div className="max-w-3xl mx-auto mt-8 md:mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-pink-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full px-6 py-5 text-left"
              >
                <span className="flex text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="w-5 h-5 text-pink-500 flex-shrink-0 ml-2" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-pink-400 flex-shrink-0 ml-2" />
                )}
              </button>
              <div 
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-72 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-base mt-9">
          Still have questions?{' '}
          <span 
            className="cursor-pointer font-medium text-pink-500 transition-all duration-200 hover:text-pink-600 hover:underline"
            onClick={handleContactClick}
          >
            Contact our support team
          </span>
        </p>
      </div>

      {/* Support Form Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
            <button
              type="button"
              onClick={closeModals}
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <SupportRequestForm onClose={closeModals} />
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
            <button
              type="button"
              onClick={closeModals}
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 mb-4">
                <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              
              <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login Required
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                You need to be logged in to contact our support team
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-6 text-center">
                Please log in to your account to submit a support request. Our team is ready to assist you with any questions or concerns.
              </p>
              
              <div className="mt-6 flex flex-col space-y-3">
                <button
                  onClick={handleLoginRedirect}
                  className="flex w-full justify-center rounded-md bg-[#F178B6] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#FF66B2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF66B2]"
                >
                  Go to Login
                </button>
                
                <button
                  onClick={closeModals}
                  className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
