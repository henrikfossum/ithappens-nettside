import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onContactClick }) {
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
      className="w-5 h-5"
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-sm text-slate-900 shadow-md dark:bg-slate-900/90 dark:text-white' 
          : `bg-transparent ${darkMode ? 'text-white' : 'text-slate-900'}`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Brand logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2"
        >
          <div className="bg-blue-600 text-white dark:bg-blue-600 h-8 w-8 rounded-lg flex items-center justify-center font-bold text-base shadow-sm">it</div>
          <span className="font-bold text-xl">happens</span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          <li>
            <button
              onClick={() => scrollToSection('tjenester')}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Tjenester
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('prosjekter')}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Prosjekter
            </button>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </li>
          {/* Kontakt button */}
          <li>
            <button
              onClick={onContactClick}
              className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Kontakt
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            <ThemeIcon />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-full left-0 w-full py-4 px-4 shadow-lg border-t border-slate-200 dark:border-slate-700 transition-all duration-300 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-sm text-slate-900 dark:bg-slate-900/95 dark:text-white' 
              : 'bg-white/95 backdrop-blur-sm text-slate-900 dark:bg-slate-900/95 dark:text-white'
          }`}
        >
          <ul className="flex flex-col space-y-3 font-medium">
            <li>
              <button
                onClick={() => scrollToSection('tjenester')}
                className="w-full py-2 px-3 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center"
              >
                Tjenester
                <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('prosjekter')}
                className="w-full py-2 px-3 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center"
              >
                Prosjekter
                <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onContactClick();
                  setMenuOpen(false);
                }}
                className="w-full mt-2 px-4 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
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