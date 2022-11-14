const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

let persons = [
  {
    name: 'Ada Lovelace',
    number: '32434-234',
    id: 1
  },
  {
    name: 'Joe Smith',
    number: '23321-665',
    id: 2
  },
  {
    name: 'Heather Hamilton',
    number: '567456-5677',
    id: 3
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) response.json(person)
  else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})