import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    random() {
        return () => {
            const count = Math.floor((Math.random() * anecdotes.length))
            this.setState({ selected: count })
        }
    }

    vote(index) {
        return () => {
            const count = anecdotes[index].votes + 1
            anecdotes[index].votes = count
            this.forceUpdate()
        }
    }

    enitenAania() {
        let indexBiggest = 0
        let index = 0
        anecdotes.forEach((anecdote) => {
            if (anecdote.votes > anecdotes[indexBiggest]['votes']) {
                indexBiggest = index
            }
            index++
        })
        return indexBiggest
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]['text']}</p>
                <button onClick={this.random()}>next anecdote</button>
                <button onClick={this.vote(this.state.selected)}>vote</button>
                <p>votes: {this.props.anecdotes[this.state.selected].votes}</p>
                <h1>anecdote with most votes:</h1>
                <p>{this.props.anecdotes[this.enitenAania()]['text']}</p>
                <p>votes: {this.props.anecdotes[this.enitenAania()]['votes']}</p>
            </div>
        )
    }
}

const anecdotes = [
    { text: 'If it hurts, do it more often', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 }
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)