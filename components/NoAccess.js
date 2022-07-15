import React from 'react'
import Alert from './Alert'

const NoAccess = () => {
  return (
    <Alert type="failed">Su acceso es insuficiente para realizar la operación</Alert>
  )
}

export default NoAccess