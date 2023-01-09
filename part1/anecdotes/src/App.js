import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.name}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const votesArray = []
  for (var i = 0; i <= anecdotes.length; i++) {
    votesArray.push(0)
  }
  const [votes, newVote] = useState(votesArray)
  const [currentAnecdote, newCurrentAnecdote] = useState(0)
  const [anecdoteOfTheDay, newAnecdoteOfTheDay] = useState(0)

  const handleNewAnecdote = () => {
    newCurrentAnecdote(Math.floor(Math.random() * anecdotes.length))
  }

  const handleNewVote = () => {
    const copy = [...votes]
    copy[currentAnecdote] += 1
    newAnecdoteOfTheDay(copy.indexOf(Math.max(...copy)))
    console.log(anecdoteOfTheDay)
    newVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[currentAnecdote]}
      <br></br>
      {"has " + votes[currentAnecdote] + " votes"}
      <br></br>
      <Button handleClick = {handleNewAnecdote} name = "next anecdote"/>
      <Button handleClick = {handleNewVote} name="vote"/>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[anecdoteOfTheDay]}
      <br></br>
      {"has " + votes[anecdoteOfTheDay] + " votes"}
    </div>
  )
}

export default App