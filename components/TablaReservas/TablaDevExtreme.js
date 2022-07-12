import { DataGrid } from 'devextreme-react'
import { Item } from 'devextreme-react/accordion'
import { Button } from 'devextreme-react/autocomplete'
import { Export } from 'devextreme-react/bar-gauge'
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Editing,
  FilterRow,
  Form,
  GroupPanel,
  Pager,
  Paging,
  Popup,
  RequiredRule,
  SearchPanel,
} from 'devextreme-react/data-grid'
import { useEffect, useState } from 'react'
import { useQueryReservas } from '../../hooks/reservas'
import ConfirmarHorario from '../CalendarBackoffice/ConfirmarHorario'
import EditarReserva from '../CalendarBackoffice/EditarReserva'
import LoaderWhen from '../LoaderWhen'
import Modal2 from '../Modal2'
import ModalRP from '../ModalRP'
import PlusButton from '../PlusButton'

const TablaDevExtreme = () => {
  const { data: reservas, isLoading, isError } = useQueryReservas()
  const [toggleEdit, setToggleEdit] = useState(false)
  const [dataToEdit, setDataToEdit] = useState(null)

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
    hiddeWidgs()
    setDataToEdit(e.row.data)
    setToggleEdit(true)
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
          onClose={() => {
            setToggleEdit(false)
            showWidgs()
          }}
        >
          {(closeModal) => (
            <EditarReserva sala={dataToEdit} closeModal={closeModal} />
          )}
        </Modal2>
      )}
      <div className="max-w-6xl dtable">
        {reservas && (
          <DataGrid
            dataSource={reservas.data}
            allowColumnReordering={true}
            keyExpr="ReservaId"
            onSaving={(e) => console.log(e)}
            onEditingStart={(e) => console.log(e)}
            columnAutoWidth={true}
          >
            <Column type="buttons" width={110}>
              <Button name="editar" icon="edit" onClick={handleEditButton} />
            </Column>
            <Column dataField="Fecha" dataType="date" />
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
            <Column dataField="EstadoVinosDegustacion" />
            <Column dataField="EstadoVinosComidas" />
            <Column
              dataField="EstadoRegalosVisitas"
              caption="Regalos para visitas"
            />
            <Column
              dataField="EstadoMenuComidas"
              caption="Menú almuerzo/cena"
            />

            <Paging defaultPageSize={30} />
            <Pager
              showPageSizeSelector={true}
              showNavigationButtons={true}
              allowedPageSizes={[30]}
              showInfo={true}
            />
            <FilterRow visible={true} />
            <SearchPanel visible={true} />
            <GroupPanel visible={true} />

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
