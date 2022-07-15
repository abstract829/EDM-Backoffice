import DashboardLayout from '../../components/DashboardLayout'
import TablaReservas from '../../components/TablaReservas'
import TablaDevExtreme from '../../components/TablaReservas/TablaDevExtreme'

const ListaReservasPage = () => {
  return (
    <div>
      {/* <TablaReservas /> */}
      <h2 className='mb-8 font-bold text-primary'>Lista de Reservas</h2>

      <TablaDevExtreme />
    </div>
  )
}
ListaReservasPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaReservasPage
