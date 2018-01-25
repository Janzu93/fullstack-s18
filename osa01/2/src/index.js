import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    keskiarvo() {
        return (
            (this.state.hyva*1 + this.state.huono*-1) / (this.state.hyva + this.state.huono + this.state.neutraali)
        )
    }

    positiivisia() {
        return (
            this.state.hyva / (this.state.hyva + this.state.neutraali + this.state.huono) * 100
        )
    }
    render() {
        return(
            <div>
                <h1>anna palautetta</h1>
                <button onClick={() => this.setState({hyva: this.state.hyva + 1})}>hyvä</button>
                <button onClick={() => this.setState({neutraali: this.state.neutraali +1})}>neutraali</button>
                <button onClick={() => this.setState({huono: this.state.huono + 1})}>huono</button>
                <h1>statistiikka</h1>
                <p>hyvä {this.state.hyva}</p>
                <p>neutraali {this.state.neutraali}</p>
                <p>huono {this.state.huono}</p>
                <p>keskiarvo {this.keskiarvo()}</p>
                <p>positiivisia {this.positiivisia()} %</p>
            </div>
        )
    }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)