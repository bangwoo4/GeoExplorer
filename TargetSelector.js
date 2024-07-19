import React, { useState, useEffect } from "react";
import CountryInfo from "./CountryInfo";
import MapsAndWeather from "./MapsAndWeather";

function TargetSelector() {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  //currencies
  const [currencies, setCurrencies] = useState("");
  //dial code
  const [dialCode, setDialCode] = useState("");
  //flag
  const [flag, setFlag] = useState("");
  //capital
  const [capital, setCapital] = useState("");
  //ISO code
  const [isoCode, setIsoCode] = useState("");

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCity("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountrySearchChange = (e) => {
    setCountrySearch(e.target.value);
    setCitySearch("");
  };

  const handleCitySearchChange = (e) => {
    setCitySearch(e.target.value);
  };

  const toggleShowSearch = () => setShowSearch(!showSearch);

  const selectedCountry =
    data && data.data ? data.data.find((c) => c.country === country) : null;
  const selectedCountryCurrency =
    currencies && currencies.data
      ? currencies.data.find((c) => c.name === country)
      : null;
  const selectedCountryDialCode =
    dialCode && dialCode.data
      ? dialCode.data.find((c) => c.name === country)
      : null;
  const selectedCountryFlag =
    flag && flag.data ? flag.data.find((c) => c.name === country) : null;
  const selectedCountryCapital =
    capital && capital.data
      ? capital.data.find((c) => c.name === country)
      : null;
  const selectedCountryIsoCode =
    isoCode && isoCode.data
      ? isoCode.data.find((c) => c.name === country)
      : null;

  /*
  Fetch data
  API provided from: https://documenter.getpostman.com/view/1134062/T1LJjU52
  */

  useEffect(() => {
    Promise.all([
      fetch("https://countriesnow.space/api/v0.1/countries"),
      fetch("https://countriesnow.space/api/v0.1/countries/currency"),
      fetch("https://countriesnow.space/api/v0.1/countries/codes"),
      fetch("https://countriesnow.space/api/v0.1/countries/flag/images"),
      fetch("https://countriesnow.space/api/v0.1/countries/capital"),
      fetch("https://countriesnow.space/api/v0.1/countries/iso"),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(
        ([
          countriesData,
          currencyData,
          codesData,
          flagData,
          capitalData,
          isoCodeData,
        ]) => {
          setData(countriesData);
          setCurrencies(currencyData);
          setDialCode(codesData);
          setFlag(flagData);
          setCapital(capitalData);
          setIsoCode(isoCodeData);
        }
      )
      .catch((error) => {
        alert("Error while fetching data: ", error);
      });
  }, []);

  //console.log(data);
  //console.log("test");

  /* smooth scrolling href */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  return (
    <div className="cac">
      <div className="searchBox">
        <button onClick={toggleShowSearch} className="toggleSearchButton">
          Search
        </button>
        {showSearch && (
          <div className="searchBar">
            <div className="searchBarInput">
              {/* search countries */}
              <input
                type="text"
                value={countrySearch}
                onChange={handleCountrySearchChange}
                placeholder="Search for a country 🎌"
              ></input>
              {/* search cties */}
              <input
                type="text"
                value={citySearch}
                onChange={handleCitySearchChange}
                placeholder="Search for a city 🌆"
              ></input>
            </div>
            {/* clear button */}
            <button
              onClick={() => {
                setCitySearch("");
                setCountrySearch("");
              }}
              className="clearButton"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <div className="selectBox">
        {/* select countries */}
        <fieldset>
          <legend>Select a country ⤵️</legend>
          <select value={country} onChange={handleCountryChange}>
            <option value="">Select a country</option>
            {data &&
              data.data &&
              data.data
                .filter((item) =>
                  item.country
                    .toLowerCase()
                    .includes(countrySearch.toLowerCase())
                )
                .map((item) => (
                  <option value={item.country} key={item.country}>
                    {item.country}
                  </option>
                ))}
          </select>
        </fieldset>
        {/* select cities */}
        <fieldset>
          <legend>Select a city ⤵️</legend>
          {selectedCountry ? (
            <select value={city} onChange={handleCityChange}>
              <option value="">Select a city</option>
              {selectedCountry.cities
                .filter((city) =>
                  city.toLowerCase().includes(citySearch.toLowerCase())
                )
                .map((city) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
            </select>
          ) : (
            <option value="" disabled>
              No country selected
            </option>
          )}
        </fieldset>
        <button
          className="clearButton2"
          onClick={() => {
            setCity("");
            setCountry("");
          }}
        >
          Clear Select
        </button>
      </div>
      {country && city && (
        <div className="tableOfContents">
          <nav>
            <h3>Overview</h3>
            <ul>
              <li>
                <a href="#top">Top page</a>
              </li>
              <div className="divider"></div>
              <li>
                <a href="#displayCountryInfo">{country} Info</a>
              </li>
              <li>
                <a href="#cityMaps">{city} maps</a>
              </li>
              <li>
                <a href="#cityWeather">{city} weather</a>
              </li>
              <li>
                <a href="#cityNews">{city} news</a>
              </li>
              <div className="divider"></div>
              <li>
                <a href="#end">End page</a>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Display country's info */}
      <div className="displayCountryInfo" id="displayCountryInfo">
        <CountryInfo
          selectedCountryCurrency={selectedCountryCurrency}
          selectedCountryDialCode={selectedCountryDialCode}
          selectedCountryFlag={selectedCountryFlag}
          selectedCountryCapital={selectedCountryCapital}
          selectedCountryIsoCode={selectedCountryIsoCode}
        />
      </div>
      {/* Display maps and weather */}
      <div className="displayCityInfo" id="displayCityInfo">
        <MapsAndWeather city={city} country={country} />
      </div>
    </div>
  );
}

export default TargetSelector;
