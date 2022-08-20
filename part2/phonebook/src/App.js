import { useEffect, useState } from 'react'
import personServices from './services/persons'

const DisplayNumbers=({persons, filterVal, setPersons}) => {
  const filtered = []

  const deleteElement = (person) =>  {
    const number = person.number
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personServices.remove(number)
      .then(
        setPersons(persons.filter(temp => temp.id !== person.id))
      )
    }
  }

  persons.map(
    person=>person.name.toLowerCase().startsWith(filterVal.toLowerCase()) ? 
    filtered.push(person):console.log("Filtered")
  )
  return (
    filtered.map(person => 
    <li key={person.id}>{person.name} {person.number} <button onClick={()=>deleteElement(person)}
    >delete
    </button>
    </li>
  )
  )
}

const Filter=({filterVal, onChange}) => {
  return (
    <>
    filter shown with <input value={filterVal} onChange={onChange}/>
    </>
  )
}

const PersonForm = ({addNumber, newName, newNumber, onNameChange, onNumberChange}) => {
  return (
  <>
  <form onSubmit={addNumber}>
    <div>
      name: <input value={newName}
      onChange={onNameChange}/>
    </div>
    <div>
      number: <input value={newNumber}
      onChange={onNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </>
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  
  if (message == null) {
    return null
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  
  useEffect(() => {personServices.getAll()
    .then(response=>{setPersons(response)})}, [])

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setNewNumber('')
    setNewName('')


    if (persons.find(p => p.name === newPerson.name)){
    window.alert(`${newPerson.name} is already added to phonebook`) 
    } else {
      personServices.create(newPerson).then(response => {
        setAddedMessage(`${newName} has been added!`)
        setTimeout(() => {setAddedMessage(null)}, 5000)
        setPersons(persons.concat(response))
      })
    }
  }

  const handleNameChange = ({target}) => setNewName(target.value)
  const handleNumberChange = ({target}) => setNewNumber(target.value)
  const handleFilterChange = ({target}) => setFilterVal(target.value)

  return (
    <div>
      <Notification message={addedMessage}/>
      <h2>Phonebook</h2>
      <Filter 
      filterVal={filterVal} 
      onChange={handleFilterChange}
      />

      <h3>add a new</h3>

      <PersonForm 
      addNumber = {addNumber}
      newName = {newName}
      newNumber = {newNumber}
      onNameChange = {handleNameChange}
      onNumberChange = {handleNumberChange} 
      />

      <h3>Numbers</h3>

      <DisplayNumbers 
      persons={persons} 
      filterVal={filterVal}
      setPersons={setPersons}
      />
    </div>
  )
}

export default App