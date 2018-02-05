import React from 'react'
const Person = ({ person, rem }) => {
    return (
        <div key={person.id}>{person.name} {person.number}<button onClick={() => rem(person.id)}>poista</button></div>
    )
}
export default Person