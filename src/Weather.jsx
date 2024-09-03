import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found or API error');
      setWeatherData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        &nbsp;<button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-details">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
          <p><strong>Feels Like:</strong> {weatherData.main.feels_like} °C</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
