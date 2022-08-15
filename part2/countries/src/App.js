import { useEffect, useState} from 'react'
import axios from 'axios'


const Filter = ({filterVal, onChange}) => {
  return (
    <>
    find countries <input value={filterVal} onChange={onChange}/>
    </>
  )
}



const Display = ({countries, search, setSearch}) => {
  const filtered = countries.filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))
  return filtered.length >1 || filtered.length === 0?
  filtered.map(
    country=> 
    <p key={filtered.indexOf(country)}> 
    {country.name.common+"\t"}
    <button onClick = {()=>setSearch(country.name.common)}>show</button>
    </p>
    )
  : <DisplayCountryData country={filtered[0]}/>
}

const DisplayCountryData = ({country}) => {
  return (
    <div>
    <h1>{country.name.common}</h1>
    <li>Capital: {country.capital[0]}</li>
    <li>Area: {country.area}</li>
    <p/>
    <b>Languages:</b>
    <ul>
    {Object.values(country.languages).map(
      language => <li key={Object.values(country.languages).indexOf(language)}>{language}</li>)}
    </ul>
    <img src={country.flags.png}/>
    </div>
  )
}


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      const countryData = response.data
      setCountries(countryData)
    })
  }, [])

  const handleSearchChange = (event) => setSearch(event.target.value)
  return (
  <>
  <Filter filterVal={search} onChange={handleSearchChange}/>
  <Display countries={countries} search={search} setSearch={setSearch}/>
  </>
  )


}

export default App