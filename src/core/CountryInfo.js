import React from "react";

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
  city,
  country,
}) => {
  return (
    <div className="mainFunctionDiv">
      {selectedCountryCurrency &&
        selectedCountryDialCode &&
        selectedCountryFlag && (
          <fieldset>
            <legend>
              <strong>{selectedCountryCurrency.name}</strong>'s info:{" "}
            </legend>
            {/* flag */}
            {selectedCountryFlag && (
              <div className="countryInfo">
                <span>
                  <strong>{selectedCountryFlag.name}</strong>'s flag:{" "}
                  <img
                    src={selectedCountryFlag.flag}
                    alt={selectedCountryFlag.name}
                    width="30"
                  />
                </span>
              </div>
            )}
            {/* currency */}
            <div className="countryInfo">
              <span>
                <strong>{selectedCountryCurrency.name}</strong>'s currency:{" "}
                {selectedCountryCurrency.currency}
              </span>
            </div>
            {/* dial code */}
            <div className="countryInfo">
              <span>
                <strong>{selectedCountryDialCode.name}</strong>'s dial code:{" "}
                {selectedCountryDialCode.dial_code}
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
