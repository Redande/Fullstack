import React from "react";

const Country = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        height="20%"
        width="20%"
        alt="the country's flag"
      />
    </div>
  );
};

export default Country;
