import { useDeleteFeriado, useQueryFeriados } from '../../hooks/feriados'
import usePaginate from '../../hooks/usePaginate'
import { dateParse } from '../../utils/utils'
import Alert from '../Alert'
import Alerts from '../Alerts'
import ConfirmModal from '../ConfirmModal'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import ModalRP from '../ModalRP'
import Pagination from '../Pagination'
import PlusButton from '../PlusButton'
import AddFeriado from './AddFeriado'

const TablaFeriados = () => {
  const { data: feriados, isError, isLoading } = useQueryFeriados()
  const {
    mutate: deleteFeriado,
    isErrorMutating,
    isSuccess,
  } = useDeleteFeriado()
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
    arr: feriados && feriados.data,
  })
  const columns = ['Fecha']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const handleSubmit = (feriado) => {
    deleteFeriado({ FeriadoId: feriado.FeriadoId })
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <ModalRP title="Agregar feriado" btn={<PlusButton />}>
        {(closeModal) => <AddFeriado closeModal={closeModal} />}
      </ModalRP>
      <div className="flex gap-2 my-8">
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
        {feriados &&
          paginated(feriados.data).map((feriado) => (
            <tr key={feriado.FeriadoId}>
              <td className="td-default">{dateParse(feriado.Fecha)}</td>
              <td className="text-right">
                <ConfirmModal
                  onSubmit={() => handleSubmit(feriado)}
                  title={`Eliminar ${dateParse(feriado.Fecha)}`}
                  btn={<span className="td-edited">Eliminar</span>}
                />
              </td>
            </tr>
          ))}
      </DefaultTable>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Feriado eliminado correctamente!"
        failedText="Hubo un error inesperado"
      />
    </LoaderWhen>
  )
}
export default TablaFeriados
