import Person from './Person'

const Persons = ({ filteredPersons, onDelete }) => (
  <ul>
    {filteredPersons.map(person => 
      <Person key={person.id} person={person} onDelete={onDelete} />
    )}
  </ul>
)

export default Persons;
