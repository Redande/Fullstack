import React from "react";

const Filter = ({ filter, onChange }) => (
  <div>
    rajaa näytettäviä
    <input value={filter} onChange={onChange} />
  </div>
);

export default Filter;
