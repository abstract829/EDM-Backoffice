import { useEffect, useRef, useState } from 'react'
import { useQueryReservas } from '../../hooks/reservas'
import usePaginate from '../../hooks/usePaginate'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import Pagination from '../Pagination'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ModalRP from '../ModalRP'
import EditarReserva from '../CalendarBackoffice/EditarReserva'
import { dateHourParse, dateParse } from '../../utils/utils'
import PlusButton from '../PlusButton'
import ConfirmarHorario from '../CalendarBackoffice/ConfirmarHorario'
import RenderIf from '../RenderIf'
const StatusText = ({ children }) => {
  return (
    <>
      <RenderIf isTrue={children === 'Solicitados'}>
        <span className="p-2 font-bold text-orange-600 rounded">
          {children}
        </span>
      </RenderIf>
      <RenderIf isTrue={children === 'No solicitados'}>
        <span className="p-2 font-bold text-red-600 rounded">{children}</span>
      </RenderIf>
      <RenderIf isTrue={children === 'Recibidos'}>
        <span className="p-2 font-bold text-green-600 rounded">{children}</span>
      </RenderIf>
    </>
  )
}
export default function TablaReservas() {
  const { data: reservas, isLoading, isError } = useQueryReservas()
  const [columnToSearch, setColumnToSearch] = useState('ReservaId')

  const { searchValue, handleChange, filterListado } = useSearch(columnToSearch)
  const [hiddenCols, setHiddenCols] = useState([])
  const [columns, setColumns] = useState([
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
  ])
  const colSearchFilter = [
    { text: 'ID', value: 'ReservaId' },
    { text: 'Nombre', value: 'SalaNombre' },
    { text: 'Solicitante', value: 'NombreSolicitante' },
    { text: 'Email Solicitante', value: 'EmailSolicitante' },
    { text: 'Telefono Solicitante', value: 'TelefonoSolicitante' },
    { text: 'Tipo Persona', value: 'TipoPersona' },
    { text: 'Fecha', value: 'Fecha' },
    { text: 'Hora de Inicio', value: 'HorarioInicio' },
    { text: 'Hora de Termino', value: 'HorarioTermino' },
    { text: 'Idioma', value: 'Idioma' },
    { text: 'Tipo Reserva', value: 'TipoReserva' },
    { text: 'Estado', value: 'Estado' },
    { text: 'Cantidad de Personas', value: 'CantidadPersonas' },
    { text: 'Tipo Visita', value: 'TipoVisita' },
    { text: 'Requerimientos Especiales', value: 'RequerimientosEspeciales' },
    { text: 'Como se Entero', value: 'ComoSeEntero' },
    { text: 'Area Solicitante', value: 'AreaSolicitante' },
    { text: 'Personal CyT', value: 'PersonalCyt' },
    { text: 'EnologoSommelier', value: 'EnologoSommelier' },
    { text: 'Encargado Tour', value: 'EncargadoTour' },
    { text: 'Lugar Almuerzo Cena', value: 'LugarAlmuerzoCena' },
    {
      text: 'Comentario Lugar Almuerzo Cena',
      value: 'ComentarioLugarAlmuerzoCena',
    },
    { text: 'Copas Degustacion', value: 'CopasDegustacion' },
    { text: 'Estado Vinos Degustacion', value: 'EstadoVinosDegustacion' },
    { text: 'Estado Vinos Comidas', value: 'EstadoVinosComidas' },
    { text: 'Estado Regalos Visitas', value: 'EstadoRegalosVisitas' },
    { text: 'Estado Menu Comidas', value: 'EstadoMenuComidas' },
    {
      text: 'Comentario Vinos Degustacion',
      value: 'ComentarioVinosDegustacion',
    },
    { text: 'Comentario Vinos Comidas', value: 'ComentarioVinosComidas' },
    { text: 'Comentario Regalos Visitas', value: 'ComentarioRegalosVisitas' },
    { text: 'Comentario Menu Comidas', value: 'ComentariosMenuComidas' },
    { text: 'Comentarios Generales', value: 'ComentariosGenerales' },
    { text: 'Fecha Apruebo/Rechazo', value: 'FechaHoraAprueboRechazo' },
    { text: 'Motivo Apruebo/Rechazo', value: 'MotivoAprueboRechazo' },
    { text: 'Empresa', value: 'Empresa' },
  ]
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
  useEffect(() => {
    hiddenCols.forEach((col) => {
      show_hide_column(col, false)
    })
  }, [currentPage])

  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }

  function show_hide_column(col_no, do_show) {
    if (do_show) {
      setHiddenCols((prev) => prev.filter((col) => col !== col_no))
    } else {
      setHiddenCols((prev) => [...prev, col_no])
    }
    var rows = document.getElementById('reservas-table').rows
    for (var row = 0; row < rows.length; row++) {
      var cols = rows[row].cells
      if (col_no >= 0 && col_no < cols.length) {
        cols[col_no].style.display = do_show ? '' : 'none'
      }
    }
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalRP btn={<PlusButton />} title="Validar Horario">
          {(closeModal) => <ConfirmarHorario closeModal={closeModal} />}
        </ModalRP>
        <div className="flex gap-2 my-8">
          <div>
            <select
              onChange={(e) => setColumnToSearch(e.target.value)}
              className="w-48 input"
            >
              <option defaultValue={true} value="SalaNombre">
                Buscar por columna
              </option>
              {colSearchFilter.map((col) => (
                <option key={col.value} value={col.value}>
                  {col.text}
                </option>
              ))}
            </select>
          </div>
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
          <ReactHTMLTableToExcel
            className="h-10 button"
            table="reservas-table"
            filename="reservas-table"
            sheet="reservas-table"
            buttonText="Descargar como Excel"
          />
          <ModalRP
            btn="Filtrar Columnas"
            btnClass="h-10 button"
            title="Filtrar Columnas"
          >
            {(closeModal) => (
              <div>
                <div className="grid grid-cols-4 gap-x-4">
                  {columns.map((col, i) => (
                    <div key={col} className="flex justify-between">
                      <label>{col}</label>
                      <input
                        type="checkbox"
                        defaultChecked={
                          hiddenCols.filter((col) => col === i).length === 0
                        }
                        name={col}
                        onChange={(e) => show_hide_column(i, e.target.checked)}
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-4 button-cancel" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            )}
          </ModalRP>
        </div>
        <DefaultTable
          columns={columns}
          extra={2}
          id="reservas-table"
          size="max-w-6xl"
        >
          {reservas &&
            paginated(filterListado(reservas.data)).map((reserva) => (
              <tr key={reserva.ReservaId} className="bg-white border-b ">
                <td className="td-default">{reserva.ReservaId}</td>
                <td className="td-default">{reserva.SalaNombre}</td>
                <td className="td-default">{reserva.NombreSolicitante}</td>
                <td className="td-default">{reserva.EmailSolicitante}</td>
                <td className="td-default">{reserva.TelefonoSolicitante}</td>
                <td className="td-default">{reserva.TipoPersona}</td>
                <td className="td-default">{dateParse(reserva.Fecha)}</td>
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
                <td className="td-default">
                  <StatusText>{reserva.EstadoVinosDegustacion}</StatusText>
                </td>
                <td className="td-default">
                  <StatusText>{reserva.EstadoVinosComidas}</StatusText>
                </td>
                <td className="td-default">
                  <StatusText>{reserva.EstadoRegalosVisitas}</StatusText>
                </td>
                <td className="td-default">
                  <StatusText>{reserva.EstadoMenuComidas}</StatusText>
                </td>
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
                  {dateHourParse(reserva.FechaHoraAprueboRechazo)}
                </td>
                <td className="td-default">{reserva.MotivoAprueboRechazo}</td>
                <td className="td-default">{reserva.Empresa}</td>
                <td className="td-default">
                  <ModalRP
                    title="Editar Reserva"
                    btn={<span className="td-edited">Editar</span>}
                  >
                    {(closeModal) => (
                      <EditarReserva closeModal={closeModal} sala={reserva} />
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
