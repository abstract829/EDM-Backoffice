import { useState } from 'react'
import useListadoUsuarios from '../../hooks/useListadoUsuarios'
import useSearch from '../../hooks/useSearch'
import LoaderWhen from '../LoaderWhen'
import ModalComponent from '../Modal'
import PlusButton from '../PlusButton'
import AddUsuario from './AddUsuario'
import EditUsuario from './EditUsuario'

export default function TablaUsuarios() {
  const { listadoUsuarios, isLoading } = useListadoUsuarios()
  const { searchValue, handleChange, filterListado } = useSearch()
  const columns = ['ID', 'Nombre', 'Email', 'Perfil', 'Activo']
  return (
    <>
      <LoaderWhen isTrue={isLoading}>
        <ModalComponent
          title="Crear Usuario"
          btn={<PlusButton />}
          content={<AddUsuario />}
        />
        <input
          className="input"
          placeholder="Busca un usuario..."
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-white uppercase bg-primary">
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col" className="px-6 py-3">
                    {column}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {listadoUsuarios &&
                filterListado(listadoUsuarios).map((usuario) => (
                  <tr key={usuario.UsuarioId} className="bg-white border-b ">
                    <td className="px-6 py-4">{usuario.UsuarioId}</td>
                    <td className="px-6 py-4">{usuario.Nombre}</td>
                    <td className="px-6 py-4">{usuario.Email}</td>
                    <td className="px-6 py-4">{usuario.PerfilNombre}</td>
                    <td className="px-6 py-4">{usuario.Activo}</td>
                    <td className="px-6 py-4 font-medium text-right cursor-pointer text-primary hover:underline">
                      <ModalComponent
                        title="Editar Usuario"
                        btn={
                          <span className="px-6 py-4 font-medium text-right cursor-pointer text-primary hover:underline">
                            Editar
                          </span>
                        }
                        content={<EditUsuario user={usuario} />}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </LoaderWhen>
    </>
  )
}
