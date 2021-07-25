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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = (props) =>  {
  return <button onClick={props.action}>{props.text}</button>
}
const Statistics = (props) => {
  return(
    
    <div>
      <h1>Statistics</h1>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
    </div>
  )

}
export default App