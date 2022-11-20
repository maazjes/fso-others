import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )

const Statistics = ({parts}) => {
    if (parts[3].value == 0) {
      return "no feedback given"
    }
    return (
    <table>
      <tbody>
        {parts.map(value => (
        <StatisticLine key={value.name} text = {value.name} value = {value.value}/>
        ))}
      </tbody>
    </table>
    )
  }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const parts = [
    {
      name: "good",
      value: good
    },
    {
      name: "neutral",
      value: neutral
    },
    {
      name: "bad",
      value: bad
    },
    {
      name: "all",
      value: good + neutral + bad
    },
    {
      name: "average",
      value: (good*1 + bad*-1) / (good + neutral + bad)
    },
    {
      name: "positive",
      value: 100* (good / (good + neutral + bad)) + " %"
    }
  ]

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => setGood(good + 1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad + 1)} text = "bad"/>
      <h1>statistics</h1>
      <Statistics parts = {parts}/>
    </div>
  )
}

export default App