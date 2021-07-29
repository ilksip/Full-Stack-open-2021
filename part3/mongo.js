const mongoose = require("mongoose")
const password = process.argv[2]
const url = `mongodb+srv://pb_app:${password}@pb-app.qofre.mongodb.net/PB-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model("person", personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(() => {
        console.log("success!")
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    console.log("Phonebook")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name}: ${person.number}`)
        })
        mongoose.connection.close()
    })
}