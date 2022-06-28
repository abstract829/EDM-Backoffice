import { useState } from 'react'
import { useQueryEmpresas } from '../../hooks/empresas'
import Alert from '../Alert'
import LoaderWhen from '../LoaderWhen'
import Table from './Table'

export default function TablaUsuariosEmpresa() {
  const { data: listadoEmpresas, isLoading, isError } = useQueryEmpresas()
  const [id, setId] = useState(null)

  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSelectChange = (value) => {
    setId(value)
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <select
          className="input min-w-[12rem]"
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          {listadoEmpresas &&
            listadoEmpresas.data.map((empresa) => (
              <option key={empresa.EmpresaId} value={empresa.EmpresaId}>
                {empresa.Nombre}
              </option>
            ))}
        </select>
        {listadoEmpresas && (
          <Table empresaId={id ? id : listadoEmpresas.data[0].EmpresaId} />
        )}
      </LoaderWhen>
    </>
  )
}
