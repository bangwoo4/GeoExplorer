import React, { useState, useEffect } from "react";

function CountryAndCity() {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  //URL for Google Maps
  const openInGoogleMaps = (city, country) => {
    const query = encodeURIComponent(`${city}, ${country}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank");
  };

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

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error while fetching data: ", error);
      });
  }, []);

  {
    //console.log(data);
    //console.log("test");
  }

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
      <div className="mainFunctionDiv">
        {/* Jump into Google Maps */}
        <button
          className="jumpToGM"
          onClick={() => {
            if (city && country) {
              openInGoogleMaps(city, country);
            } else {
              alert("Select a country and a city first.");
            }
          }}
        >
          Jump into Google Maps
        </button>
      </div>
    </div>
  );
}

export default CountryAndCity;
