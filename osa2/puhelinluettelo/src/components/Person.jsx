import React from "react";

const Person = ({ person, removeHandler }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => removeHandler(person)}>poista</button>
  </div>
);

export default Person;
