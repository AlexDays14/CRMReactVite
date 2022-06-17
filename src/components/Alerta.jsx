import React from 'react'

const Alerta = ({children, color}) => {

    color = !color ? 'red-600' : color
    return (
        <div 
        className={`text-center my-4 bg-${color} text-white font-bold p-3 uppercase`}
        >
            {children}
        </div>
    )
}

export default Alerta