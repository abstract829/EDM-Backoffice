import { useState } from 'react'
import { useQueryClient } from 'react-query'
import useCalendar from '../../hooks/useCalendar'
import {
  fetchAprobarReserva,
  fetchAprobarReservaAgencia,
  fetchRechazarReserva,
} from '../../services/reserva'
import Alerts from '../Alerts'
const AprobarReserva = ({ closeModal, sala, closeAll }) => {
  const queryClient = useQueryClient()
  const [isSuccess, setIsSuccess] = useState(0)
  const [obs, setObs] = useState('')
  const handleAprobar = async () => {
    let query = [
      'reservas',
      'activas' +
        new Date(sala.Fecha).getFullYear() +
        (new Date(sala.Fecha).getMonth() + 1),
    ]
    const request = { ReservaId: sala.ReservaId, Observacion: obs }
    const res = await fetchAprobarReserva(request)
    if (res.codigo === 0) {
      setIsSuccess(1)
      setTimeout(() => {
        queryClient.invalidateQueries(query)
        closeAll()
      }, 1000)
    } else {
      setIsSuccess(2)
      setTimeout(() => {
        queryClient.invalidateQueries(query)
        closeAll()
      }, 1000)
    }
    // aprobarReserva(request)
  }
  const handleRechazar = async () => {
    let query = [
      'reservas',
      'activas' +
        new Date(sala.Fecha).getFullYear() +
        (new Date(sala.Fecha).getMonth() + 1),
    ]
    const request = { ReservaId: sala.ReservaId, Observacion: obs }
    const res = await fetchRechazarReserva(request)
    if (res.codigo === 0) {
      setIsSuccess(3)
      setTimeout(() => {
        queryClient.invalidateQueries(query)
        closeAll()
      }, 1000)
    } else {
      setIsSuccess(4)
      setTimeout(() => {
        queryClient.invalidateQueries(query)
        closeAll()
      }, 1000)
    }
    // rechazarReserva(request)
  }

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between my-4">
          <button type="button" className="button" onClick={handleAprobar}>
            Aprobar
          </button>
          <button type="button" className="button" onClick={handleRechazar}>
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
          <button type="button" className="button-cancel" onClick={closeModal}>
            Cerrar
          </button>
        </div>
        <Alerts
          successIf={isSuccess === 1}
          failedIf={isSuccess === 2}
          succesText="Reserva aprobada correctamente!"
          failedText="Hubo un error inesperado"
        />
        <Alerts
          successIf={isSuccess === 3}
          failedIf={isSuccess === 4}
          succesText="Reserva rechazada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </>
  )
}
export default AprobarReserva
