import React from "react";
import "./Country.css";

//URL for Google Maps
const openInGoogleMaps = (city, country) => {
  const query = encodeURIComponent(`${city}, ${country}`);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  window.open(url, "_blank");
};

const CountryInfo = ({
  selectedCountryCurrency,
  selectedCountryDialCode,
  selectedCountryFlag,
  selectedCountryCapital,
  city,
  country,
}) => {
  return (
    <div className="mainFunctionDiv">
      {selectedCountryCurrency &&
        selectedCountryDialCode &&
        selectedCountryFlag && (
          <fieldset className="countryFieldset">
            <legend>
              <strong>{selectedCountryCurrency.name}</strong>'s info:{" "}
            </legend>
            {/* flag */}
            {selectedCountryFlag && (
              <div className="countryFlag">
                <img
                  className="flagimg"
                  src={selectedCountryFlag.flag}
                  alt={selectedCountryFlag.name}
                />
              </div>
            )}
            {/* capital */}
            <div className="countryInfo">
              <span>
                <strong>{selectedCountryCapital.name}</strong>'s capital:{" "}
                <strong>{selectedCountryCapital.capital}</strong>
              </span>
            </div>

            {/* currency */}
            <div className="countryInfo">
              <span>
                <strong>{selectedCountryCurrency.name}</strong>'s currency:{" "}
                <strong>{selectedCountryCurrency.currency}</strong>
              </span>
            </div>
            {/* dial code */}
            <div className="countryInfo">
              <span>
                <strong>{selectedCountryDialCode.name}</strong>'s dial code:{" "}
                <strong>{selectedCountryDialCode.dial_code}</strong>
              </span>
            </div>
          </fieldset>
        )}
      <div>
        {/* Jump into Google Maps */}
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
    </div>
  );
};

export default CountryInfo;
