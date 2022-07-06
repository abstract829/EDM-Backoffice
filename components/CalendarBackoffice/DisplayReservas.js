import { dateParse } from '../../utils/utils'
import ModalRP from '../ModalRP'
import CalendarItem from './CalendarItem'
import EditarReserva from './EditarReserva'

const DisplayReservas = ({ Reserva, Fecha }) => {
  return (
    <div>
      <ul
        className={
          Reserva.length < 6
            ? 'mt-4 flex w-full flex-col flex-wrap items-center justify-center text-xl'
            : 'mt-4  grid grid-cols-3 gap-2 text-xl'
        }
      >
        {Reserva.map((sala, i) => (
          <li key={i}>
            <ModalRP
              title={`N° Reserva: ${sala.ReservaId} - ${dateParse(
                Fecha.split('T')[0]
              )} ${sala.Sala} ${sala.HorarioInicio} -
                                ${sala.HorarioTermino}`}
              btn={<CalendarItem sala={sala} />}
            >
              {(closeModal) => (
                <EditarReserva closeModal={closeModal} sala={sala} />
              )}
            </ModalRP>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default DisplayReservas
