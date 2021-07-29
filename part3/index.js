require("dotenv").config()
const express = require("express")

const cors = require("cors")

const Person = require("./models/person")
const morgan = require("./middleware/morgan")
const errorHandler = require("./middleware/errorHandler")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("build"))
app.use(morgan)

//routes
app.get("/api/persons", (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get("/info", (request, response) => {
    Person.countDocuments().then(count => {
        response.send(
            `<div>
                <p>Phonebook has info for ${count} people.</p>
                <p>${new Date()}</p>
            </div>`
        )
    })
    
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {response.json(person)}
            else {response.status(404).end}
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: "query"})
        .then(updatedPerson => {response.json(updatedPerson)})
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons/", (request, response, next) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({error: "name is missing"})
    }
    if (!body.number) {
        return response.status(400).json({error: "number is missing"})
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))

})

app.use(errorHandler)

//server
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)