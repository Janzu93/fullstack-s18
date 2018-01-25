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
    render() {
        return(
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={() => this.setState({hyva: this.state.hyva + 1})} text="hyvä"/>
                <Button handleClick={() => this.setState({neutraali: this.state.neutraali +1})} text="neutraali"/>
                <Button handleClick={() => this.setState({huono: this.state.huono + 1})} text="huono"/>
                <Statistics state={this.state}/>
            </div>
        )
    }

}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({state}) => {
    if (state.hyva === 0 && state.neutraali === 0 && state.huono === 0) {
        return (
            <div><h1>statistiikka</h1><p>ei yhtään palautetta annettu</p></div>
        )
    }
    return (
    <div>
        <h1>statistiikka</h1>
        <Statistic text="hyvä" value={state.hyva}/>
        <Statistic text="neutraali" value={state.neutraali}/>
        <Statistic text="huono" value={state.huono}/>
        <Statistic text="keskiarvo" value={(state.hyva*1 + state.huono*-1) / (state.hyva + state.huono + state.neutraali)}/>
        <Statistic text="positiivisia" value={state.hyva / (state.hyva + state.neutraali + state.huono) * 100} text2="%"/>
    </div>
    )
}
    


const Statistic = ({text, value, text2}) => (
    <p>{text} {value} {text2}</p>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)