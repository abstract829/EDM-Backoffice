import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Link from 'next/link'
import 'react-pro-sidebar/dist/css/styles.css'

const Sidebar = ({ collapsed }) => {
  const menus = [
    {
      name: 'Usuarios',
      routes: [
        {
          name: 'Lista de usuarios',
          path: '/dashboard/lista-usuarios',
        },
        {
          name: 'Lista de perfiles',
          path: '/dashboard/lista-perfiles',
        },
      ],
    },
    {
      name: 'Salas',
      routes: [
        {
          name: 'Lista de salas',
          path: '/dashboard/lista-salas',
        },
        {
          name: 'Lista de feriados',
          path: '/dashboard/lista-feriados',
        },
      ],
    },
    {
      name: 'Empresas',
      routes: [
        {
          name: 'Lista de empresas',
          path: '/dashboard/lista-empresas',
        },
        {
          name: 'Lista de usuarios',
          path: '/dashboard/lista-usuariosempresa',
        },
      ],
    },
    {
      name: 'Reservas',
      routes: [
        {
          name: 'Calendario',
          path: '/dashboard/reserva-calendario',
        },
        {
          name: 'Lista de Reservas',
          path: '/dashboard/lista-reservas',
        },
      ],
    },
    {
      name: 'Perfil',
      routes: [
        {
          name: 'Cerrar sesión',
          path: '/auth/sign-in',
        },
      ],
    },
  ]

  return (
    <ProSidebar collapsed={collapsed}>
      <Menu iconShape="square">
        <MenuItem>
          <div className="flex flex-col items-center justify-center">
            <img src="/imgs/logo.png" className="h-16" />
            <span className="relative font-bold uppercase bottom-5">
              <Link href="/dashboard">
                <a className="text-lg">Don Melchor</a>
              </Link>
            </span>
          </div>
        </MenuItem>
        {menus.map((menu) => (
          <SubMenu key={menu.name} title={menu.name} defaultOpen={true}>
            {menu.routes.map((route) => (
              <MenuItem key={route.name}>
                <Link href={route.path}>
                  <a>{route.name}</a>
                </Link>
              </MenuItem>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </ProSidebar>
  )
}
export default Sidebar
