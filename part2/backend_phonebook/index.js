require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');

const Person = require('./models/person');

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next();
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformattted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    } else if (error.number === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(requestLogger);


app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result);
    })
})

// Crear una nueva entrada
app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    
    if(body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'name or number missing' });
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch((error) => next(error))
})

// Eliminar una entrada
app.delete('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id);
    Person.findByIdAndDelete(request.params.id, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error))
})

// Cambiar una entrada
app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body;



    Person.findByIdAndUpdate(
        request.params.id, 
        { name, number}, 
        {new: true, runValidators: true, context: 'query'}
    )
        .then(updatePerson => {
            response.json(updatePerson);
        })
        .catch(error => next(error))
})

// Obtener una entrada por id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            }
            else {
                response.status(404).end();
            }
        })
        .catch(error => {
            console.log(error);
            next(error);
        })
})

// Obtener la cantidad de entradas
app.get('/api/info', (request, response) => {
    Person.find({}).then(result => {
        const count = result.length;
        const date = new Date();
        const info = `
            <p>Phonebook has info for ${count} people</p>
            <p>${date}</p>
        `;
        response.send(info);
    })
})



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})