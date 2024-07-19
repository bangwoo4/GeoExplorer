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

  //fetch news API
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
      <div className="maps" id="cityMaps">
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
      <div className="weather" id="cityWeather">
        {city && country && (
          <fieldset>
            <legend>
              Weather in <strong>{city}</strong>
            </legend>
            {weather && (
              <div className="weather-cards">
                <div className="weather-card">
                  <img
                    src={`http://openweathermap.org/img/w/${weather.weather?.[0]?.icon}.png`}
                    alt="weather icon"
                  />
                  <div className="weather-info">
                    {weather.weather?.[0]?.main ? (
                      <div>
                        <h4>{weather.weather[0].main}</h4>
                        <p>({weather.weather[0].description})</p>
                      </div>
                    ) : (
                      <p>Weather info not available</p>
                    )}
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Temperature</h4>
                    <p>{weather.main?.temp}°C</p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Humidity</h4>
                    <p>{weather.main?.humidity}%</p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Wind</h4>
                    <p>{weather.wind?.speed} m/s</p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Feels Like</h4>
                    <p>{weather.main?.feels_like}°C</p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Pressure</h4>
                    <p>{weather.main?.pressure} hPa</p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Visibility</h4>
                    <p>{weather.visibility} meters</p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Cloudiness</h4>
                    <p>{weather.clouds?.all}%</p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Sunrise</h4>
                    <p>
                      {new Date(
                        weather.sys?.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="weather-card">
                  <div className="weather-info">
                    <h4>Sunset</h4>
                    <p>
                      {new Date(
                        weather.sys?.sunset * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </fieldset>
        )}
      </div>
      {/* Display news about the city */}
      <div className="news" id="cityNews">
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
