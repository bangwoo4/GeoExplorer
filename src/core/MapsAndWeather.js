import React, { useState, useEffect } from "react";

//URL for Google Maps
const openInGoogleMaps = (city, country) => {
  const query = encodeURIComponent(`${city}, ${country}`);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  window.open(url, "_blank");
};

const MapsAndWeather = ({ city, country }) => {
  const [weather, setWeather] = useState(null);

  //fetch weather API
  //from https://openweathermap.org
  useEffect(() => {
    if (city && country) {
      const apiKey = "2606acf332dffab932696f7ad59fb188"; //my API key
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
      fetch(weatherUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data: ", error);
        });
    }
  }, [city, country]);

  return (
    <div>
      {/* Jump into Google Maps */}
      <div className="maps">
        <button
          className="jumpToGM"
          onClick={() => {
            if (city && country) {
              openInGoogleMaps(city, country);
            } else {
              alert("Select a city first.");
            }
          }}
        >
          🗺️Locate <strong>{city}</strong> city in <em>Google Maps</em>
        </button>
      </div>
      {/* Display weather info in city */}
      <div className="weather">
        <fieldset>
          <legend>
            Weather in <strong>{city}</strong>
          </legend>
          {weather && (
            <div>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather icon"
              />
              <p>
                {weather.weather[0].main} ({weather.weather[0].description})
              </p>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>Feels like: {weather.main.feels_like}°C</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
              <p>Visibility: {weather.visibility} meters</p>
              <p>Cloudiness: {weather.clouds.all}%</p>
              <p>
                Sunrise:{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
              <p>
                Sunset:{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
};

export default MapsAndWeather;
