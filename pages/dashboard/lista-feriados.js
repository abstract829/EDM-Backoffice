import DashboardLayout from '../../components/DashboardLayout'
import TablaFeriados from '../../components/TablaFeriados'

const ListaFeriadosPage = () => {
  return (
    <div>
            <h2 className='mb-8 font-bold text-primary'>Lista de Feriados</h2>

      <TablaFeriados />
    </div>
  )
}
ListaFeriadosPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ListaFeriadosPage
