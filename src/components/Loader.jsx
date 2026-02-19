/**
 * Loader Component - Animated loading spinner
 * Displayed while weather data is being fetched
 */

import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-container" aria-label="Loading weather data">
      <div className="loader-spinner"></div>
      <p className="loader-text">Fetching weather...</p>
    </div>
  );
}
