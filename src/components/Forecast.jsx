/**
 * Forecast Component - 5-day weather forecast
 * Processes API data (3-hour intervals) into daily forecast
 */

import './Forecast.css';

const ICON_URL = 'https://openweathermap.org/img/wn/';

/**
 * Group forecast list by day and pick noon data (or first available)
 */
function groupByDay(forecastList) {
  const byDay = {};

  forecastList?.forEach((item) => {
    const date = item.dt_txt?.split(' ')[0];
    if (!date) return;
    if (!byDay[date]) {
      byDay[date] = item;
    }
    // Prefer noon (12:00) if available
    const hour = item.dt_txt?.split(' ')[1]?.split(':')[0];
    if (hour === '12') {
      byDay[date] = item;
    }
  });

  const entries = Object.entries(byDay);
  return entries.slice(0, 5).map(([date, data]) => ({ date, ...data }));
}

/**
 * Format date for display (e.g., "Wed, Feb 18")
 */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return d.toLocaleDateString(undefined, options);
}

export default function Forecast({ forecast }) {
  if (!forecast?.list?.length) return null;

  const daily = groupByDay(forecast.list);

  return (
    <div className="forecast glass-card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {daily.map((day) => {
          const icon = day.weather?.[0]?.icon || '01d';
          const temp = day.main?.temp;
          return (
            <div key={day.date} className="forecast-item">
              <span className="forecast-date">{formatDate(day.date)}</span>
              <img
                src={`${ICON_URL}${icon}@2x.png`}
                alt={day.weather?.[0]?.description || 'Weather'}
                className="forecast-icon"
              />
              <span className="forecast-temp">{Math.round(temp ?? 0)}°C</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
