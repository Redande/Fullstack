import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updatePersons = () => {
    personService.getAll().then(updatedPersons => {
      setPersons(updatedPersons);
    });
  };

  useEffect(() => {
    updatePersons();
  }, []);

  const showSuccessfulMessageForFiveSeconds = message => {
    setSuccessfulMessage(message);
    setTimeout(() => {
      setSuccessfulMessage("");
    }, 5000);
  };

  const showErrorMessageForFiveSeconds = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const addPersonToDb = personObject => {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        showSuccessfulMessageForFiveSeconds(`Lisättiin ${personObject.name}`);
      })
      .catch(error => {
        showErrorMessageForFiveSeconds(
          `Jotakin meni pieleen, minkä vuoksi henkilöä ${
            personObject.name
          } ei välttämättä lisätty puhelinluetteloon`
        );
        updatePersons();
      });
  };

  const updatePerson = (name, personObject) => {
    const person = persons.find(person => person.name === newName);
    personService
      .update(person.id, personObject)
      .then(() => {
        updatePersons();
        showSuccessfulMessageForFiveSeconds(
          `Päivitettiin henkilön ${personObject.name} numero`
        );
      })
      .catch(error => {
        showErrorMessageForFiveSeconds(
          `Jotakin meni pieleen, minkä vuoksi henkilön ${
            personObject.name
          } numeroa ei välttämättä päivitetty`
        );
        updatePersons();
      });
  };

  const addPerson = event => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    if (persons.map(person => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        updatePerson(newName, personObject);
      }
    } else {
      addPersonToDb(personObject);
    }
  };

  const removePerson = person => {
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => {
          updatePersons();
          showSuccessfulMessageForFiveSeconds(`Poistettiin ${person.name}`);
        })
        .catch(error => {
          showErrorMessageForFiveSeconds(
            `Jotakin meni pieleen, minkä vuoksi henkilöä ${
              person.name
            } ei välttämättä poistettu puhelinluettelosta`
          );
          updatePersons();
        });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Notification type="success" message={successfulMessage} />
      <Notification type="error" message={errorMessage} />
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>lisää uusi</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numerot</h3>
      <Persons
        persons={persons}
        filter={filter}
        handlePersonRemove={removePerson}
      />
    </div>
  );
};

export default App;
