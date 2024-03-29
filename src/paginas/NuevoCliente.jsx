import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
        <p className='mt-3 md:text-lg'>Llena los siguiente campos para registrar un cliente.</p>

        <Formulario/>
    </>
  )
}

export default NuevoCliente