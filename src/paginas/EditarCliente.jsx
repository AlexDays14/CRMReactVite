import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    const {id} = useParams();

    useEffect(() =>{
        async function obtenerClienteAPI(){
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
                setCargando(false);
            } catch (error) {
                console.log(error)
                setCargando(false);
            }
        }
        obtenerClienteAPI();
    }, [])

    console.log(cliente)

    return (
            <div>
                <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
                <p className='mt-3 md:text-lg'>Llena los siguiente campos para editar el cliente.</p>
                
                {cargando === true && <Spinner/> }
                {cliente?.id && cargando==false && <Formulario
                cliente = {cliente}
                cargando = {cargando}
                />}
                {!cliente.id && cargando==false && <p>ID No Válido</p>}
            </div>
    )
}

export default EditarCliente