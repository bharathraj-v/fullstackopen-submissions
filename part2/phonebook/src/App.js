import axios from 'axios'
import { useEffect, useState } from 'react'

import personServices from './services/persons'

const DisplayNumbers=({persons, setPersons, filterVal}) => {
  const filtered = []
  
  const deleteElement = (person) =>  {
   
    const newPerson = person
    newPerson.delete = true
    window.confirm(`Are you sure you want to delete ${person.name}?`) &&
    personServices.update(person.id, newPerson)
    .then(returnedPerson => {
      setPersons(persons.map(temp => temp.id !== person.id ? temp : returnedPerson))
    })

  }

  persons.map(person=>person.name.toLowerCase().startsWith(filterVal.toLowerCase()) ? filtered.push(person):console.log("Filtered"))
  return (
    filtered.map(person => 
      person.delete !==true &&
    <li key={person.id}>{person.name} {person.number} <button onClick={()=>deleteElement(person)}>delete</button></li>
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

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  
  useEffect(() => {personServices.getAll()
    .then(response=>{setPersons(response)})}, [])

  const addNumber = (event) => {
    event.preventDefault()
    persons.includes(newName) ? 
    window.alert(`${newName} is already added to phonebook`)
    :
    personServices.create({name: newName, number:newNumber, delete:false, id:persons.length+1})
    .then(response => {
      setPersons(persons.concat(response))
      setNewName("")
    })
    
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
      setPersons={setPersons}
      />
    </div>
  )
}

export default App