import { useQuerySalas } from '../../hooks/salas'
import useSearch from '../../hooks/useSearch'
import Alert from '../Alert'
import DefaultTable from '../DefaultTable'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import ModalRP from '../ModalRP'
import PlusButton from '../PlusButton'
import RenderIf from '../RenderIf'
import AddSala from './AddSala'
import DiasBloqueados from './DiasBloqueados'
import EditSala from './EditSala'
import FechasBloqueadas from './FechasBloqueadas'
import MisTemporadas from './MisTemporadas'
export default function TablaSalas() {
  const { data: listadoSalas, isLoading, isError } = useQuerySalas()
  const { searchValue, handleChange, filterListado } = useSearch('Nombre')
  const columns = [
    'ID',
    'Nombre',
    'Disponible Online',
    'Activo',
    'Temporadas',
    'Fechas Bloqueadas',
    'Dias Bloqueados',
  ]
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const isOnline = (sala) => {
    return sala.DisponibleOnLine === 'SI'
  }
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        {/* <ModalComponent
          title="Crear Sala"
          btn={<PlusButton />}
          content={<AddSala />}
        /> */}
        <input
          className="input"
          placeholder="Busca una sala..."
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <DefaultTable columns={columns} extra={2}>
          {listadoSalas &&
            filterListado(listadoSalas.data).map((sala) => (
              <tr key={sala.SalaId} className="bg-white border-b ">
                <td className="td-default">{sala.SalaId}</td>
                <td className="td-default">{sala.Nombre}</td>
                <td className="td-default">{sala.DisponibleOnLine}</td>
                <td className="td-default">{sala.Activo}</td>
                <RenderIf isTrue={isOnline(sala)}>
                  <td>
                    <ModalComponent
                      title={`Temporadas - Sala ${sala.Nombre}`}
                      btn={<span className="td-edited">Ver</span>}
                      content={<MisTemporadas id={sala.SalaId} />}
                    />
                  </td>
                  <td>
                    <ModalComponent
                      title={`Fechas Bloqueadas - Sala ${sala.Nombre}`}
                      btn={<span className="td-edited">Ver</span>}
                      content={<FechasBloqueadas id={sala.SalaId} />}
                    />
                  </td>
                  <td>
                    <ModalRP
                      title={`Dias Bloqueados - Sala ${sala.Nombre}`}
                      btn={<span className="td-edited">Ver</span>}
                    >
                      {(closeModal) => (
                        <DiasBloqueados
                          id={sala.SalaId}
                          closeModal={closeModal}
                        />
                      )}
                    </ModalRP>
                  </td>
                </RenderIf>
                <RenderIf isTrue={!isOnline(sala)}>
                  <td></td>
                  <td></td>
                  <td></td>
                </RenderIf>
                <td className="text-right">
                  <ModalRP
                    title="Editar Sala"
                    btn={<span className="td-edited">Editar</span>}
                  >
                    {(closeModal) => (
                      <EditSala id={sala.SalaId} closeModal={closeModal} />
                    )}
                  </ModalRP>
                </td>
              </tr>
            ))}
        </DefaultTable>
      </LoaderWhen>
    </>
  )
}
