import { useDeleteEmpresa, useQueryEmpresas } from '../../hooks/empresas'
import usePaginate from '../../hooks/usePaginate'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import Alerts from '../Alerts'
import ConfirmModal from '../ConfirmModal'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import ModalRP from '../ModalRP'
import Pagination from '../Pagination'
import PlusButton from '../PlusButton'
import AddEmpresa from './AddEmpresa'
import EditEmpresa from './EditEmpresa'

export default function TablaEmpresas() {
  const { data: listadoEmpresas, isLoading, isError } = useQueryEmpresas()
  const {
    mutate: deleteEmpresa,
    isErrorMutating,
    isSuccess,
  } = useDeleteEmpresa()
  const { searchValue, handleChange, filterListado } = useSearch('Nombre')
  const {
    paginated,
    nextPage,
    prevPage,
    totalPages,
    setPage,
    currentPage,
    itemsPerPage,
  } = usePaginate({
    perPage: 7,
    arr: listadoEmpresas && listadoEmpresas.data,
  })
  const columns = ['ID', 'Nombre', 'Rut', 'Activo', 'CodigoSAP']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSubmit = (EmpresaId) => {
    deleteEmpresa({ EmpresaId })
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalRP title="Crear Empresa" btn={<PlusButton />}>
          {(closeModal) => <AddEmpresa closeModal={closeModal} />}
        </ModalRP>

        <div className="flex gap-2 my-8">
          <input
            className="input"
            placeholder="Busca una empresa..."
            type="text"
            value={searchValue}
            onChange={handleChange}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            nextPage={nextPage}
            prevPage={prevPage}
            setPage={setPage}
            totalPages={totalPages()}
          />
        </div>
        <DefaultTable columns={columns} extra={1}>
          {listadoEmpresas &&
            paginated(filterListado(listadoEmpresas.data)).map((empresa) => (
              <tr key={empresa.EmpresaId} className="bg-white border-b ">
                <td className="td-default">{empresa.EmpresaId}</td>
                <td className="td-default">{empresa.Nombre}</td>
                <td className="td-default">{empresa.Rut}</td>
                <td className="td-default">{empresa.Activo}</td>
                <td className="td-default">{empresa.CodigoSAP}</td>
                <td className="text-right">
                  <ModalRP
                    title="Editar Empresa"
                    btn={<span className=" td-edited">Editar</span>}
                  >
                    {(closeModal) => (
                      <EditEmpresa empresa={empresa} closeModal={closeModal} />
                    )}
                  </ModalRP>
                </td>
                {/* <td>
                  <ConfirmModal
                    onSubmit={() => handleSubmit(empresa.EmpresaId)}
                    title={`Eliminar ${empresa.Nombre}`}
                    btn={<span className="td-edited">Eliminar</span>}
                  />
                </td> */}
              </tr>
            ))}
        </DefaultTable>
        <Alerts
          successIf={isSuccess}
          failedIf={isErrorMutating}
          succesText="Empresa eliminada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </LoaderWhen>
    </>
  )
}
