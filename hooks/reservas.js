import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchAprobarReserva,
  fetchAprobarReservaAgencia,
  fetchCancelarReserva,
  fetchEditarReserva,
  fetchListarReservasActivas,
  fetchObtenerCalendario,
  fetchObtenerReservas,
  fetchRealizarReserva,
  fetchRealizarReservaBackOffice,
  fetchRechazarReserva,
  fetchReservaById,
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
export const useQueryReservaById = ({ id }) => {
  const { isAuthenticated } = useAuth()
  return useQuery([key, id], () => fetchReservaById({ id }), {
    enabled: isAuthenticated,
  })
}
export const useQueryReservasActivas = ({ Agno, Mes }) => {
  const { isAuthenticated } = useAuth()
  return useQuery(
    [key, 'activas' + Agno + Mes],
    () => fetchListarReservasActivas({ Agno, Mes }),
    {
      enabled: isAuthenticated,
    }
  )
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
export const useAprobarReservaAgencia = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchAprobarReservaAgencia, {
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
export const useCancelarReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchCancelarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
