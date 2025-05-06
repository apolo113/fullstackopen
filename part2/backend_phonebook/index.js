const express = require('express');

const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

persons =[
    { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    }
]



app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).send({ error: 'Person not found' });
    }
})

app.get('/info', (request, response) => {
    const date = new Date();
    const n_persons = persons.length;
    response.send(`Phonebook has info for ${n_persons} people <br> ${date}`);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id);
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    const id = Math.floor(Math.random() * 1000) + 1;
    const person = {
        id: id,
        name: body.name,
        number: body.number
    }
    if (!body.name || !body.number) {
        return response.status(400).json({error: 'name or number missing'})
    } else if (persons.some(p => p.name === body.name)) {
        return response.status(400).json({error: 'name must be unique'})
    }

    persons = persons.concat(person);
    response.json(person);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})