import { useEffect, useState } from 'react'
import personsService from './services/persons'

const Filter = ({filterStr, handler}) => {
  return (
    <div>
      filter shown with <input value={filterStr}
      onChange={handler} />
    </div>
  )
}

const FormField = ({ text, value, handler }) => {
  return (
    <div>
    {text} <input value={value}
    onChange={handler}
    />
  </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <FormField text="name:" value={props.newName} handler={props.handleNameChange}/>
      <FormField text="number:" value={props.newNumber} handler={props.handleNumberChange}/>
      <div>
        <button type="submit" onClick={props.addPerson}>add</button>
      </div>
    </form>
  )
}

const Entry = ({ person, buttonHandler }) => <div>{person.name} {person.number} <button onClick={buttonHandler}>delete</button></div>

const Persons = ({ personsToShow, handleDeletion }) => {
  return (
    <div>
    {personsToShow.map(person =>
      <Entry
      key={person.name}
      person={person}
      buttonHandler={handleDeletion(person)}
      />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setNewFilter] = useState('')
  const [personsToShow, setNewPersonsToShow] = useState(persons)

  // Initialize person array
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  // Add person to person array
  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    // Check if the name is already in the phonebook
    const existingPerson = persons.find(element => element.name === newName)
    if (existingPerson) {
      const proceed = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)
      // Replace name entry if the user accepts the confirm message
      if (proceed) {
        personsService
          .replace(existingPerson.id, newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
      }
    } else {
      // If no existing person, create a new entry
      personsService
      .create(newPersonObject)
      .then(returnedPerson => 
        setPersons(persons.concat(returnedPerson)
        ))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setNewFilter(event.target.value)

  // Deletion button event handler factory
  const handleDeletion = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)){
      personsService.makeDeletion(person.id)
      setPersons(persons.filter(entry => entry.id !== person.id))
    }
  }

  // Update displayed persons when filter is changed
  useEffect(() => {
    setNewPersonsToShow(persons.filter(person => person.name.toUpperCase().includes(filterStr.toUpperCase())))
  }, [persons, filterStr])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterStr={filterStr} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App