import DashboardLayout from '../../components/DashboardLayout'
import TablaUsuariosEmpresa from '../../components/TablaUsuariosEmpresa'

const ListaUsuariosEmpresaPage = () => {
  return (
    <div>
            <h2 className='mb-8 font-bold text-primary'>Lista de Usuarios Empresa</h2>

      <TablaUsuariosEmpresa />
    </div>
  )
}
ListaUsuariosEmpresaPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaUsuariosEmpresaPage
