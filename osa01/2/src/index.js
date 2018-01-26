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

    handleClick = (positiivisuus) => {
        return () => {
            const uusiArvo = this.state[positiivisuus] + 1
            this.setState({ [positiivisuus]: uusiArvo })
        }
    }
    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.handleClick('hyva')} text='hyvä' />
                <Button handleClick={this.handleClick('neutraali')} text='neutraali' />
                <Button handleClick={this.handleClick('huono')} text='huono' />
                <Statistics state={this.state} />
            </div>
        )
    }

}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ state }) => {
    if (state.hyva === 0 && state.neutraali === 0 && state.huono === 0) {
        return (
            <div><h1>statistiikka</h1><p>ei yhtään palautetta annettu</p></div>
        )
    }
    return (
        <div>
            <h1>statistiikka</h1>
            <table>
                <tbody>
                    <Statistic text="hyvä" value={state.hyva} />
                    <Statistic text="neutraali" value={state.neutraali} />
                    <Statistic text="huono" value={state.huono} />
                    <Statistic text="keskiarvo" value={(state.hyva * 1 + state.huono * -1) / (state.hyva + state.huono + state.neutraali)} />
                    <Statistic text="positiivisia" value={state.hyva / (state.hyva + state.neutraali + state.huono) * 100} text2="%" />
                </tbody>
            </table>
        </div>
    )
}



const Statistic = ({ text, value, text2 }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
        <td>{text2}</td>
    </tr>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)