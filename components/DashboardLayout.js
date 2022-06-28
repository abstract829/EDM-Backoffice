import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="px-4 py-4 mt-12 lg:px-4">
          <div className="p-8 shadow">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout
