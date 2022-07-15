import CalendarBackoffice from '../../components/CalendarBackoffice'
import DashboardLayout from '../../components/DashboardLayout'
import TablaUsuariosEmpresa from '../../components/TablaUsuariosEmpresa'

const ReservaCalendarioPage = () => {
  return (
    <div>
            <h2 className='mb-8 font-bold text-center text-primary'>Calendario de Reservas</h2>

      <CalendarBackoffice />
    </div>
  )
}
ReservaCalendarioPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ReservaCalendarioPage
