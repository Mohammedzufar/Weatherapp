/**
 * ThemeToggle Component - Dark / Light mode switch
 * Uses localStorage for persistence via useWeather hook
 */

import './ThemeToggle.css';

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-icon" aria-hidden="true">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
