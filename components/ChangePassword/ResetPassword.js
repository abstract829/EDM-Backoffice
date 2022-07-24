import React, { useState } from 'react'
import { fetchResetClave } from '../../services/user'
import Alert from '../Alert'
import NormalForm from '../FormikForm/NormalForm'

const ResetPassword = ({ closeForm }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const form = [
    {
      label: 'Correo Electronico',
      type: 'email',
      name: 'Email',
      validations: [{ type: 'required' }, { type: 'email' }],
      value: '',
    },
  ]
  const handleSubmit = async (values) => {
    try {
      await fetchResetClave(values)
      setIsSuccess(true)
    } catch (error) {
      if (error.response.data.mensaje) {
        throw new Error(error.response.data.mensaje)
      } else {
        throw new Error('Hubo un error inesperado')
      }
    }
  }
  return (
    <>
      {isSuccess && (
        <Alert type="success">
          Recibirás un correo electronico con tu contraseña
        </Alert>
      )}

      <NormalForm
        form={form}
        submitFunction={handleSubmit}
        btnText="Recuperar"
        cancelButton={true}
        closeForm={closeForm}
      />
    </>
  )
}

export default ResetPassword
