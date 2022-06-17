import { useState, useEffect } from "react"
import swal from "sweetalert";
import Cliente from "../components/Cliente";
import Spinner from "../components/Spinner";

const Inicio = () => {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() =>{
    const obtenerClientesAPI = async () =>{
      try{
        const url = `${import.meta.env.VITE_API_URL}/clientes`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClientes(resultado);
      }catch(error){
        console.log(error)
      }
      setCargando(false)
    }
    obtenerClientesAPI();
  }, [])

  function handleEliminar(id){
    swal({
        title: "¿Deseas eliminar este cliente?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then(async (willDelete) => {
        if (willDelete) {

            try {
                const url = `${import.meta.env.VITE_API_URL}/clientes/${id}`;
                const respuesta = await fetch(url, {
                    method: 'DELETE'
                });
                const resultado = await respuesta;
            } catch (error) {
            
            }
            const clientesActualizados = clientes.filter(cliente => cliente.id !== id)
            swal("El cliente se ha eliminado correctamente.", {
                icon: "success",
            })
            setClientes(clientesActualizados);
            
        }
    });
  }

  return (
    
    <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-3 md:text-lg'>Administra tus clientes.</p>

        {cargando ? <Spinner/> : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Contacto</th>
                    <th className="p-2">Empresa</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(cliente =>(
                    <Cliente 
                        key={cliente.id} 
                        cliente = {cliente}
                        handleEliminar = {handleEliminar}
                    />
                ))}
            </tbody>
        </table>
        )}
    </>
    )
}

export default Inicio