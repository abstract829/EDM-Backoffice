import RenderIf from '../RenderIf'

const CalendarItem = ({ sala }) => {
  return (
    <>
      <RenderIf isTrue={sala.Estado === 'CONFIRMADA'}>
        <div className="text-center calendar-item-confirmado">
          <p>{sala.Sala}</p>
          <p>
            {sala.HorarioInicio} - {sala.HorarioTermino}
          </p>
          <p className="text-sm">{sala.TipoReserva}</p>
        </div>
      </RenderIf>
      <RenderIf isTrue={sala.Estado === 'SOLICITADA'}>
        <div className="text-center calendar-item-solicitado">
          <p>{sala.Sala}</p>
          <p>
            {sala.HorarioInicio} - {sala.HorarioTermino}
          </p>
          <p className="text-sm">{sala.TipoReserva}</p>
        </div>
      </RenderIf>
    </>
  )
}
export default CalendarItem
