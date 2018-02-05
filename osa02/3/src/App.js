import React from 'react'
import axios from 'axios'
import Country from './components/Country';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }
  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }
  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => this.setState({ countries: res.data }))
  }
  render() {
    const countriesToShow = this.state.countries.filter(c => c.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <p>find countries: <input onChange={this.handleFilterChange} /></p>
        {countriesToShow.length > 10 ? <ul><li>Too many matches</li></ul> : 
        (countriesToShow.length !== 1 ? <ul>{countriesToShow.map(c => <li key={c.name}>{c.name}</li>)}</ul> : <Country country={countriesToShow[0]} />)}
      </div>
    );
  }
}

export default App;
