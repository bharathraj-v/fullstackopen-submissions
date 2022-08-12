import { useState } from 'react'

const Button =(props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
} 

const StatisticLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td> 
    <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, bad, neutral}) => {
  return (
    good+bad+neutral !=0 ? 
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={good+bad+neutral}/>
        <StatisticLine text="average" value={(good-bad)/(good+bad+neutral)}/>
        <StatisticLine text="positive" value={((good/(good+bad+neutral)*100).toString().concat(" %"))}/>
      </tbody>
    </table>
    :
    <p>No feedback given</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
  }
  const handleBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good = {good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App