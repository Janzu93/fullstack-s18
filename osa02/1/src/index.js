import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}
const Kurssi = (props) => {
  const { kurssi } = props
  return (
  <div>
    <Otsikko kurssi={kurssi} />
    <Sisalto kurssi={kurssi} />
  </div>
  )
}
const Otsikko = (props) => {
  const { kurssi } = props
  return (
    <h1>{kurssi.nimi}</h1>
  )
}
const Sisalto = (props) => {
  const { kurssi } = props
  return (
    <ul>{kurssi.osat.map(osa => <li key={osa.id}><p>{osa.nimi} {osa.tehtavia}</p></li>)}</ul>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
