import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const average = () => {
    return (good - bad) / (good + neutral + bad)
  }

  const positive = () => {
    return (good / (good + neutral + bad)) * 100
  }

  return (
    <div>
      <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={good + neutral + bad}/>
      <StatisticLine text="Average" value={average()}/>
      <StatisticLine text="Positive" value={positive() + " %"}/>
    </div>
  )
}


function App() {
  // guardar los clics de cada boton en su prorpio estado
  const [good,setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" handleClick={handleGoodClick}/>
      <Button text="Neutral" handleClick={handleNeutralClick}/>
      <Button text="Bad" handleClick={handleBadClick}/>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App
