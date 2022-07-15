import usePaginate from '../../hooks/usePaginate'
import { useQueryUsers } from '../../hooks/users'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalRP from '../ModalRP'
import NoAccess from '../NoAccess'
import Pagination from '../Pagination'
import PlusButton from '../PlusButton'
import AddUsuario from './AddUsuario'
import EditUsuario from './EditUsuario'

export default function TablaUsuarios() {
  const { data: listadoUsuarios, isLoading, isError } = useQueryUsers()
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
    arr: listadoUsuarios && listadoUsuarios.data,
  })
  const columns = ['ID', 'Nombre', 'Email', 'Perfil', 'Activo']
  if(!listadoUsuarios){
    return <NoAccess />
  }
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalRP title="Crear Usuario" btn={<PlusButton />}>
          {(closeModal) => <AddUsuario closeModal={closeModal} />}
        </ModalRP>

        <div className="flex gap-2 my-8">
          <input
            className="input"
            placeholder="Busca un usuario..."
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
          {listadoUsuarios &&
            paginated(filterListado(listadoUsuarios.data)).map((usuario) => (
              <tr key={usuario.UsuarioId} className="bg-white border-b ">
                <td className="td-default">{usuario.UsuarioId}</td>
                <td className="td-default">{usuario.Nombre}</td>
                <td className="td-default">{usuario.Email}</td>
                <td className="td-default">{usuario.PerfilNombre}</td>
                <td className="td-default">{usuario.Activo}</td>
                <td className="text-right">
                  <ModalRP
                    title="Editar Usuario"
                    btn={<span className=" td-edited">Editar</span>}
                  >
                    {(closeModal) => (
                      <EditUsuario user={usuario} closeModal={closeModal} />
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
