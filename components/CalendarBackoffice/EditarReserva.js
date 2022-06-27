import { useEditReserva, useQueryReservaById } from '../../hooks/reservas'
import useReserva from '../../hooks/useReserva'
import { validateValue } from '../../utils/utils'
import Alerts from '../Alerts'
import NewForm from '../FormikForm/NewForm'
import LoaderWhen from '../LoaderWhen'
import ModalRP from '../ModalRP'
import RenderIf from '../RenderIf'
import AprobarReserva from './AprobarReserva'
import AsistentesTable from './AsistentesTable'
import EditarSolicitante from './EditarSolicitante'
const EditarReserva = ({ closeModal, sala }) => {
  const { mutate: editReserva, isError, isSuccess } = useEditReserva()
  const {
    data: reserva,
    isErrorSala,
    isLoadingSala,
  } = useQueryReservaById({
    id: sala.ReservaId,
  })
  const { asistentes } = useReserva()
  if (isLoadingSala) {
    return <LoaderWhen isTrue={isLoadingSala} />
  }
  const isWebOrAgencia = () => {
    return (
      reserva &&
      (reserva.data.TipoReserva === 'WEB' ||
        reserva.data.TipoReserva === 'AGENCIA')
    )
  }
  const form = [
    {
      label: 'Idioma',
      type: 'select',
      name: 'Idioma',
      options: [
        {
          value: 'Español',
          text: 'Español',
        },
        {
          value: 'Inglés',
          text: 'Inglés',
        },
        {
          value: 'Portugues',
          text: 'Portugues',
        },
      ],
      value: reserva && validateValue(reserva.data.Idioma),
      validations: [{ type: 'required' }],
      disabled: isWebOrAgencia(),
    },
    {
      label: 'Cantidad de asistentes',
      type: 'number',
      name: 'CantidadPersonas',
      value: reserva && validateValue(reserva.data.CantidadPersonas),
      validations: [{ type: 'required' }],
      disabled: isWebOrAgencia(),
    },
    {
      label: 'Area Solicitante',
      type: 'text',
      name: 'AreaSolicitante',
      value: reserva && validateValue(reserva.data.AreaSolicitante),
    },
    {
      label: 'Tipo de Reserva',
      type: 'text',
      name: 'TipoReserva',
      value: reserva && validateValue(reserva.data.TipoReserva),
      disabled: true,
    },
    {
      label: 'Requerimientos especiales',
      type: 'textarea',
      name: 'RequerimientosEspeciales',
      value: reserva && validateValue(reserva.data.RequerimientosEspeciales),
    },

    {
      label: 'Cantidad de personal de CyT',
      type: 'text',
      name: 'PersonalCyt',
      value: reserva && validateValue(reserva.data.PersonalCyt),
    },
    {
      label: 'Enologo Sommelier',
      type: 'text',
      name: 'EnologoSommelier',
      value: reserva && validateValue(reserva.data.EnologoSommelier),
    },
    {
      label: 'Encargado del Tour',
      type: 'text',
      name: 'EncargadoTour',
      value: reserva && validateValue(reserva.data.EncargadoTour),
    },
    {
      label: 'Lugar Almuerzo y Cena',
      type: 'text',
      name: 'LugarAlmuerzoCena',
      value: reserva && validateValue(reserva.data.LugarAlmuerzoCena),
    },
    {
      label: 'Comentarios del Lugar Almuerzo y Cena',
      type: 'textarea',
      name: 'ComentarioLugarAlmuerzoCena',
      value: reserva && validateValue(reserva.data.ComentarioLugarAlmuerzoCena),
    },
    {
      label: 'Copas de Degustacion',
      type: 'text',
      name: 'CopasDegustacion',
      value: reserva && validateValue(reserva.data.CopasDegustacion),
    },
    {
      label: 'Estado Vinos de Degustacion',
      type: 'select',
      name: 'EstadoVinosDegustacion',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: reserva && validateValue(reserva.data.EstadoVinosDegustacion),
    },
    {
      label: 'Comentario Vinos de Degustacion',
      type: 'textarea',
      name: 'ComentarioVinosDegustacion',
      value: reserva && validateValue(reserva.data.ComentarioVinosDegustacion),
    },
    {
      label: 'Estado Vinos de Comidas',
      type: 'select',
      name: 'EstadoVinosComidas',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: reserva && validateValue(reserva.data.EstadoVinosComidas),
    },
    {
      label: 'Comentario Vinos de Comidas',
      type: 'textarea',
      name: 'ComentarioVinosComidas',
      value: reserva && validateValue(reserva.data.ComentarioVinosComidas),
    },
    {
      label: 'Estado Regalos Visitas',
      type: 'select',
      name: 'EstadoRegalosVisitas',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: reserva && validateValue(reserva.data.EstadoRegalosVisitas),
    },
    {
      label: 'Comentario Regalos Visitas',
      type: 'textarea',
      name: 'ComentarioRegalosVisitas',
      value: reserva && validateValue(reserva.data.ComentarioRegalosVisitas),
    },
    {
      label: 'Estado Menu Comidas',
      type: 'select',
      name: 'EstadoMenuComidas',
      options: [
        {
          value: 'No solicitados',
          text: 'No solicitados',
        },
        {
          value: 'Solicitados',
          text: 'Solicitados',
        },
        {
          value: 'Recibidos',
          text: 'Recibidos',
        },
      ],
      value: reserva && validateValue(reserva.data.EstadoMenuComidas),
    },
    {
      label: 'Comentarios Menu Comidas',
      type: 'textarea',
      name: 'ComentariosMenuComidas',
      value: reserva && validateValue(reserva.data.ComentariosMenuComidas),
    },
    {
      label: 'Comentarios Generales',
      type: 'textarea',
      name: 'ComentariosGenerales',
      value: reserva && validateValue(reserva.data.ComentariosGenerales),
    },
  ]

  const handleSubmit = async (values) => {
    if (asistentes.length > 0) {
      editReserva({ ...reserva.data, ...values, Asistentes: asistentes })
    } else {
      editReserva({ ...reserva.data, ...values })
    }
  }
  const isSolicitada = (sala) => {
    return sala.TipoReserva === 'WEB' && sala.Estado === 'SOLICITADA'
  }
  const isInterna = (sala) => {
    return sala.TipoReserva === 'INTERNA'
  }
  const isOld = (sala) => {
    return new Date(sala.Fecha).getTime() - new Date().getTime() < 0
  }
  const showAprobadoRechazado = (sala) => {
    const isValidTipoReserva =
      sala.TipoReserva === 'WEB' || sala.TipoReserva === 'AGENCIA'
    const isValidEstado =
      sala.Estado === 'CONFIRMADA' || sala.Estado === 'RECHAZADA'
    return isValidTipoReserva && isValidEstado
  }
  return (
    <>
      {reserva && (
        <>
          <div className="flex items-center justify-between">
            <ModalRP
              title="Datos del Solicitante"
              btn={<span className="m-4 button">Solicitante</span>}
            >
              {(closeModal) => (
                <EditarSolicitante
                  closeModal={closeModal}
                  solicitante={reserva.data.Solicitante}
                />
              )}
            </ModalRP>
            <ModalRP
              title="Lista de Asistentes"
              btn={<span className="m-4 button">Asistentes</span>}
            >
              {(closeModal) => (
                <div className="w-full max-w-7xl">
                  <AsistentesTable
                    closeModal={closeModal}
                    Asistentes={reserva.data.Asistentes}
                  />
                  <button
                    className="float-right mt-12 button-cancel w-96"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </ModalRP>
            <RenderIf isTrue={isSolicitada(sala)}>
              <ModalRP
                title="Aprobar / rechazar"
                btn={
                  <span className="m-4 button-secondary">Aprobar/Rechazar</span>
                }
              >
                {(closeModal) => (
                  <AprobarReserva closeModal={closeModal} sala={sala} />
                )}
              </ModalRP>
            </RenderIf>
            <RenderIf isTrue={isInterna(sala)}>
              <button className="m-4 button-secondary">Cancelar Reserva</button>
            </RenderIf>
          </div>
          <NewForm
            form={form}
            submitFunction={handleSubmit}
            btnText="Guardar cambios"
            closeForm={closeModal}
            disabled={isOld(sala)}
          />
          <Alerts
            successIf={isSuccess}
            failedIf={isError}
            succesText="Reserva editada correctamente!"
            failedText="Hubo un error inesperado"
          />
        </>
      )}
    </>
  )
}
export default EditarReserva
