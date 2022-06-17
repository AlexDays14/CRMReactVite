import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    return (
        <tr className="border-b-4 transition-all hover:bg-gray-100">
            <td className="p-3 border-r">{cliente.nombre}</td>
            <td className="p-3 border-r-2">
                <p><span className="text-gray-800 uppercase font-bold">Email: </span>{cliente.email}</p>
                <p><span className="text-gray-800 uppercase font-bold">Tel: </span>{cliente.telefono}</p>
            </td>
            <td className="p-3 border-r-2">{cliente.empresa}</td>
            <td className="p-3">
                <button 
                type="button"
                className="transition-all bg-gray-800 hover:bg-gray-900 block w-full p-2 text-white uppercase font-bold text-sm"
                onClick={() => navigate(`/clientes/${cliente.id}`)}
                >Ver</button>

                <button 
                type="button"
                className="transition-all bg-blue-600 hover:bg-blue-700 block w-full p-2 text-white uppercase font-bold text-sm mt-2"
                onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
                >Editar</button>

                <button 
                type="button"
                className="transition-all bg-red-600 hover:bg-red-700 block w-full p-2 text-white uppercase font-bold text-sm mt-2"
                onClick={() => handleEliminar(cliente.id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente