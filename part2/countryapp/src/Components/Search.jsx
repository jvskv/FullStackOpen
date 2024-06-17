import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (query.length === 0) {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const filteredCountries = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        );
        setCountries(filteredCountries);
        if (filteredCountries.length === 1) {
          setSelectedCountry(filteredCountries[0]);
        } else {
          setSelectedCountry(null);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [query]);

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find countries"
      />
      {countries.length > 10 && <p>Too many matches</p>}
      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShow(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>
            Languages: {Object.values(selectedCountry.languages).join(", ")}
          </p>
          <img
            src={selectedCountry.flags.svg}
            alt={`flag of ${selectedCountry.name.common}`}
            width="100"
          />
        </div>
      )}
    </div>
  );
};

export default Search;
