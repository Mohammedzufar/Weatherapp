/**
 * WeatherCard Component - Main current weather display
 * Shows city, temperature, condition, humidity, wind, pressure, and icon
 */

import './WeatherCard.css';

// OpenWeather icon base URL
const ICON_URL = 'https://openweathermap.org/img/wn/';

export default function WeatherCard({ weather, isFavorite, onToggleFavorite }) {
  if (!weather) return null;

  const { name, main, weather: conditions, wind } = weather;
  const condition = conditions?.[0];
  const icon = condition?.icon || '01d';

  return (
    <div className="weather-card glass-card">
      {/* City name and favorite button */}
      <div className="weather-card-header">
        <h2 className="weather-city">{name}</h2>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(name)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Temperature and icon */}
      <div className="weather-main">
        <div className="weather-temp-section">
          <img
            src={`${ICON_URL}${icon}@2x.png`}
            alt={condition?.description || 'Weather'}
            className="weather-icon"
          />
          <span className="weather-temp">{Math.round(main?.temp ?? 0)}°C</span>
        </div>
        <p className="weather-condition">{condition?.description || 'N/A'}</p>
      </div>

      {/* Details grid */}
      <div className="weather-details">
        <div className="weather-detail">
          <span className="detail-icon" aria-hidden="true">💧</span>
          <div>
            <span className="detail-value">{main?.humidity ?? 0}%</span>
            <span className="detail-label">Humidity</span>
          </div>
        </div>
        <div className="weather-detail">
          <span className="detail-icon" aria-hidden="true">💨</span>
          <div>
            <span className="detail-value">{Math.round(wind?.speed ?? 0)} m/s</span>
            <span className="detail-label">Wind</span>
          </div>
        </div>
        <div className="weather-detail">
          <span className="detail-icon" aria-hidden="true">📊</span>
          <div>
            <span className="detail-value">{main?.pressure ?? 0} hPa</span>
            <span className="detail-label">Pressure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
