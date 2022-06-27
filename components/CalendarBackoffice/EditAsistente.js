import { useState } from 'react'
import * as Yup from 'yup'
import useReserva from '../../hooks/useReserva'
import Alerts from '../Alerts'
import FormikForm from '../FormikForm'

const EditAsistente = ({ closeModal, asistente }) => {
  const { setAsistentes } = useReserva()
  const [success, setSuccess] = useState(false)
  const inputForms = [
    {
      label: 'Nombre Completo',
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
      label: 'RUT/DNI/PASAPORTE',
      type: 'text',
      name: 'NumeroDocumento',
    },
    {
      label: 'Telefono',
      type: 'text',
      name: 'Telefono',
    },
    {
      label: 'Fecha de nacimiento',
      type: 'date',
      name: 'FechaNacimiento',
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
    {
      label: 'Pais',
      type: 'select',
      name: 'PaisId',
      options: [{ value: '1', text: 'Chile' }],
    },
    {
      label: 'Ciudad',
      type: 'text',
      name: 'Ciudad',
    },
  ]
  const initialValues = {
    NombreCompleto: asistente.NombreCompleto,
    CorreoElectronico: asistente.CorreoElectronico,
    NumeroDocumento: asistente.NumeroDocumento,
    Telefono: asistente.Telefono,
    FechaNacimiento: asistente.FechaNacimiento,
    Genero: asistente.Genero,
    PaisId: asistente.PaisId,
    Ciudad: asistente.Ciudad,
  }
  const validationSchema = Yup.object().shape({
    CorreoElectronico: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('El campo es obligatorio'),
    NombreCompleto: Yup.string().required('El campo es obligatorio'),
    FechaNacimiento: Yup.string().required('El campo es obligatorio'),
    NumeroDocumento: Yup.string().required('El campo es obligatorio'),
    Telefono: Yup.string().required('El campo es obligatorio'),
    Genero: Yup.string().required('El campo es obligatorio'),
    PaisId: Yup.string().required('El campo es obligatorio'),
    Ciudad: Yup.string().required('El campo es obligatorio'),
  })
  const handleSubmit = (values) => {
    setAsistentes((prev) =>
      prev.map((a) =>
        a.NumeroDocumento === values.NumeroDocumento ? values : a
      )
    )
    setSuccess(true)
    setTimeout(() => {
      closeModal()
    }, 500)
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
        <Alerts
          successIf={success}
          failedIf={false}
          succesText="Asistente editado correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </>
  )
}
export default EditAsistente
