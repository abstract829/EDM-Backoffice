import { DataGrid } from 'devextreme-react'
import { Item } from 'devextreme-react/accordion'
import { Button } from 'devextreme-react/autocomplete'
import { Export } from 'devextreme-react/bar-gauge'
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Editing,
  FilterPanel,
  FilterRow,
  Form,
  GroupPanel,
  HeaderFilter,
  Pager,
  Paging,
  Popup,
  RequiredRule,
  SearchPanel,
  StateStoring,
} from 'devextreme-react/data-grid'
import { useEffect, useState } from 'react'
import { useQueryReservas } from '../../hooks/reservas'
import { dateParse } from '../../utils/utils'
import Alert from '../Alert'
import ConfirmarHorario from '../CalendarBackoffice/ConfirmarHorario'
import EditarReserva from '../CalendarBackoffice/EditarReserva'
import LoaderWhen from '../LoaderWhen'
import Modal2 from '../Modal2'
import ModalRP from '../ModalRP'
import NoAccess from '../NoAccess'
import PlusButton from '../PlusButton'
import RenderIf from '../RenderIf'
import StatusText from './StatusText'

const TablaDevExtreme = () => {
  const { data: reservas, isLoading, isError } = useQueryReservas()
  const [toggleEdit, setToggleEdit] = useState(false)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [notEditable, setNotEditable] = useState(false)
  if (!reservas) {
    return <NoAccess />
  }
  if (isLoading) {
    return <LoaderWhen isTrue={isLoading} />
  }
  if (isError) {
    return <p>Hubo un error inesperado</p>
  }
  const hiddeWidgs = () => {
    let widgs = document.getElementsByClassName('dx-widget')
    Array.from(widgs).forEach((el) => {
      el.classList.add('hiddewidget')
    })
  }
  const showWidgs = () => {
    let widgs = document.getElementsByClassName('dx-widget')
    Array.from(widgs).forEach((el) => {
      el.classList.remove('hiddewidget')
    })
  }
  const handleEditButton = (e) => {
    if (e.row.data.TipoVisita !== 'TOUR WEB') {
      hiddeWidgs()
      setDataToEdit(e.row.data)
      setToggleEdit(true)
      setNotEditable(false)
    } else {
      setNotEditable(true)
    }
  }
  return (
    <>
      <ModalRP
        btn={<PlusButton />}
        title="Validar Horario"
        onOpen={hiddeWidgs}
        onClose={showWidgs}
      >
        {(closeModal) => <ConfirmarHorario closeModal={closeModal} />}
      </ModalRP>
      {reservas && dataToEdit && (
        <Modal2
          key={toggleEdit}
          setOpen={toggleEdit}
          title={`N° Reserva: ${dataToEdit.ReservaId} - ${dateParse(
            dataToEdit.Fecha.split('T')[0]
          )} ${dataToEdit.SalaNombre} ${dataToEdit.HorarioInicio} -
                            ${dataToEdit.HorarioTermino}`}
          onClose={() => {
            setToggleEdit(false)
            showWidgs()
          }}
          showCancel={false}
        >
          {(closeModal) => (
            <EditarReserva sala={dataToEdit} closeModal={closeModal} />
          )}
        </Modal2>
      )}
      <div className="max-w-6xl dtable">
        <RenderIf isTrue={notEditable}>
          <Alert type="failed" className="flex items-center w-72">
            No puedes editar ese tipo de reservas
          </Alert>
        </RenderIf>

        {reservas && (
          <DataGrid
            dataSource={reservas.data}
            allowColumnReordering={true}
            keyExpr="ReservaId"
            columnAutoWidth={true}
          >
            <Column type="buttons" width={110}>
              <Button name="editar" icon="edit" onClick={handleEditButton} />
            </Column>
            <Column dataField="Fecha" dataType="date" format={'dd/MM/yyyy'} />
            <Column dataField="HorarioInicio" />
            <Column dataField="HorarioTermino" />
            <Column dataField="DescripcionVisita" caption="Visita" />
            <Column
              dataField="CantidadPersonas"
              dataType="number"
              caption="No. PAX"
            />
            <Column dataField="TipoVisita" />
            <Column dataField="NombreSolicitante" />
            <Column
              dataField="ComentariosGenerales"
              caption="Descripción de evento"
            />
            <Column dataField="SalaNombre" caption="Sala" />
            <Column dataField="Marketing" />
            <Column dataField="Exportaciones" />
            <Column dataField="OtrasGerencias" />
            <Column dataField="EncargadoTour" />
            <Column dataField="EnologoSommelier" />
            <Column dataField="LugarAlmuerzoCena" caption="Almuerzo" />
            <Column dataField="CopasDegustacion" caption="Copas" />
            <Column
              dataField="EstadoVinosDegustacion"
              cellRender={(cell) => <StatusText>{cell.value}</StatusText>}
            />
            <Column
              dataField="EstadoVinosComidas"
              cellRender={(cell) => <StatusText>{cell.value}</StatusText>}
            />
            <Column
              dataField="EstadoRegalosVisitas"
              caption="Regalos para visitas"
              cellRender={(cell) => <StatusText>{cell.value}</StatusText>}
            />
            <Column
              dataField="EstadoMaterialesDegustacion"
              caption="Estado materiales degustación"
              cellRender={(cell) => <StatusText>{cell.value}</StatusText>}
            />
            <Column
              dataField="EstadoMenuComidas"
              caption="Menú almuerzo/cena"
              cellRender={(cell) => <StatusText>{cell.value}</StatusText>}
            />
            <Paging defaultPageSize={30} />
            <Pager
              showPageSizeSelector={true}
              showNavigationButtons={true}
              allowedPageSizes={[30]}
              showInfo={true}
            />
            <StateStoring
              enabled={true}
              type="localStorage"
              storageKey="storage-reservas"
            />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <FilterRow visible={true} />
            <SearchPanel visible={true} />
            <GroupPanel
              visible={true}
              emptyPanelText="Arraste una columna aquí para agrupar"
            />
            <ColumnChooser enabled={true} allowSearch={true} mode={true} />{' '}
            <Export
              enabled={true}
              fileName="tabla-reservas"
              allowExportSelectedData={false}
            />
            <ColumnFixing enabled={false} />
          </DataGrid>
        )}
      </div>
    </>
  )
}
export default TablaDevExtreme
