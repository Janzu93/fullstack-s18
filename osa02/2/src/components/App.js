import React from 'react'
import ListPersons from './ListPersons'
import Input from './Input'
import AddPerson from './AddPerson'
import personService from '../services/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
    }
  }

  addName = (event) => {
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }


    const persons = this.state.persons.find(p => p.name === personObject.name) ?
      this.state.persons : this.state.persons.concat(personObject)

    personService.create(personObject).then(res => this.setState({
      persons,
      newName: '',
      newNumber: ''
    }))
  }

  deleteName = (id) => {
    const arr = this.state.persons.slice(0).filter(e => e.id !== id)
    personService.remove(id).then(res => {
      if (res.status === 200) {
        this.setState({ persons: arr })
      }
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

  componentDidMount() {
    personService.getAll()
      .then(res => this.setState({ persons: res.data }))
  }
  render() {
    const personsToShow = this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Input text="rajaa näytettäviä: " handleChange={this.handleFilterChange} />
        <AddPerson onSubmit={this.addName} handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} />
        <ListPersons rem={this.deleteName} persons={personsToShow} />
      </div>
    )
  }
}

export default App