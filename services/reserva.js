import api from '../utils/axios'
export const fetchObtenerCalendario = async ({ Fecha }) => {
  const { data } = await api.post('/api/reserva/calendarioWeb', { Fecha })
  return data
}
export const fetchRealizarReserva = async (req) => {
  const { data } = await api.post('/api/reserva/solicitarWeb', req)
  return data
}
export const fetchObtenerReservas = async () => {
  const { data } = await api.get('/api/reserva/listarTodas')
  return data
}
export const fetchValidaBloqueoSala = async (req) => {
  const { data } = await api.post('/api/reserva/validaBloqueoSala', req)
  return data
}
export const fetchEditarReserva = async (req) => {
  const { data } = await api.post('/api/reserva/actualizar', req)
  return data
}
export const fetchRealizarReservaBackOffice = async (req) => {
  const { data } = await api.post('/api/reserva/guardar', req)
  return data
}
export const fetchAprobarReserva = async (req) => {
  const { data } = await api.post('/api/reserva/aprobarSolicitudWeb', req)
  return data
}
export const fetchAprobarReservaAgencia = async (req) => {
  const { data } = await api.post('/api/reserva/aprobarSolicitudAgencia', req)
  return data
}
export const fetchRechazarReserva = async (req) => {
  const { data } = await api.post('/api/reserva/rechazarSolicitudWeb', req)
  return data
}
export const fetchListarReservasActivas = async ({ Agno, Mes }) => {
  const { data } = await api.post('/api/reserva/listarActivasBackoffice', {
    Agno,
    Mes,
  })
  return data
}
export const fetchReservaById = async ({ id }) => {
  const { data } = await api.get(`/api/reserva/obtener/${id}`)
  return data
}
