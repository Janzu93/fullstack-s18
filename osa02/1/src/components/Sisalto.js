import React from 'react'
const Sisalto = ({ osat }) => {
    const yhteensa = () => {
        let sum = 0
        osat.map(osa => sum += osa.tehtavia)
        return (
            sum
        )
    }
    return (
        <div>
            <ul>
                {osat.map(osa => <li key={osa.id}><p>{osa.nimi} {osa.tehtavia}</p></li>)}
                <li>tehtäviä yhteensä {yhteensa()}</li>
            </ul>
        </div>
    )
}

export default Sisalto