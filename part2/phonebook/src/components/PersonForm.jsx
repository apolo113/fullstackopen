const PersonForm = ({ addPerson, name, handleNameChange, number, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          <p>name: <input 
                  value={name}
                  onChange={handleNameChange}/>
          </p>
          <p>
          number: <input
                    value={number} 
                    onChange={handleNumberChange} 
                    />
          </p>
        </div>
        <div>debug: {name}</div>
        <div>
          <button type="submint">add</button>
        </div>
      </form>
  )
}

export default PersonForm