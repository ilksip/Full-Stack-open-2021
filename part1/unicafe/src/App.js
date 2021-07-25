import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button action={() => setGood(good+1)} text="good"/>
      <Button action={() => setNeutral(neutral+1)} text="neutral"/>
      <Button action={() => setBad(bad+1)} text="bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = (props) =>  {
  return <button onClick={props.action}>{props.text}</button>
}
const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = (good/all)*100
  if (all !== 0) {
    return(
      <div>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={average}/>
        <Statistic text="positive" value={positive}/>
      </div>
    )
  }
  return(<p>No feedback given.</p>)
}

const Statistic = ({text, value}) => <p>{text}: {value}</p>
export default App