import React from "react";
import Person from "./Person";

const Persons = ({ persons, filter, handlePersonRemove }) => (
  <div>
    {persons
      .filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map(person => (
        <Person key={person.name} person={person} removeHandler={handlePersonRemove} />
      ))}
  </div>
);

export default Persons;
