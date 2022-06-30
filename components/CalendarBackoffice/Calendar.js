import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Alert from '../Alert'
import LoaderWhen from '../LoaderWhen'
import { parseMonthNumberToName } from '../../utils/utils'
import RenderIf from '../RenderIf'
import ModalRP from '../ModalRP'
import PlusButton from '../PlusButton'
import ConfirmarHorario from './ConfirmarHorario'
import ModalComponent from '../Modal'
import DisplayReservas from './DisplayReservas'
import useCalendar from '../../hooks/useCalendar'

const Calendar = () => {
  const {
    month,
    year,
    increaseMonth,
    decreaseMonth,
    increaseYear,
    decreaseYear,
    calendario,
    parseFechaToDayDisplay,
    isLoading,
    isError,
  } = useCalendar()
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }

  return (
    <LoaderWhen isTrue={isLoading}>
      <div className="flex items-center justify-between">
        <ModalRP btn={<PlusButton />} title="Validar Horario">
          {(closeModal) => <ConfirmarHorario closeModal={closeModal} />}
        </ModalRP>
        <div className="flex gap-8 mb-8 ">
          <div className="flex items-center gap-4">
            <GrFormPrevious
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={decreaseYear}
            />
            <span className="my-4 text-4xl font-semibold font-helvetica">
              {year}
            </span>
            <GrFormNext
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={increaseYear}
            />
          </div>
          <div className="flex items-center gap-2">
            <GrFormPrevious
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={decreaseMonth}
            />
            <span className="w-20 my-4 text-3xl font-semibold text-center">
              {parseMonthNumberToName(month)}
            </span>
            <GrFormNext
              className="w-8 h-8 bg-white cursor-pointer rounded-3xl"
              onClick={increaseMonth}
            />
          </div>
        </div>
      </div>
      <div className="grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {calendario.length > 0 &&
          calendario.map(({ Fecha, Reserva }) => (
            <div
              className="bg-[url('../public/imgs/donmelchor.jpg')] bg-cover  bg-center"
              key={Fecha}
            >
              <div className="h-56 text-white bg-black border-4 max-w-72 border-primary bg-opacity-80">
                <p className="my-2 text-2xl font-semibold text-center">
                  {parseFechaToDayDisplay(Fecha)}
                </p>
                <div className="flex flex-col items-center mb-4">
                  <p className="text-xl font-semibold text-center">Horarios:</p>
                  <RenderIf isTrue={Reserva.length < 2}>
                    <DisplayReservas Reserva={Reserva} Fecha={Fecha} />
                  </RenderIf>
                  <RenderIf isTrue={Reserva.length >= 2}>
                    <ModalComponent
                      title="Seleccione la reserva"
                      btn={
                        <p className="px-4 py-2 mt-4 text-xl font-bold text-white uppercase border-2 shadow cursor-pointer bg-secondary border-primary rounded-3xl">
                          ({Reserva.length}) Reservas
                        </p>
                      }
                      content={
                        <DisplayReservas Reserva={Reserva} Fecha={Fecha} />
                      }
                    />
                  </RenderIf>
                </div>
              </div>
            </div>
          ))}
      </div>
    </LoaderWhen>
  )
}
export default Calendar
