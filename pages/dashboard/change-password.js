import ChangePassword from '../../components/ChangePassword'
import DashboardLayout from '../../components/DashboardLayout'

const ChangePasswordPage = () => {
  return (
    <div>
      <h2 className="mb-8 font-bold text-primary">Cambiar contraseña</h2>
      <div className="max-w-md">
        <ChangePassword />
      </div>
    </div>
  )
}
ChangePasswordPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ChangePasswordPage
