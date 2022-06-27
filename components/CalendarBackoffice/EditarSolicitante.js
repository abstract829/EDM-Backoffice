import useAuth from '../../hooks/useAuth'
import { validateValue } from '../../utils/utils'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import LoaderWhen from '../LoaderWhen'

const EditarSolicitante = ({ closeModal, solicitante }) => {
  const form = [
    {
      label: 'RUT/DNI/PASAPORTE',
      type: 'text',
      name: 'NumeroDocumento',
      placeholder: '',
      value: solicitante && validateValue(solicitante.NumeroDocumento),
      disabled: true,
    },
    {
      label: 'Nombre Completo',
      type: 'text',
      name: 'NombreCompleto',
      placeholder: 'Nombre Apellido',
      value: solicitante && validateValue(solicitante.NombreCompleto),
      disabled: true,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'CorreoElectronico',
      placeholder: 'email@example.com',
      value: solicitante && validateValue(solicitante.CorreoElectronico),
      disabled: true,
    },
    {
      label: 'Fecha de nacimiento',
      type: 'date',
      name: 'FechaNacimiento',
      value:
        solicitante && validateValue(solicitante.FechaNacimiento.split('T')[0]),
      disabled: true,
    },
    {
      label: 'Genero',
      type: 'select',
      name: 'Genero',
      options: [
        { value: 'MASCULINO', text: 'Hombre' },
        { value: 'FEMENINO', text: 'Mujer' },
      ],
      value: solicitante && validateValue(solicitante.Genero),
      disabled: true,
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'Telefono',
      placeholder: '',
      value: solicitante && validateValue(solicitante.Telefono),
      disabled: true,
    },
    {
      label: 'Pais',
      type: 'select',
      name: 'PaisId',
      options: [{ value: '1', text: 'Chile' }],
      value: solicitante && validateValue(solicitante.PaisId),
      disabled: true,
    },
    {
      label: 'Ciudad',
      type: 'text',
      name: 'Ciudad',
      placeholder: '',
      value: solicitante && validateValue(solicitante.Ciudad),
      disabled: true,
    },
  ]
  const handleSubmit = async (values) => {
    console.log(values)
  }

  return (
    <>
      {solicitante && (
        <>
          <NewForm
            form={form}
            submitFunction={handleSubmit}
            btnText="Guardar cambios"
            closeForm={closeModal}
            disabled={true}
          />
          {/* <Alerts
            successIf={isSuccess}
            failedIf={isError}
            succesText="Solicitante editado correctamente!"
            failedText="Hubo un error inesperado"
          /> */}
        </>
      )}
    </>
  )
}
export default EditarSolicitante
