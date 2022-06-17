import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner";

const VerCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    const {id} = useParams();

    useEffect(() =>{
        async function obtenerClienteAPI(){
            try {
                const url = `${import.meta.env.VITE_API_URL}/clientes/${id}`
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error)
            }
            setCargando(false);
        }
        obtenerClienteAPI();
    }, [])

    return (

        <>
            
                <>
                    <h1 className='font-black text-4xl text-blue-900'>Ver Cliente</h1>
                    <p className='mt-3 md:text-lg'>Información del Cliente.</p>

                    {cargando ? 
                    <Spinner/> :
                    Object.keys(cliente).length === 0 ? 
                    <p>No Hay Resultados</p> :
                    (

                    <div className="md:w-2/4 mt-10 mx-auto bg-white py-10 px-5 rounded-md shadow-md">
                        <p className="text-2xl text-gray-700"><span className="text-gray-800 uppercase font-bold">Cliente: </span>{cliente.nombre}</p>

                        <p className="text-xl text-gray-700 mt-4"><span className="text-gray-800 uppercase font-bold">Email: </span>{cliente.email}</p>

                        {cliente.telefono && <p className="text-xl text-gray-700 mt-4"><span className="text-gray-800 uppercase font-bold">Teléfono: </span>{cliente.telefono}</p>}

                        <p className="text-xl text-gray-700 mt-4"><span className="text-gray-800 uppercase font-bold">Empresa: </span>{cliente.empresa}</p>

                        {cliente.notas && <p className="text-xl text-gray-700 mt-4"><span className="text-gray-800 uppercase font-bold">Notas: </span>{cliente.notas}</p>}
                    </div>
                    )}
                </>
            
        </>
        
    )
}

export default VerCliente