import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const API_KEY = 'YOUR_API_KEY_HERE';
    const LOCATION = 'New York'; // Replace with your location

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  if (!weather) {
    return <p>Loading...</p>;
  }

  const temperature = weather.main.temp.toFixed(1);
  const condition = weather.weather[0].main;
  let iconUrl;

  switch (condition) {
    case 'Clear':
      iconUrl =
        'https://cdn.pixabay.com/photo/2015/04/22/14/30/sun-734219_1280.png';
      break;
    case 'Clouds':
      iconUrl =
        'https://cdn.pixabay.com/photo/2015/06/01/09/01/cloud-792981_1280.png';
      break;
    case 'Rain':
      iconUrl =
        'https://cdn.pixabay.com/photo/2015/05/20/02/37/rain-775477_1280.png';
      break;
    default:
      iconUrl =
        'https://cdn.pixabay.com/photo/2013/07/13/10/20/thunderstorm-156512_1280.png';
      break;
  }

  return (
    <div>
      <img src={iconUrl} alt={condition} />
      <p>{temperature}°C</p>
    </div>
  );
}

export default Weather;
