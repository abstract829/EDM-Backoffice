import { useEffect } from 'react'
import { useCreateReservaBackOffice } from '../../hooks/reservas'
import useAuth from '../../hooks/useAuth'
import useReserva from '../../hooks/useReserva'
import { useQueryPersona } from '../../hooks/users'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import LoaderWhen from '../LoaderWhen'
import ModalRP from '../ModalRP'
import RenderIf from '../RenderIf'
import EditarSolicitante from './EditarSolicitante'
import form from './form-backoffice.json'
const ReservaBackOfficeForm = ({ closeModal, dataSala, closeAll }) => {
  const {
    mutate: realizarReserva,
    isError,
    isSuccess,
  } = useCreateReservaBackOffice()
  const { solicitante, setSolicitante } = useReserva()
  const { user } = useAuth()
  const {
    data: persona,
    isLoading,
    isErrorPersona,
  } = useQueryPersona({ id: user.UsuarioId })
  useEffect(() => {
    if (persona) {
      setSolicitante(persona.data)
    }
  }, [persona])

  if (isLoading) {
    return <LoaderWhen isTrue={isLoading} />
  }
  if (isErrorPersona) {
    return <p>Hubo un error inesperado</p>
  }

  const handleSubmit = async (values) => {
    const request = {
      ...dataSala,
      ...values,
      TipoReserva: 'INTERNA',
      TipoVisita: 'EXPERIENCIA DON MELCHOR',
      Estado: 'CONFIRMADA',
      TipoPersona: 'EJECUTIVO',
      // PersonaId: persona.data.PersonaId,
      PersonaId: 0,
      Solicitante: solicitante,
    }
    console.log({ request })
    realizarReserva(request)
  }
  if (isSuccess) {
    setTimeout(() => {
      closeAll()
    }, 1000)
  }
  return (
    <>
      <div>
        {/* <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
          Total a pagar: {precio} - Limite de personas: 11
        </p> */}
        <div className="flex items-center gap-8 px-4">
          <h2 className="text-md">Solicitante: {solicitante.NombreCompleto}</h2>
          <ModalRP
            title="Solicitante Reserva"
            btn={<span className="button">Ver datos</span>}
          >
            {(closeModal) => (
              <EditarSolicitante
                closeModal={closeModal}
                solicitante={solicitante}
              />
            )}
          </ModalRP>
        </div>
        <NewForm
          form={form}
          submitFunction={handleSubmit}
          btnText="Reservar"
          closeForm={closeModal}
        />
        <Alerts
          successIf={isSuccess}
          failedIf={isError}
          succesText="Reserva generada exitosamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </>
  )
}
export default ReservaBackOfficeForm
