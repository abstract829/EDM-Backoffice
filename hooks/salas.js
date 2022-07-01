import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchEliminarSala,
  fetchGuardarSala,
  fetchListarSalas,
  fetchListarSalasActivas,
  fetchObtenerSalaPorId,
} from '../services/salas'
import useAuth from './useAuth'
const key = 'listaSalas'
export const useMutateSala = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchGuardarSala, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useDeleteSala = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchEliminarSala, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useQuerySalas = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key], fetchListarSalas, {
    enabled: isAuthenticated,
  })
}
export const useQuerySalasActivas = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key], fetchListarSalasActivas, {
    enabled: isAuthenticated,
  })
}
export const useQuerySalaById = ({ id }) => {
  return useQuery([key, id], () => fetchObtenerSalaPorId({ id }))
}
