import React, { useState, useEffect, useRef } from "react";
import "./Feadhoot.css";
import appLogo from "./image/appLogo.png";

function Header() {
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const toggleAbout = () => setAbout(!about);
  const toggleContact = () => setContact(!contact);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAbout(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setContact(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="header">
      <div className="appName">
        <h1>GeoExplorer</h1>
        <img className="appLogo" src={appLogo} alt="App Logo"></img>
      </div>
      <div className="headerComponents">
        {/* Home */}
        <button
          className="headerButton"
          onClick={() => (window.location.href = "http://localhost:3000/")}
        >
          Home
        </button>
        {/* About */}
        <button className="headerButton" onClick={toggleAbout}>
          About
        </button>
        {about && (
          <div ref={aboutRef} className="info">
            <p>
              <strong>GeoExplorer</strong> is a web application that allows you
              to explore the world. You can select a country and a city to get
              the currency, dial code, and flag of that country. You can also
              jump into Google Maps to see the location of the selected city.
            </p>
            <button className="closeInfoButton" onClick={toggleAbout}>
              Close
            </button>
          </div>
        )}
        {/* Contact */}
        <button className="headerButton" onClick={toggleContact}>
          Contact
        </button>
        {contact && (
          <div ref={contactRef} className="info">
            <p>
              <strong>bangwoo4</strong>
              <br />
              <strong>nguyendinhbang53az@gmail.com</strong>
            </p>
            <button className="closeInfoButton" onClick={toggleContact}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
