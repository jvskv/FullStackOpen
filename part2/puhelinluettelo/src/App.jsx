import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
    })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ... existingPerson, number: newNumber}

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Updated ${returnedPerson.name}`)
            setNotificationType('success')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage(`Failed to update ${newName}'s number`)
            setNotificationType('error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })

          return
      } else {
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(`Added ${returnedPerson.name}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
    .catch(error => {
      setNotificationMessage(`Failed to add ${newName}`)
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })

  console.log('Added', personObject.name, personObject.number)
}

  const filteredPersons = searchTerm
  ? persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : persons;

  const handleDeletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotificationMessage(`Deleted ${personToDelete.name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setNotificationType('error')
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const  handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        onDelete={handleDeletePerson} />
    </div>
  )
}

export default App
