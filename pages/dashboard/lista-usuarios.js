import DashboardLayout from '../../components/DashboardLayout'
import TablaUsuarios from '../../components/TablaUsuarios'

const ListaUsuariosPage = () => {
  return (
    <div>
            <h2 className='mb-8 font-bold text-primary'>Lista de Usuarios</h2>

      <TablaUsuarios />
    </div>
  )
}
ListaUsuariosPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaUsuariosPage
