/**
 * useWeather Hook - Manages weather data fetching and state
 * Handles geolocation, search, favorites, and error states
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getWeatherAndForecast,
  getWeatherByCoords,
  getForecastByCoords,
} from '../services/weatherService';

// LocalStorage keys
const FAVORITES_KEY = 'weather-favorites';
const THEME_KEY = 'weather-theme';

/**
 * Parse favorites from localStorage
 */
function getStoredFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save favorites to localStorage
 */
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Custom hook for weather application state and logic
 */
export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return stored ? stored === 'dark' : true; // Default to dark
  });

  /**
   * Fetch weather and forecast data for a city
   */
  const fetchWeatherData = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const { weather: weatherData, forecast: forecastData } = await getWeatherAndForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch weather and forecast by coordinates (geolocation)
   */
  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search weather by city name
   */
  const searchCity = useCallback(
    (city) => {
      if (!city?.trim()) return;
      fetchWeatherData(city.trim());
    },
    [fetchWeatherData]
  );

  /**
   * Add city to favorites
   */
  const addFavorite = useCallback((city) => {
    if (!city) return;
    const cityLower = city.toLowerCase().trim();
    setFavorites((prev) => {
      if (prev.includes(cityLower)) return prev;
      const next = [...prev, cityLower];
      saveFavorites(next);
      return next;
    });
  }, []);

  /**
   * Remove city from favorites
   */
  const removeFavorite = useCallback((city) => {
    const cityLower = city.toLowerCase().trim();
    setFavorites((prev) => {
      const next = prev.filter((c) => c !== cityLower);
      saveFavorites(next);
      return next;
    });
  }, []);

  /**
   * Toggle favorite status for a city
   */
  const toggleFavorite = useCallback((city) => {
    if (!city) return;
    const cityLower = city.toLowerCase().trim();
    setFavorites((prev) => {
      const has = prev.includes(cityLower);
      const next = has ? prev.filter((c) => c !== cityLower) : [...prev, cityLower];
      saveFavorites(next);
      return next;
    });
  }, []);

  /**
   * Check if city is in favorites
   */
  const isFavorite = useCallback(
    (city) => {
      if (!city) return false;
      return favorites.includes(city.toLowerCase().trim());
    },
    [favorites]
  );

  /**
   * Toggle dark/light mode and persist to localStorage
   */
  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
      return next;
    });
  }, []);

  /**
   * Apply theme to document on mount and when darkMode changes
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  /**
   * Get user location and fetch weather on first load
   */
  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        // User denied or error - show default or let user search
        setLoading(false);
        setError(null);
      }
    );
  }, []); // Run only on mount - fetchWeatherByCoords is stable

  return {
    weather,
    forecast,
    loading,
    error,
    favorites,
    darkMode,
    searchCity,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    toggleTheme,
    fetchWeatherData,
  };
}
