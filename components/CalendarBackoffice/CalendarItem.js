import RenderIf from '../RenderIf'

const CalendarItem = ({ sala }) => {
  return (
    <>
      <RenderIf isTrue={sala.TipoReserva === 'WEB'}>
        <div className="w-40 text-left calendar-item-web">
          <p className="text-xs">{sala.DescripcionVisita}</p>
          <p className="text-xs">
            {sala.HorarioInicio} - {sala.HorarioTermino}
          </p>
          {/* <p className="text-sm">{sala.TipoReserva}</p> */}
        </div>
      </RenderIf>
      <RenderIf isTrue={sala.TipoReserva !== 'WEB'}>
        <div className="w-40 text-left break-words calendar-item-interna">
          <p className="text-xs">{sala.DescripcionVisita}</p>
          <p className="text-xs">
            {sala.HorarioInicio} - {sala.HorarioTermino}
          </p>
          {/* <p className="text-sm">{sala.TipoReserva}</p> */}
        </div>
      </RenderIf>
    </>
  )
}
export default CalendarItem
