import React, { useState } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Kunne ikke sende melding');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);

    } catch (err) {
      setError('Det oppstod en feil ved sending av skjema. Vennligst prøv igjen.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          transition-opacity duration-300`} 
        onClick={onClose}
      />

      {/* Form Container */}
      <div className={`fixed z-50 transition-all duration-300 
        md:bottom-4 md:right-4 
        ${isOpen 
          ? 'md:translate-y-0 opacity-100 pointer-events-auto' 
          : 'md:translate-y-[calc(100%+1rem)] opacity-0 pointer-events-none'
        }
        ${isOpen 
          ? 'bottom-0 left-0 right-0 md:left-auto md:right-4' 
          : 'translate-y-full md:transform-none'}`}>
        
        <div className="bg-white dark:bg-gray-800 rounded-t-xl md:rounded-xl shadow-2xl w-full md:w-96">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E293B] to-[#334BA1] p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Kontakt oss</h3>
            <button 
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Lukk skjema"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Har du spørsmål eller ønsker en uforpliktende samtale? Fyll ut skjemaet, så tar vi kontakt!
            </p>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Navn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ditt fulle navn"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 
                  dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all text-sm text-gray-900 
                  dark:text-white"
                required
                autoComplete="name"
                autoFocus
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="din@epost.com"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 
                  dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all text-sm text-gray-900 
                  dark:text-white"
                required
                autoComplete="email"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Melding
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                placeholder="Hva kan vi hjelpe deg med?"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 
                  dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all text-sm text-gray-900 
                  dark:text-white"
                required
                autoComplete="off"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg text-sm">
                Melding sendt! Vi tar kontakt snart.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sending}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#1E293B] to-[#334BA1] 
                text-white rounded-lg font-medium hover:from-[#1E293B] hover:to-[#2D438C] 
                transition-all duration-300 shadow-lg hover:shadow-xl text-sm
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {sending ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'Send melding'
              )}
            </button>

            {/* Privacy Assurance */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Vi deler ikke din informasjon med andre.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;