import React, { useState, useEffect } from "react";
import "./MapsAndWeather.css";

//URL for Google Maps
const openInGoogleMaps = (city, country) => {
  const query = encodeURIComponent(`${city}, ${country}`);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  window.open(url, "_blank");
};

const MapsAndWeather = ({ city, country }) => {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState(null);

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

  // Fetch news API
  useEffect(() => {
    if (city) {
      const apiKey = "74582c5254af4892ae76224bd145c1bf"; //my API key
      const newsUrl = `https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`;
      fetch(newsUrl)
        .then((response) => response.json())
        .then((data) => {
          setNews(data.articles);
        })
        .catch((error) => {
          console.error("Error fetching news data: ", error);
        });
    }
  }, [city]);

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
        {city && country && (
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
                {weather && weather.sys && (
                  <p>
                    Sunrise:{" "}
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                  </p>
                )}
                {weather && weather.sys && (
                  <p>
                    Sunset:{" "}
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}
          </fieldset>
        )}
      </div>
      {/* Display news about the city */}
      <div className="news">
        {city && news && (
          <fieldset>
            <legend>
              News about <strong>{city}</strong>
            </legend>
            {news &&
              news.map((article, index) => (
                <div key={index}>
                  <a href={article.url} target="_blank" rel="noreferrer">
                    {article.title}
                  </a>
                </div>
              ))}
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default MapsAndWeather;
