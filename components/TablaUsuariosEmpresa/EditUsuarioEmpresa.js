import * as Yup from 'yup'
import FormikForm from '../FormikForm'
import Alerts from '../Alerts'
import { useMutateUsuarioEmpresa, useQueryUsuarioEmpresaById } from '../../hooks/empresas'
import { checkRut } from '../../utils/utils'
import NoAccess from '../NoAccess'
const EditUsuarioEmpresa = ({ usuario, closeModal }) => {
  const {data} = useQueryUsuarioEmpresaById({id:usuario.PersonaId})
  const {
    mutate: editUser,
    isError: isErrorMutating,
    isSuccess,
  } = useMutateUsuarioEmpresa()
  if(!data){
    return (
      <>
        <NoAccess/>
        <button
        className="block px-4 py-2 mt-8 text-white bg-slate-600"
        onClick={closeModal}
        >
        Cerrar
        </button>
      </>
    )
  }
  const inputForms = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'NombreCompleto',
      placeholder: 'Nombre Apellido',
    },
    {
      label: 'Email',
      type: 'email',
      name: 'CorreoElectronico',
      placeholder: 'example@email.com',
    },
    {
      label: 'Ciudad',
      type: 'text',
      name: 'Ciudad',
      placeholder: 'Ciudad',
    },
    {
      label: 'Rut',
      type: 'text',
      name: 'NumeroDocumento',
      placeholder: '11.111.111-1',
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'Telefono',
      placeholder: '912345678',
    },
    {
      label: 'Genero',
      type: 'select',
      name: 'Genero',
      options: [
        { value: 'MASCULINO', text: 'Hombre' },
        { value: 'FEMENINO', text: 'Mujer' },
      ],
    },
  ]
  const initialValues = {
    NombreCompleto: usuario.NombreCompleto,
    CorreoElectronico: usuario.CorreoElectronico,
    Ciudad: usuario.Ciudad,
    NumeroDocumento: usuario.NumeroDocumento,
    Telefono: usuario.Telefono,
    Genero: usuario.Genero,
  }
  const validationSchema = Yup.object().shape({
    CorreoElectronico: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('Debe ingresar un email'),
    NombreCompleto: Yup.string().max(255).required('Debe ingresar un nombre'),
    Ciudad: Yup.string().required('El campo es obligatorio'),
    NumeroDocumento: Yup.string().required('El campo es obligatorio'),
    Telefono: Yup.string().required('El campo es obligatorio'),
    Genero: Yup.string().required('El campo es obligatorio'),
  })
  const handleSubmit = (values) => {
    const [isValidRut, Rut] = checkRut(values.NumeroDocumento)
    if (isValidRut) {
      const usuario = {
        ...usuario,
        ...values,
        NumeroDocumento: Rut,
      }
      editUser(usuario)
    } else {
      throw new Error('RUT Invalido')
    }
  }
  return (
    <>
      <div className="w-96">
        <FormikForm
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={handleSubmit}
          btnText="Guardar"
          scroll={true}
          closeForm={closeModal}
        />
      </div>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Usuario editado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </>
  )
}
export default EditUsuarioEmpresa
