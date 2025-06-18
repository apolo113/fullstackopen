import { useState , useEffect } from "react"
import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import axios from "axios"
import personService from "./services/personService.js"



const Notification = ({ message, danger }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}



function App() {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newfilter, setnewFilter] = useState("")
  const [filteredPerson, setFilteredPerson] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorDanger, setErrorDanger] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPerson => {
        setPerson(initialPerson)
        setFilteredPerson(initialPerson)
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }, [])

  console.log('render', person.length, 'persons')
  console.log(person)
  console.log('render', filteredPerson.length, 'persons')
  console.log(filteredPerson)

  const addPerson = (event) => {
    event.preventDefault()


    const personObject = {
      name: newName,
      number: newNumber   
    }

    if (person.some(p => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .remplaceNumber({ id: person.find(p => p.name === newName).id, newObject: personObject })
          .then(returnedPerson => {
            setPerson(person.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setFilteredPerson(person.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setErrorMessage(`PhoneNumber of ${newName} changed`)
            setErrorDanger(false)
            setTimeout(() => {
              setErrorMessage(null) 
            }, 5000)
          })
          .catch(error => {
            console.log('error:', error)
            setErrorMessage(` ${newName} has already been removed from server`)
            setErrorDanger(true)
            setTimeout(() => {
              setErrorMessage(null) 
            }, 5000)
          })


      }
      setNewName("")
      setNewNumber("")
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPerson(person.concat(returnedPerson))
        setFilteredPerson(person.concat(returnedPerson))
      })
      .catch(error => {
        console.log(error)
        alert("Error: " + error.response.data.error)
        setErrorMessage(error.response.data.error)
        console.log(error.response.data.error)
      })
    setErrorMessage(`Added ${newName}`)
    setErrorDanger(false)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setnewFilter(event.target.value)
    const filtered = person.filter(p =>
      p.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredPerson(filtered)
    console.log(filtered)
  }

  const deleterPersonOf = (id) => {
    personService
      .deleterPerson({ id, person: person.find(p => p.id === id)})
      .then(() => {
        setPerson(person.filter(p => p.id !== id))
        setFilteredPerson(filteredPerson.filter(p => p.id !== id))
      })
  }
 
  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={errorMessage} />
      <Filter filter={newfilter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons 
        filteredPerson={filteredPerson} 
        deleterPersonOf={deleterPersonOf}/>

    </div>
  )
}

export default App
