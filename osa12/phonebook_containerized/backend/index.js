const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

let persons = [
    {
      id: 1,
      name: "Pekka",
      number: "1234",
    },
    {
      id: 2,
      name: "Jari Nappi",
      number: "213414",
    },
    {
      id: 3,
      name: "Moona Lakki",
      number: "32423432",
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const oldPerson = persons.find(person => person.id === id)
  if (oldPerson) {
    request.body.id = oldPerson.id
    persons = persons.map(person => person.name === oldPerson.name ? request.body : person)
    response.json(response.body)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
    const id = Math.random()*10000
    const newPerson = request.body
    if (!newPerson.name || !newPerson.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    if(persons.find(person => person.name === newPerson.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
    newPerson.id = id
    persons = persons.concat(newPerson)
    response.json(newPerson)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})