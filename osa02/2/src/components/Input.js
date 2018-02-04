import React from 'react'

const Input = ({text, handleChange}) => {
    return (
        <div>
            {text}<input onChange={handleChange} />
        </div>
    )
}
export default Input