import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({message, error}) => {
  if (message === null) {
    return null
  }
  let name = 'completed'
  if (error) {
    name = 'error'
  }
  return (
    <div className = {name}>
      {message}
    </div>
  )
}

const Persons = ({persons, filter, deletePersonHandler}) => {

  const filtered = 
  filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <ul>
      {filtered.map(person => <li key={person.name}>{person.name} {person.number}<button onClick={() => deletePersonHandler(person)}>delete</button></li>)}
    </ul>
  )
}

const Filter = ({onChangeHandler}) => (
  <div>
    filter showna with <input onChange={onChangeHandler}/>
  </div>
)

const PersonForm = ({newNameHandler, newNumberHandler, addPersonHandler}) => (
  <form>
    <div>
      name: <input onChange={newNameHandler} />
      <br></br>
      number: <input onChange={newNumberHandler} />
    </div>
    <div>
      <button onClick={addPersonHandler} type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })}, [setPersons])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({message: null, error: null})
  
  if (message.message !== null) {
    setTimeout(() => {
      setMessage({message: null, error: null})
    }, 3000)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name === newName)
    if (found === undefined) {
      personService.create({name: newName, number: newNumber}).then(response => {
        setMessage({message: `Added ${newName}`, error: false})
        setPersons(persons.concat(response.data))})
        .catch(error => setMessage({message: error.response.data.error, error: true}))
    }
    else {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          personService.update(found.id, {name: newName, number: newNumber}).then(() => {
          setMessage({message: `Updated ${newName}'s number`, error: false})
          setPersons(persons.map(person => person.id === found.id ? {name: newName, number: newNumber, id: person.id} : person))
        }).catch(error => {setMessage({message: error.response.data.error, error: true})
        }
        )
      }
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteobj(person.id).then(() => {
        setMessage({message: `Deleted ${person.name}`, error: false})
        const copy = [...persons]
        copy.splice(copy.indexOf(person), 1)
        setPersons(copy)
      })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} error={message.error}/>
      <Filter onChangeHandler={handleNewFilter}/>
      <h2>Add new</h2>
      <PersonForm newNameHandler={handleNewName} newNumberHandler={handleNewNumber} addPersonHandler={handleAddPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} deletePersonHandler={deletePerson}/>
    </div>
  )

}

export default App