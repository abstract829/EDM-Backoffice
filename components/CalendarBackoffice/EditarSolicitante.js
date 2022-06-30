import { useState } from 'react'
import useReserva from '../../hooks/useReserva'
import { validateValue } from '../../utils/utils'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'

const EditarSolicitante = ({ closeModal, solicitante, disabled = false }) => {
  const { setSolicitante } = useReserva()
  const [isSuccess, SetIsSuccess] = useState(0)
  const form = [
    {
      label: 'RUT/DNI/PASAPORTE',
      type: 'text',
      name: 'NumeroDocumento',
      placeholder: '',
      value: solicitante && validateValue(solicitante.NumeroDocumento),
      validations: [{ type: 'required' }],
    },
    {
      label: 'Nombre Completo',
      type: 'text',
      name: 'NombreCompleto',
      placeholder: 'Nombre Apellido',
      value: solicitante && validateValue(solicitante.NombreCompleto),
      validations: [{ type: 'required' }],
    },
    {
      label: 'Email',
      type: 'email',
      name: 'CorreoElectronico',
      placeholder: 'email@example.com',
      value: solicitante && validateValue(solicitante.CorreoElectronico),
      validations: [{ type: 'required' }, { type: 'email' }],
    },
    {
      label: 'Fecha de nacimiento',
      type: 'date',
      name: 'FechaNacimiento',
      value:
        solicitante && validateValue(solicitante.FechaNacimiento.split('T')[0]),
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
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'Telefono',
      placeholder: '',
      value: solicitante && validateValue(solicitante.Telefono),
    },
    {
      label: 'Pais',
      type: 'select',
      name: 'PaisId',
      options: [{ value: '1', text: 'Chile' }],
      value: solicitante && validateValue(solicitante.PaisId),
    },
    {
      label: 'Ciudad',
      type: 'text',
      name: 'Ciudad',
      placeholder: '',
      value: solicitante && validateValue(solicitante.Ciudad),
    },
  ]
  const handleSubmit = async (values) => {
    setSolicitante({ ...solicitante, ...values })
    SetIsSuccess(1)
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
            disabled={disabled}
          />
          <Alerts
            successIf={isSuccess === 1}
            failedIf={isSuccess === 2}
            succesText="Solicitante editado correctamente!"
            failedText="Hubo un error inesperado"
          />
        </>
      )}
    </>
  )
}
export default EditarSolicitante
