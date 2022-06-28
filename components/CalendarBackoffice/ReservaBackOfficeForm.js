import { useCreateReservaBackOffice } from '../../hooks/reservas'
import useAuth from '../../hooks/useAuth'
import { useQueryPersona } from '../../hooks/users'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import LoaderWhen from '../LoaderWhen'
import ModalRP from '../ModalRP'
import EditarSolicitante from './EditarSolicitante'
import form from './form-backoffice.json'
const ReservaBackOfficeForm = ({ closeModal, dataSala }) => {
  const {
    mutate: realizarReserva,
    isError,
    isSuccess,
  } = useCreateReservaBackOffice()
  const { user } = useAuth()
  const {
    data: persona,
    isLoading,
    isErrorPersona,
  } = useQueryPersona({ id: user.UsuarioId })
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
      PersonaId: persona.data.PersonaId,
      Solicitante: persona.data,
    }
    realizarReserva(request)
  }
  return (
    <>
      <div>
        {/* <p className="mb-4 text-xl font-semibold text-center text-primary font-uppercase">
          Total a pagar: {precio} - Limite de personas: 11
        </p> */}
        <div className="flex items-center gap-8 px-4">
          <h2 className="text-md">Solicitante: {user.Nombre}</h2>
          <ModalRP
            title="Solicitante Reserva"
            btn={<span className="button">Ver datos</span>}
          >
            {(closeModal) => (
              <EditarSolicitante
                closeModal={closeModal}
                solicitante={persona && persona.data}
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
          succesText="Reserva creada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </>
  )
}
export default ReservaBackOfficeForm
