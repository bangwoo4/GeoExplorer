import React, { useState, useEffect } from "react";
import CountryInfo from "./CountryInfo";

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
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(
        ([countriesData, currencyData, codesData, flagData, capitalData]) => {
          setData(countriesData);
          setCurrencies(currencyData);
          setDialCode(codesData);
          setFlag(flagData);
          setCapital(capitalData);
        }
      )
      .catch((error) => {
        alert("Error while fetching data: ", error);
      });
  }, []);

  //console.log(data);
  //console.log("test");

  return (
    <div className="cac">
      <div className="searchBox">
        <button onClick={toggleShowSearch} className="toggleSearchButton">
          Search
        </button>
        {showSearch && (
          <div className="searchBar">
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
      {/* Display country's info */}
      <CountryInfo
        selectedCountryCurrency={selectedCountryCurrency}
        selectedCountryDialCode={selectedCountryDialCode}
        selectedCountryFlag={selectedCountryFlag}
        selectedCountryCapital={selectedCountryCapital}
        city={city}
        country={country}
      />
    </div>
  );
}

export default TargetSelector;
