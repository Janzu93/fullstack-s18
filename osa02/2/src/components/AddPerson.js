import React from 'react'
import Input from './Input'

const AddPerson = ({ onSubmit, handleNameChange, handleNumberChange }) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={onSubmit}>
                <Input text="nimi: " handleChange={handleNameChange} />
                <Input text="numero: " handleChange={handleNumberChange} />
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson