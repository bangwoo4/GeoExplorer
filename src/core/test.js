import { useState } from "react";
import "./Main.css";
import "./Main.css";

function Main() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const countries = [
    {
      name: "Viet Nam",
      cities: ["Ho Chi Minh", "Ha Noi", "Da Nang"],
    },
    {
      name: "US",
      cities: ["New York", "Los Angeles", "Chicago"],
    },
    {
      name: "UK",
      cities: ["London", "Manchester", "Liverpool"],
    },
  ];
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCity("");
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  // Tìm quốc gia được chọn để lấy danh sách thành phố
  const selectedCountry = countries.find((c) => c.name === country);

  return (
    <div className="main">
      {/* first dropdown */}
      <select value={country} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {/* second dropdown */}
      {selectedCountry && (
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
export default Main;
