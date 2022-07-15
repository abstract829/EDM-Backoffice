import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchGuardarUsuario,
  fetchListarUsuarios,
  fetchObtenerPersonaById,
  fetchObtenerUsuarioPorId,
} from '../services/user'
import useAuth from './useAuth'

const key = 'listaUsuarios'

export const useQueryUsers = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key], fetchListarUsuarios, {
    enabled: isAuthenticated,
  })
}
export const useMutateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchGuardarUsuario, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useQueryPersona = ({ id }) => {
  const { isAuthenticated } = useAuth()
  return useQuery(
    [key, 'persona' + id],
    () => fetchObtenerPersonaById({ id }),
    {
      enabled: isAuthenticated,
    }
  )
}
export const useQueryUsuarioById = ({id}) => {
  
  return useQuery(
    [key, id],
    () => fetchObtenerUsuarioPorId({ id })
  )
}
