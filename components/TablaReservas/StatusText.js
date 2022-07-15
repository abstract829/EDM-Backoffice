import RenderIf from "../RenderIf"

const StatusText = ({ children }) => {
    return (
      <>
        <RenderIf isTrue={children === 'Solicitados'}>
          <span className="font-bold text-orange-500 ">
            {children}
          </span>
        </RenderIf>
        <RenderIf isTrue={children === 'No solicitados'}>
          <span className="font-bold text-red-500 ">{children}</span>
        </RenderIf>
        <RenderIf isTrue={children === 'Recibidos'}>
          <span className="font-bold text-green-500 ">{children}</span>
        </RenderIf>
      </>
    )
  }

  export default StatusText