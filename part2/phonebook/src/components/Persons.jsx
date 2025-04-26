const Person = ({ person, deleterPerson }) => {
  return (
    <li key={person.name}>
      {person.name} {person.number} 
      <button onClick={deleterPerson}>Deleter</button>
    </li>
  )
}


const Persons = ({ filteredPerson, deleterPersonOf }) => {
  return (
    <ul>
      {filteredPerson.map((p, i) => 
        <Person 
          key ={i} 
          person = {p}
          deleterPerson={() => deleterPersonOf(p.id)}/>)}
    </ul>
  )
}

export default Persons