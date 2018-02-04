import React from 'react'

const Sisalto = ({ osat }) => {
  
    return (
      <ul>
        {osat.map(osa => <li key={osa.id}><p>{osa.nimi} {osa.tehtavia}</p></li>)}
      </ul>
    )
  }

  export default Sisalto