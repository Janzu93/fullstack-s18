import React from 'react'
const Sisalto = ({ osat }) => {
    const reducer = function add(summa, osa) {return summa + osa.tehtavia}
    const yhteensa = osat.reduce(reducer, 0)
    
    return (
        <div>
            <ul>
                {osat.map(osa => <li key={osa.id}><p>{osa.nimi} {osa.tehtavia}</p></li>)}
                <li>tehtäviä yhteensä {yhteensa}</li>
            </ul>
        </div>
    )
}

export default Sisalto