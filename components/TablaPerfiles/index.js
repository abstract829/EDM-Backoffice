import { useQueryPerfiles } from '../../hooks/perfiles'
import usePaginate from '../../hooks/usePaginate'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import ModalRP from '../ModalRP'
import Pagination from '../Pagination'
import PlusButton from '../PlusButton'
import AddPerfil from './AddPerfil'
import EditPerfil from './EditPerfil'
import Funciones from './Funciones'

export default function TablaUsuarios() {
  const { data: listadoPerfiles, isLoading, isError } = useQueryPerfiles()
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
    arr: listadoPerfiles && listadoPerfiles.data,
  })
  const columns = ['ID', 'Nombre', 'Activo', 'Funciones']
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalRP title="Crear Perfil" btn={<PlusButton />}>
          {(closeModal) => <AddPerfil closeModal={closeModal} />}
        </ModalRP>

        <div className="flex gap-2 my-8">
          <input
            className="input"
            placeholder="Busca un perfil..."
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
          {listadoPerfiles &&
            paginated(filterListado(listadoPerfiles.data)).map((perfil) => (
              <tr key={perfil.PerfilId} className="bg-white border-b ">
                <td className="td-default">{perfil.PerfilId}</td>
                <td className="td-default">{perfil.Nombre}</td>
                <td className="td-default">{perfil.Activo}</td>
                <td>
                  <ModalComponent
                    title="Editar funciones"
                    btn={<span className="td-edited">Ver</span>}
                    content={<Funciones id={perfil.PerfilId} />}
                  />
                </td>
                <td className="text-right">
                  <ModalRP
                    title="Editar Perfil"
                    btn={<span className="td-edited">Editar</span>}
                  >
                    {(closeModal) => (
                      <EditPerfil
                        id={perfil.PerfilId}
                        closeModal={closeModal}
                      />
                    )}
                  </ModalRP>
                </td>
              </tr>
            ))}
        </DefaultTable>
      </LoaderWhen>
    </>
  )
}
