import { useState } from 'react'
import { useAprobarReserva, useRechazarReserva } from '../../hooks/reservas'
import Alerts from '../Alerts'
const AprobarReserva = ({ closeModal, sala }) => {
  const {
    mutate: aprobarReserva,
    isErrorAprobar,
    isSuccessAprobar,
  } = useAprobarReserva()
  const {
    mutate: rechazarReserva,
    isErrorRechazar,
    isSuccessRechazar,
  } = useRechazarReserva()
  const [obs, setObs] = useState('')
  const handleAprobar = () => {
    const request = { ReservaId: sala.ReservaId, Observacion: obs }
    aprobarReserva(request)
  }
  const handleRechazar = () => {
    const request = { ReservaId: sala.ReservaId, Observacion: obs }
    rechazarReserva(request)
  }

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between my-4">
          <button className="button" onClick={handleAprobar}>
            Aprobar
          </button>
          <button className="button" onClick={handleRechazar}>
            Rechazar
          </button>
        </div>
        <label className="mb-2 font-bold text-[#908161]">Observación</label>
        <input
          type="textarea"
          name="Observacion"
          className="w-full h-12 mb-4 input"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button className="button-cancel" onClick={closeModal}>
            Cerrar
          </button>
        </div>
        <Alerts
          successIf={isSuccessAprobar}
          failedIf={isErrorAprobar}
          succesText="Reserva aprobada correctamente!"
          failedText="Hubo un error inesperado"
        />
        <Alerts
          successIf={isSuccessRechazar}
          failedIf={isErrorRechazar}
          succesText="Reserva aprobada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </>
  )
}
export default AprobarReserva
