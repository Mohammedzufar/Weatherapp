/**
 * App - Main Weather Application
 * Integrates search, weather card, forecast, favorites, theme toggle
 */

import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

export default function App() {
  const {
    weather,
    forecast,
    loading,
    error,
    favorites,
    darkMode,
    searchCity,
    toggleFavorite,
    isFavorite,
    toggleTheme,
    fetchWeatherData,
  } = useWeather();

  return (
    <div className="app">
      {/* Animated gradient background */}
      <div className="bg-gradient" aria-hidden="true"></div>

      <div className="app-content">
        {/* Header with search and theme toggle */}
        <header className="header">
          <h1 className="logo">Weather</h1>
          <div className="header-actions">
            <SearchBar onSearch={searchCity} placeholder="Search city..." />
            <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
          </div>
        </header>

        {/* Favorites - click to load weather */}
        {favorites.length > 0 && (
          <section className="favorites-section">
            <h3 className="section-title">Favorites</h3>
            <div className="favorites-list">
              {favorites.map((city) => (
                <button
                  key={city}
                  className="favorite-chip"
                  onClick={() => fetchWeatherData(city)}
                  title={`Load weather for ${city}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Main content */}
        <main className="main">
          {loading && <Loader />}
          {error && !loading && (
            <div className="error-box glass-card">
              <p className="error-icon">⚠️</p>
              <p className="error-message">{error}</p>
              <p className="error-hint">Try searching for a valid city name</p>
            </div>
          )}
          {weather && !loading && (
            <>
              <WeatherCard
                weather={weather}
                isFavorite={isFavorite(weather?.name)}
                onToggleFavorite={toggleFavorite}
              />
              <Forecast forecast={forecast} />
            </>
          )}
          {!weather && !loading && !error && (
            <p className="empty-state">
              Search for a city or allow location access to see weather
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
