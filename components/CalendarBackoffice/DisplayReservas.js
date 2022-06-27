import ModalRP from '../ModalRP'
import CalendarItem from './CalendarItem'
import EditarReserva from './EditarReserva'

const DisplayReservas = ({ Reserva, Fecha }) => {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xl w-96">
      {Reserva.map((sala, i) => (
        <li key={i}>
          <ModalRP
            title={`${Fecha.split('T')[0]} ${sala.Sala} ${sala.HorarioInicio} -
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
  )
}
export default DisplayReservas
