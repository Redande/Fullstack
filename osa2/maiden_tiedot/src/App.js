import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Country from "./components/Country";
import countryService from "./services/countryService";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then(updatedCountries => {
      setCountries(updatedCountries);
    });
  }, "");

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredCountries = () =>
    countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div className="App">
      <Filter value={filter} onChange={handleFilterChange} />
      {filter === "" ? (
        <div />
      ) : filteredCountries().length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries().length === 1 ? (
        <Country country={filteredCountries()[0]} />
      ) : (
        filteredCountries().map(country => (
          <div key={country.name}>
            {country.name}{" "}
            <button onClick={() => setFilter(country.name)}>show</button>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
