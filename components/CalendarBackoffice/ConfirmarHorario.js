import { useState } from 'react'
import { useQuerySalasActivas } from '../../hooks/salas'
import { fetchValidaBloqueoSala } from '../../services/reserva'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import LoaderWhen from '../LoaderWhen'
import ModalRP from '../ModalRP'
import RenderIf from '../RenderIf'
import ReservaBackOfficeForm from './ReservaBackOfficeForm'
const ConfirmarHorario = ({ precio = '', closeModal }) => {
  const { data, isError, isLoading } = useQuerySalasActivas()
  const [isAvailable, setIsAvailable] = useState(0)
  const [message, setMessage] = useState('')
  const [dataSala, setDataSala] = useState(null)
  if (isLoading) {
    return <LoaderWhen isTrue={isLoading} />
  }
  if (isError) {
    return <p>Hubo un error inesperado</p>
  }
  const form = [
    {
      label: 'Sala',
      type: 'select',
      name: 'SalaId',
      options: data && [
        { text: 'Seleccione', value: '' },
        ...data.data.map((sala) => ({
          value: sala.SalaId,
          text: sala.Nombre,
        })),
      ],
      // value: data && data.data[0].SalaId,
      value: '',
      validations: [{ type: 'required' }],
    },
    {
      label: 'Fecha',
      type: 'date',
      name: 'Fecha',
      value: '',
      validations: [{ type: 'required' }],
    },
    {
      label: 'Hora inicio',
      type: 'time',
      name: 'FechaInicio',
      value: '',
      validations: [{ type: 'required' }],
    },
    {
      label: 'Hora termino',
      type: 'time',
      name: 'FechaTermino',
      value: '',
      validations: [{ type: 'required' }],
    },
  ]
  const handleSubmit = async (values) => {
    const FechaInicio = `${values.Fecha}T${values.FechaInicio}`
    const FechaTermino = `${values.Fecha}T${values.FechaTermino}`
    const Fecha = `${values.Fecha}T00:00:00`
    const HorarioInicio = values.FechaInicio
    const HorarioTermino = values.FechaTermino
    const SalaNombre = data.data.find(
      (sala) => Number(sala.SalaId) === Number(values.SalaId)
    ).Nombre
    const request = {
      SalaId: values.SalaId,
      FechaInicio,
      FechaTermino,
      Fecha,
      HorarioInicio,
      HorarioTermino,
      SalaNombre,
    }
    try {
      const res = await fetchValidaBloqueoSala(request)
      setIsAvailable(1)
      setMessage(res.mensaje)
      setDataSala(request)
    } catch (error) {
      setIsAvailable(2)
      setMessage(error.response.data.mensaje)
    }
  }
  return (
    <>
      <div>
        <NewForm
          form={form}
          submitFunction={handleSubmit}
          btnText="Validar"
          closeForm={closeModal}
        />
        <div className="flex items-center">
          <Alerts
            successIf={isAvailable === 1}
            failedIf={isAvailable === 2}
            succesText={message}
            failedText={message}
          />
          <div className="mt-8">
            <RenderIf isTrue={isAvailable === 1}>
              <ModalRP
                btn={<span className="ml-8 button">Ir a reservar</span>}
                title="Realizar Reserva"
              >
                {(close) => (
                  <ReservaBackOfficeForm
                    dataSala={dataSala}
                    closeModal={close}
                    closeAll={closeModal}
                  />
                )}
              </ModalRP>
            </RenderIf>
          </div>
        </div>
      </div>
    </>
  )
}
export default ConfirmarHorario
