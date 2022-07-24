import React, { useState } from 'react'
import { fetchCambiarClave } from '../../services/user'
import Alert from '../Alert'
import NormalForm from '../FormikForm/NormalForm'

const ChangePassword = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const form = [
    {
      label: 'Contraseña actual',
      type: 'password',
      name: 'Password',
      validations: [{ type: 'required' }],
      value: '',
    },
    {
      label: 'Nueva contraseña',
      type: 'password',
      name: 'PasswordNew',
      validations: [{ type: 'required' }],
      value: '',
    },
    {
      label: 'Repetir nueva contraseña',
      type: 'password',
      name: 'RePasswordNew',
      validations: [{ type: 'required' }],
      value: '',
    },
  ]
  const handleSubmit = async (values) => {
    const { Password, PasswordNew, RePasswordNew } = values
    if (PasswordNew !== RePasswordNew) {
      throw new Error('Las nuevas contraseñas no coinciden')
    } else {
      try {
        await fetchCambiarClave(values)
        setIsSuccess(true)
      } catch (error) {
        if (error.response.data.mensaje) {
          throw new Error(error.response.data.mensaje)
        } else {
          throw new Error('Hubo un error inesperado')
        }
      }
    }
  }
  return (
    <>
      {isSuccess && (
        <Alert type="success">Contraseña actualizada correctamente</Alert>
      )}

      <NormalForm form={form} submitFunction={handleSubmit} btnText="Guardar" />
    </>
  )
}

export default ChangePassword
