import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchAprobarReserva,
  fetchEditarReserva,
  fetchObtenerCalendario,
  fetchObtenerReservas,
  fetchRealizarReserva,
  fetchRealizarReservaBackOffice,
  fetchRechazarReserva,
} from '../services/reserva'
import useAuth from './useAuth'

const key = 'reservas'

export const useQueryCalendario = ({ Fecha }) => {
  const { isAuthenticated } = useAuth()
  return useQuery([key, Fecha], () => fetchObtenerCalendario({ Fecha }), {
    enabled: isAuthenticated,
  })
}
export const useQueryReservas = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key, 'todas'], fetchObtenerReservas, {
    enabled: isAuthenticated,
  })
}
export const useMutateReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchRealizarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useEditReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchEditarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useCreateReservaBackOffice = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchRealizarReservaBackOffice, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useAprobarReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchAprobarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useRechazarReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchRechazarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
