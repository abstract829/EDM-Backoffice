import { useEffect } from 'react'
import usePaginate from '../../hooks/usePaginate'
import useReserva from '../../hooks/useReserva'
import ConfirmModal from '../ConfirmModal'
import DefaultTable from '../DefaultTable'
import ModalRP from '../ModalRP'
import Pagination from '../Pagination'
import PlusButton from '../PlusButton'
import AddAsistente from './AddAsistente'
import EditAsistente from './EditAsistente'

export default function AsistentesTable() {
  const { asistentes, setAsistentes } = useReserva()
  const {
    paginated,
    nextPage,
    prevPage,
    totalPages,
    setPage,
    currentPage,
    itemsPerPage,
  } = usePaginate({
    perPage: 4,
    arr: asistentes && asistentes,
  })
  const columns = [
    'Nombre',
    'Fecha de Nacimiento',
    'Email',
    'Genero',
    'Ciudad',
    'Pais',
    'RUT',
    'Telefono',
  ]
  const handleDelete = (asistente) => {
    setAsistentes((prev) =>
      prev.filter((a) => a.NumeroDocumento != asistente.NumeroDocumento)
    )
  }
  return (
    <>
      <ModalRP title="Agregar Asistente" btn={<PlusButton />}>
        {(closeModal) => <AddAsistente closeModal={closeModal} />}
      </ModalRP>
      <div className="flex gap-4 my-4">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          nextPage={nextPage}
          prevPage={prevPage}
          setPage={setPage}
          totalPages={totalPages()}
        />
      </div>
      <div className="max-w-2xl">
        <DefaultTable columns={columns} extra={2}>
          {asistentes.length > 0 &&
            paginated(asistentes).map((asistente, i) => (
              <tr key={i} className="bg-white border-b ">
                <td className="td-default">{asistente.NombreCompleto}</td>
                <td className="td-default">{asistente.FechaNacimiento}</td>
                <td className="td-default">{asistente.CorreoElectronico}</td>
                <td className="td-default">{asistente.Genero}</td>
                <td className="td-default">{asistente.Ciudad}</td>
                <td className="td-default">{asistente.PaisId}</td>
                <td className="td-default">{asistente.NumeroDocumento}</td>
                <td className="td-default">{asistente.Telefono}</td>
                <td className="td-default">
                  <ModalRP
                    title="Editar Asistente"
                    btn={<span className="td-edited">Editar</span>}
                  >
                    {(closeModal) => (
                      <EditAsistente
                        closeModal={closeModal}
                        asistente={asistente}
                      />
                    )}
                  </ModalRP>
                </td>
                <td>
                  <ConfirmModal
                    onSubmit={() => handleDelete(asistente)}
                    title={`Eliminar ${asistente.NombreCompleto}`}
                    btn={<span className="td-edited">Eliminar</span>}
                  />
                </td>
              </tr>
            ))}
        </DefaultTable>
      </div>
    </>
  )
}
