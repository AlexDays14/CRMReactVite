import { useNavigate } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'
import Alerta from "./Alerta"
import Spinner from "./Spinner"

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = yup.object().shape({
        nombre: yup.string()
                    .min(3, 'El Nombre es muy Corto')
                    .max(40, 'El Nombre es muy Largo')
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa: yup.string()
                    .required('La Empresa es Obligatoria'),
        email: yup.string()
                  .email('No es un Email Válido')
                  .required('El Email es Obligatorio'),
        telefono: yup.number()
                     .typeError('No es un Teléfono Válido')
                     .positive('No es un Teléfono Válido')
                     .integer('No es un Teléfono Válido'),
        notas: '',
    })

    async function handleSubmit(values, resetForm){
        try {
            let respuesta;
            
            if(cliente.id){
                //Editar Registro
                const url = `http://localhost:4000/clientes/${cliente.id}`
                    respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                // Nuevo Registro
                const url = 'http://localhost:4000/clientes'
                    respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json()
            resetForm();
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.id ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? '',
                }}
                enableReinitialize={true}
                onSubmit={ (values, {resetForm})=>{
                     handleSubmit(values, resetForm);
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) =>(
                    <Form className="mt-10">
                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold" htmlFor="nombre">Nombre:</label>
                            <Field
                                id="nombre"
                                name="nombre"
                                className="mt-2 block w-full p-3 bg-gray-100 outline-none font-light"
                                type="text"
                                placeholder="Nombre del Cliente"
                            />
                            {errors.nombre && touched.nombre ? 
                                <Alerta>{errors.nombre}</Alerta>
                            : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold" htmlFor="empresa">Empresa:</label>
                            <Field
                                id="empresa"
                                name="empresa"
                                className="mt-2 block w-full p-3 bg-gray-100 outline-none font-light"
                                type="text"
                                placeholder="Empresa del Cliente"
                            />
                            {errors.empresa && touched.empresa ? 
                                <Alerta>{errors.empresa}</Alerta>
                            : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold" htmlFor="email">Email:</label>
                            <Field
                                id="email"
                                name="email"
                                className="mt-2 block w-full p-3 bg-gray-100 outline-none font-light"
                                type="email"
                                placeholder="Email del Cliente"
                            />
                            {errors.email && touched.email ? 
                                <Alerta>{errors.email}</Alerta>
                            : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold" htmlFor="telefono">Teléfono:</label>
                            <Field
                                id="telefono"
                                name="telefono"
                                className="mt-2 block w-full p-3 bg-gray-100 outline-none font-light"
                                type="tel"
                                placeholder="Teléfono del Cliente"
                            />
                            {errors.telefono && touched.telefono ? 
                                <Alerta>{errors.telefono}</Alerta>
                            : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800 font-semibold" htmlFor="notas">Notas:</label>
                            <Field
                                as="textarea"
                                id="notas"
                                name="notas"
                                className="mt-2 block w-full p-3 bg-gray-100 outline-none font-light h-40"
                                placeholder="Notas del Cliente"
                            />
                            {errors.notas && touched.notas ? 
                                <Alerta>{errors.notas}</Alerta>
                            : null}
                        </div>

                        <input className="p-3 mt-5 w-full bg-blue-800 text-white uppercase font-bold text-lg cursor-pointer transition-all hover:bg-blue-900" type="submit" value={cliente.id ? 'Editar Cliente' : 'Nuevo Cliente'}/>
                    </Form>
                )}
            </Formik>
        </div>
        
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario