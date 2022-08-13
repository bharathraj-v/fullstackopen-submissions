import { useState } from 'react'

const DisplayNumbers=({persons, filterVal}) => {
  const filtered = []
  persons.map(person=>person.name.toLowerCase().startsWith(filterVal.toLowerCase()) ? filtered.push(person):console.log("Filtered"))
  return (
    filtered.map(person => <li key={person.id}>{person.name} {person.number}</li>)
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  
  const addNumber = (event) => {
    event.preventDefault()
    persons.includes(newName) ? alert(`${newName} is already added to phonebook`)
    :
    setPersons([...persons, {name: newName, number:newNumber, id:persons.length+1}])
    setNewName('')

  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterVal(event.target.value)

  return (
    <div>
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
      />
    </div>
  )
}

export default App