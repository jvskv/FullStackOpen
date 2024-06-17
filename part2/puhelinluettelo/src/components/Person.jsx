const Person = ({ person, onDelete }) => (
    <li>
      {person.name} {person.number} 
      <button onClick={() => onDelete(person.id)}>Delete</button>
    </li>
  );
  
export default Person;