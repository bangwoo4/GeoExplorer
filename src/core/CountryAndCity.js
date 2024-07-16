import React, { useState, useEffect } from "react";

function CountryAndCity() {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCity("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

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
    
    console.log(data);
    console.log("test");

return (
  <div className="cac">
    <select value={country} onChange={handleCountryChange}>
      <option value="">Select a country</option>
      {data &&
        data.data &&
        data.data.map((country) => (
          <option key={country.country} value={country.country}>
            {country.country}
          </option>
        ))}
    </select>
    {selectedCountry && selectedCountry.cities && (
      <select value={city} onChange={handleCityChange}>
        <option value="">Select a city</option>
        {selectedCountry.cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    )}
  </div>
);
}

export default CountryAndCity;
