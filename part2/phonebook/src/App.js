import { useState } from 'react'

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

const Entry = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ personsToShow }) => {
  return (
    <div>
    {personsToShow.map(person =>
      <Entry key={person.name} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setNewFilter] = useState('')
  const [personsToShow, setNewPersonsToShow] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()

    console.log('adding person')
    console.log(newName)
    console.log(newNumber)

    const personObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }

    const nameExists = persons.find(element => element.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }

    const newPersonsArray = (nameExists
      ? [...persons]
      : persons.concat(personObject)
      )

    setPersons(newPersonsArray)
    setNewName('')
    setNewNumber('')

    setNewPersonsToShow(newPersonsArray.filter(person => person.name.toUpperCase().includes(filterStr.toUpperCase())))

  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => {
    setNewFilter(event.target.value)

    const str = event.target.value
    const personsCopy = [...persons].filter(person => person.name.toUpperCase().includes(str.toUpperCase()))
    setNewPersonsToShow(personsCopy)
  }

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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App