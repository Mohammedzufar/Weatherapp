# 🌤️ Weather App

A modern and responsive **Weather Application** built with **React and Vite** that provides real-time weather information, location-based weather detection, a 5-day forecast, favorite cities, and customizable light/dark themes.

🌐 **Live Demo:** [Weather App](https://forcastweater.netlify.app/?utm_source=chatgpt.com)

---

## ✨ Features

### 🔍 Search by City

Search for any city and view its current weather information.

### 📍 Geolocation

Automatically detects the user's location and displays the weather when the application is opened.

### 🌡️ Current Weather

View important weather information including:

* Temperature
* Humidity
* Wind Speed
* Atmospheric Pressure
* Weather Conditions
* Dynamic Weather Icons

### 📅 5-Day Forecast

View the expected weather conditions for the next five days.

### ⭐ Favorite Cities

Save frequently searched cities as favorites and quickly load their weather information.

Favorite cities are persisted using **localStorage**, so they remain available after refreshing the browser.

### 🌙 Dark / Light Mode

Switch between dark and light themes.

The selected theme is also saved using `localStorage`.

### 📱 Responsive Design

The application works across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

### 🪟 Glassmorphism UI

Modern glass-style cards combined with gradients, animations, and a clean interface.

---

## 🛠️ Tech Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| **React 18**       | User interface                  |
| **Vite 5**         | Development and build tool      |
| **JavaScript**     | Application logic               |
| **CSS**            | Styling, animations, themes     |
| **Open-Meteo API** | Weather and geocoding data      |
| **Fetch API**      | API requests                    |
| **localStorage**   | Favorites and theme persistence |

---

## 🌐 Live Demo

Try the application here:

👉 [Open Weather App](https://forcastweater.netlify.app/?utm_source=chatgpt.com)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js**
* **npm**
* **Git**

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Project

```bash
cd <project-folder>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will usually be available at:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

Create an optimized production build:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

---

## 🔎 Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## ☁️ API

This project uses **Open-Meteo**, a free weather API that does not require an API key.

[Open-Meteo](https://open-meteo.com/?utm_source=chatgpt.com)

### Geocoding API

Used to convert city names into geographic coordinates:

```text
https://geocoding-api.open-meteo.com/v1/search
```

### Weather API

Used to retrieve current weather and forecast information:

```text
https://api.open-meteo.com/v1/forecast
```

### Units

The application uses metric units:

* 🌡️ Temperature: Celsius (°C)
* 💨 Wind Speed: meters per second (m/s)

---

## 📂 Project Structure

```text
Weather-App/
│
├── src/
│   ├── components/
│   │   ├── SearchBar
│   │   ├── WeatherCard
│   │   ├── Forecast
│   │   ├── Loader
│   │   └── ThemeToggle
│   │
│   ├── services/
│   │   └── weatherService.js
│   │
│   ├── hooks/
│   │   └── useWeather.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
│   └── ...
│
├── package.json
└── README.md
```

---

## 🔄 Application Flow

```text
User enters a city
        ↓
Geocoding API
        ↓
Latitude & Longitude
        ↓
Open-Meteo Weather API
        ↓
Weather Data
        ↓
React State
        ↓
Weather UI
```

For geolocation:

```text
User opens application
        ↓
Browser Geolocation API
        ↓
User's Coordinates
        ↓
Open-Meteo Weather API
        ↓
Current Weather + Forecast
```

---

## 💾 Local Storage

The application uses browser `localStorage` to persist:

* ⭐ Favorite cities
* 🌙 Selected theme

This allows preferences to remain available even after the browser is refreshed or reopened.

---

## 📱 Responsive Design

The UI adapts to different screen sizes:

| Device  | Supported |
| ------- | --------- |
| Desktop | ✅         |
| Laptop  | ✅         |
| Tablet  | ✅         |
| Mobile  | ✅         |

---

## 🚀 Future Improvements

Possible future improvements include:

* 🌧️ Hourly weather forecast
* 🌅 Sunrise and sunset information
* 🌡️ Temperature unit conversion (°C / °F)
* 💨 Detailed wind information
* 🌧️ Precipitation probability
* 🗺️ Weather map integration
* 📊 Weather charts
* 🔔 Severe weather notifications
* 🔎 Recent search history
* 🌍 More detailed location information

---

## 🎯 Project Objective

The goal of this project is to build a simple yet modern weather application while demonstrating practical frontend development concepts such as:

* React component architecture
* API integration
* Asynchronous JavaScript
* State management
* Browser geolocation
* Local storage
* Responsive web design
* Theme management
* Production deployment

---

## 🌐 Deployment

The application is deployed using **Netlify**.

**Live Website:**

[https://forcastweater.netlify.app/](https://forcastweater.netlify.app/?utm_source=chatgpt.com)

---

## 👨‍💻 Author

**Mohammed Zufar Baig**

B.E. — Information Science & Engineering

Interested in:

* Java Development
* Full-Stack Development
* React
* Web Development
* Software Engineering

---

## 📜 License

This project is created for learning, development, and portfolio purposes.

---

⭐ If you found this project useful, consider giving the repository a star!
