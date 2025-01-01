import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function NavBar({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const ThemeIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      {darkMode ? (
        // Sun icon
        <path
          stroke="currentColor"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ) : (
        // Moon icon
        <path
          stroke="currentColor"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      )}
    </svg>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled 
          ? 'bg-gray-100 text-gray-900 shadow-md dark:bg-gray-900 dark:text-white' 
          : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand name with hover animation */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-display font-extrabold text-xl transition-transform hover:scale-105"
        >
          ithappens
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li>
            <button
              onClick={() => scrollToSection('hero')}
              className={`hover:text-blue-400 transition-colors ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
            >
              Hjem
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('services')}
              className={`hover:text-blue-400 transition-colors ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
            >
              Tjenester
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('projects')}
              className={`hover:text-blue-400 transition-colors ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
            >
              Prosjekter
            </button>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                       transition-colors duration-200 ${
                         scrolled ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : 'hover:bg-white/10'
                       }`}
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </li>
          {/* Standout button-style "Kontakt" */}
          <li>
            <button
              onClick={onContactClick}
              className="px-4 py-2 rounded-md font-medium text-white bg-blue-600 
                       hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Kontakt
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                     transition-colors duration-200"
            aria-label="Toggle theme"
          >
            <ThemeIcon />
          </button>
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-inset 
                     focus:ring-white dark:focus:ring-gray-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-16 left-0 w-full z-40 py-4 transition-colors duration-300 ${
            scrolled 
              ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white' 
              : 'bg-[#1E293B] text-white'
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 font-medium">
            <li>
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-blue-400 transition-colors"
              >
                Hjem
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('services')}
                className="hover:text-blue-400 transition-colors"
              >
                Tjenester
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('projects')}
                className="hover:text-blue-400 transition-colors"
              >
                Prosjekter
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onContactClick();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 rounded-md font-medium text-white bg-blue-600 
                         hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Kontakt
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}