import { useState } from 'react'
import { useQueryReservas } from '../../hooks/reservas'
import usePaginate from '../../hooks/usePaginate'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import Pagination from '../Pagination'

export default function TablaReservas() {
  const { data: reservas, isLoading, isError } = useQueryReservas()
  const { searchValue, handleChange, filterListado } = useSearch('SalaNombre')
  const {
    paginated,
    nextPage,
    prevPage,
    totalPages,
    setPage,
    currentPage,
    itemsPerPage,
  } = usePaginate({
    perPage: 3,
    arr: reservas && reservas.data,
  })
  const columns = [
    'ID',
    'Nombre',
    'Solicitante',
    'Email Solicitante',
    'Telefono Solicitante',
    'Tipo Persona',
    'Fecha',
    'Hora de Inicio',
    'Hora de Termino',
    'Idioma',
    'Tipo Reserva',
    'Estado',
    'Cantidad de Personas',
    'Tipo Visita',
    'Requerimientos Especiales',
    'Como se Entero',
    'Area Solicitante',
    'Personal CyT',
    'EnologoSommelier',
    'Encargado Tour',
    'Lugar Almuerzo Cena',
    'Comentario Lugar Almuerzo Cena',
    'Copas Degustacion',
    'Estado Vinos Degustacion',
    'Estado Vinos Comidas',
    'Estado Regalos Visitas',
    'Estado Menu Comidas',
    'Comentario Vinos Degustacion',
    'Comentario Vinos Comidas',
    'Comentario Regalos Visitas',
    'Comentario Menu Comidas',
    'Comentarios Generales',
    'Fecha Apruebo/Rechazo',
    'Motivo Apruebo/Rechazo',
    'Empresa',
  ]
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        {/* <ModalComponent
          title="Crear Sala"
          btn={<PlusButton />}
          content={<AddSala />}
        /> */}
        <div className="flex gap-2 my-8">
          <input
            className="input"
            placeholder="Busca una reserva..."
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
        <DefaultTable columns={columns} extra={2}>
          {reservas &&
            paginated(filterListado(reservas.data)).map((reserva) => (
              <tr key={reserva.ReservaId} className="bg-white border-b ">
                <td className="td-default">{reserva.ReservaId}</td>
                <td className="td-default">{reserva.SalaNombre}</td>
                <td className="td-default">{reserva.NombreSolicitante}</td>
                <td className="td-default">{reserva.EmailSolicitante}</td>
                <td className="td-default">{reserva.TelefonoSolicitante}</td>
                <td className="td-default">{reserva.TipoPersona}</td>
                <td className="td-default">{reserva.Fecha}</td>
                <td className="td-default">{reserva.HorarioInicio}</td>
                <td className="td-default">{reserva.HorarioTermino}</td>
                <td className="td-default">{reserva.Idioma}</td>
                <td className="td-default">{reserva.TipoReserva}</td>
                <td className="td-default">{reserva.Estado}</td>
                <td className="td-default">{reserva.CantidadPersonas}</td>
                <td className="td-default">{reserva.TipoVisita}</td>
                <td className="td-default">
                  {reserva.RequerimientosEspeciales}
                </td>
                <td className="td-default">{reserva.ComoSeEntero}</td>
                <td className="td-default">{reserva.AreaSolicitante}</td>
                <td className="td-default">{reserva.PersonalCyt}</td>
                <td className="td-default">{reserva.EnologoSommelier}</td>
                <td className="td-default">{reserva.EncargadoTour}</td>
                <td className="td-default">{reserva.LugarAlmuerzoCena}</td>
                <td className="td-default">
                  {reserva.ComentarioLugarAlmuerzoCena}
                </td>
                <td className="td-default">{reserva.CopasDegustacion}</td>
                <td className="td-default">{reserva.EstadoVinosDegustacion}</td>
                <td className="td-default">{reserva.EstadoVinosComidas}</td>
                <td className="td-default">{reserva.EstadoRegalosVisitas}</td>
                <td className="td-default">{reserva.EstadoMenuComidas}</td>
                <td className="td-default">
                  {reserva.ComentarioVinosDegustacion}
                </td>
                <td className="td-default">{reserva.ComentarioVinosComidas}</td>
                <td className="td-default">
                  {reserva.ComentarioRegalosVisitas}
                </td>
                <td className="td-default">{reserva.ComentariosMenuComidas}</td>
                <td className="td-default">{reserva.ComentariosGenerales}</td>
                <td className="td-default">
                  {reserva.FechaHoraAprueboRechazo}
                </td>
                <td className="td-default">{reserva.MotivoAprueboRechazo}</td>
                <td className="td-default">{reserva.Empresa}</td>
              </tr>
            ))}
        </DefaultTable>
      </LoaderWhen>
    </>
  )
}
