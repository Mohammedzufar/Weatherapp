# Weather App

A modern, professional Weather Application built with React and Vite. Features search by city, geolocation, 5-day forecast, favorites, and dark/light mode.

## Features

- **Search by city** - Enter any city name to get current weather
- **Geolocation** - Automatically fetches weather for your location on first load
- **Current weather** - Temperature, humidity, wind speed, pressure with dynamic icons
- **5-day forecast** - Daily forecast for the next 5 days
- **Favorites** - Save cities and click to reload weather (persisted in localStorage)
- **Dark / Light mode** - Toggle with localStorage persistence
- **Responsive** - Works on mobile, tablet, and desktop
- **Glassmorphism UI** - Modern cards with gradient background

## Installation

1. Clone or download the project
2. Open terminal in the project folder
3. Install dependencies:

```bash
npm install
```

4. **No API key needed!** The app uses [Open-Meteo](https://open-meteo.com/) – free, no signup required.

## Run Instructions

**Development (with hot reload):**
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Tech Stack

- React 18
- Vite 5
- Open-Meteo API (no API key required)
- Fetch API
- CSS (custom properties, animations)

## Project Structure

```
src/
  components/     # SearchBar, WeatherCard, Forecast, Loader, ThemeToggle
  services/       # weatherService.js (API calls)
  hooks/          # useWeather.js (state & logic)
  App.jsx
  main.jsx
  App.css
  index.css
```

## API

Uses [Open-Meteo](https://open-meteo.com/) (free, no API key):
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Weather: `https://api.open-meteo.com/v1/forecast`

Units: metric (Celsius, m/s)
