const { default: mongoose } = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit
}

const password = process.argv[2]

const url = `mongodb+srv://yaskarahimu:${password}@puhelinluettelo.8pyriuq.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (person.name != undefined && person.number != undefined) {
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('phonebook: ')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
