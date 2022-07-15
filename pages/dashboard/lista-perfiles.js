import DashboardLayout from '../../components/DashboardLayout'
import TablaPerfiles from '../../components/TablaPerfiles'

const ListaPerfilesPage = () => {
  return (
    <div>
            <h2 className='mb-8 font-bold text-primary'>Lista de Perfiles</h2>

      <TablaPerfiles />
    </div>
  )
}
ListaPerfilesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaPerfilesPage
