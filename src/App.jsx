import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const fetchWeatherData = async () => {
    if (location.trim()) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
      setLocation('');
    }
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
    }
  };

  return (
    <div className="app">
      <div className="search">
        <div className="search-container">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}  
            placeholder="Enter Location"
            type="text"
          />
          <IoMdSearch className="search-icon" onClick={fetchWeatherData} />
        </div>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>

        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main && <p className="bold">{data.main.feels_like.toFixed()}°F</p>}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind && <p className="bold">{data.wind.speed.toFixed()} MPH</p>}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
