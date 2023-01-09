require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: Object.values(error.errors).map((val) => val.message)[0] });
  }

  next(error);
};

const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then((result) => {
    res.json(result);
  })
    .catch((error) => {
      next(error);
    });
});

app.get('/info', (req, res) => {
  Person.find({}).then((result) => {
    res.send(
      `<div>
        <p>Phonebook has info for ${result.length} people</p>
        <p>${new Date()}</p>
      </div>`,
    );
  })
    .catch((error) => {
      next(error);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).send({ error: 'id not found' });
    }
  })
    .catch((error) => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then((person) => {
    response.status(204).end();
  }).catch((error) => {
    next(error);
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, { name: request.body.name, number: request.body.number }, { new: true, runValidators: true, context: 'query' })
    .then((res) => {
      if (res) {
        response.json(res);
      } else {
        response.status(404).send({ error: 'id not found' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;
  if (body === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  }).catch((error) => {
    console.log(error);
    next(error);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
app.use(unknownEndpoint);
