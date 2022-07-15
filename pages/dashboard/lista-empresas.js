import DashboardLayout from '../../components/DashboardLayout'
import TablaEmpresas from '../../components/TablaEmpresas'

const ListaEmpresasPage = () => {
  return (
    <div>
      <h2 className='mb-8 font-bold text-primary'>Lista de Empresas</h2>
      <TablaEmpresas />
    </div>
  )
}
ListaEmpresasPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaEmpresasPage
