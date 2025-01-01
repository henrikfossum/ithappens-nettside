import React, { useState } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
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
      // You'll need to create this API route in pages/api/contact.js
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
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 2000);

    } catch (err) {
      setError('Det oppstod en feil ved sending av skjema. Vennligst prøv igjen.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-transform duration-300 ${
      isOpen ? 'translate-y-0' : 'translate-y-[calc(100%+1rem)]'
    }`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-96">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E293B] to-[#334BA1] p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Kontakt oss</h3>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Navn
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 
                       dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all text-sm text-gray-900 
                       dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              E-post
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 
                       dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all text-sm text-gray-900 
                       dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Bedrift
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 
                       dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all text-sm text-gray-900 
                       dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Melding
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 
                       dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent transition-all text-sm text-gray-900 
                       dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {success && (
            <div className="text-green-500 text-sm">Melding sendt! Vi tar kontakt snart.</div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full px-4 py-2 bg-gradient-to-r from-[#1E293B] to-[#334BA1] 
                     text-white rounded-lg font-medium hover:from-[#1E293B] hover:to-[#2D438C] 
                     transition-all duration-300 shadow-lg hover:shadow-xl text-sm
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sender...' : 'Send melding'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;