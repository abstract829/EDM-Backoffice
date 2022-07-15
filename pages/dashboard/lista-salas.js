import DashboardLayout from '../../components/DashboardLayout'
import TablaSalas from '../../components/TablaSalas'

const ListaSalasPage = () => {
  return (
    <div>
            <h2 className='mb-8 font-bold text-primary'>Lista de Salas</h2>

      <TablaSalas />
    </div>
  )
}
ListaSalasPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaSalasPage
