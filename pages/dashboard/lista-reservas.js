import DashboardLayout from '../../components/DashboardLayout'
import TablaReservas from '../../components/TablaReservas'
import TablaDevExtreme from '../../components/TablaReservas/TablaDevExtreme'

const ListaReservasPage = () => {
  return (
    <div>
      {/* <TablaReservas /> */}
      <TablaDevExtreme />
    </div>
  )
}
ListaReservasPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaReservasPage
