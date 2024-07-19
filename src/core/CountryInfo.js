import React from "react";
import "./Country.css";

const CountryInfo = ({
  selectedCountryCurrency,
  selectedCountryDialCode,
  selectedCountryFlag,
  selectedCountryCapital,
  selectedCountryIsoCode,
}) => {
  return (
    <div className="mainFunctionDiv">
      {selectedCountryCurrency &&
        selectedCountryDialCode &&
        selectedCountryFlag &&
        selectedCountryCapital &&
        selectedCountryIsoCode && (
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
            {/* ISO code */}
            <div className="countryInfo">
              <span>
                <strong>{selectedCountryIsoCode.name}</strong>'s ISO code:{" "}
                <strong>{selectedCountryIsoCode.Iso3}</strong>
              </span>
            </div>
          </fieldset>
        )}
    </div>
  );
};

export default CountryInfo;
