import React from 'react'
import Person from './Person'

const ListPersons = ( { persons, rem }) => {
    return (
        <div>
            <h2>Numerot</h2>
            <ul>{persons.map(person => <Person rem={rem} key={person.id} person={person} />)}</ul>
        </div>
    )
}

export default ListPersons