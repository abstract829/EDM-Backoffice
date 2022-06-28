import DashboardLayout from '../../components/DashboardLayout'
import TablaReservas from '../../components/TablaReservas'

const ListaReservasPage = () => {
  return (
    <div>
      <TablaReservas />
    </div>
  )
}
ListaReservasPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaReservasPage
