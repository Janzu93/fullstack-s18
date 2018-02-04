import React from 'react';
import Persons from './Persons';
import Input from './Input';
import AddPerson from './AddPerson';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: '',
    }
  }

  addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.find(p => p.name === personObject.name) ?
      this.state.persons : this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName: '',
      newNumber: ''
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const personsToShow = this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Input text="rajaa näytettäviä: " handleChange={this.handleFilterChange} />
        <AddPerson onSubmit={this.addName} handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} />
        <Persons persons={personsToShow} />
      </div>
    )
  }
}

export default App