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
        className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 
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
        
        <div className="bg-white dark:bg-slate-800 rounded-t-xl md:rounded-xl shadow-xl w-full md:w-96 border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ta kontakt</h3>
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="Lukk skjema"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
              Har du spørsmål eller ønsker en uforpliktende samtale? Fyll ut skjemaet, så tar jeg kontakt!
            </p>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Navn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Skriv navnet ditt her"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-200 
                  dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent text-slate-900 dark:text-white"
                required
                autoComplete="name"
                autoFocus
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="din@epost.no"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-200 
                  dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent text-slate-900 dark:text-white"
                required
                autoComplete="email"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Melding
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Beskriv ditt prosjekt eller spørsmål her"
                rows={3}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-200 
                  dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent text-slate-900 dark:text-white"
                required
              />
            </div>

            {/* Status Messages */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg text-xs">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-3 py-2 rounded-lg text-xs">
                Melding sendt! Jeg tar kontakt snart. 
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sending}
              className="w-full px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700
                text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {sending ? (
                <svg className="animate-spin h-4 w-4 text-white mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send melding
                </>
              )}
            </button>
            
            {/* Privacy note */}
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">
              Din informasjon deles ikke med andre.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;