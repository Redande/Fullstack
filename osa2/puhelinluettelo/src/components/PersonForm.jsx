import React from "react";

const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      nimi: <input value={props.name} onChange={props.onNameChange} />
    </div>
    <div>
      numero: <input value={props.number} onChange={props.onNumberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
);

export default PersonForm;
