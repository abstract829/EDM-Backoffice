import api from '../utils/axios'

export const fetchRefreshToken = async () => {
  const { data } = await api.get('/api/usuario/tokenrefresh')
  return data
}

export const fetchAutenticarUsuario = async ({
  PerfilId,
  Nombre,
  Email,
  Password,
  Activo,
}) => {
  const request = { PerfilId, Nombre, Email, Password, Activo }
  const { data } = await api.post('/api/usuario/autenticar', request)
  return data
}
export const fetchGuardarUsuario = async ({
  UsuarioId,
  PerfilId,
  Nombre,
  Email,
  Password,
  Activo,
}) => {
  const request = { UsuarioId, PerfilId, Nombre, Email, Password, Activo }
  const { data } = await api.post('/api/usuario/guardar', request)
  return data
}
export const fetchGuardarPerfil = async ({
  PerfilId,
  Nombre,
  Activo,
  MisFunciones,
}) => {
  const request = { PerfilId, Nombre, Activo, MisFunciones }
  const { data } = await api.post('/api/perfil/guardar', request)
  return data
}
export const fetchObtenerUsuarioPorId = async ({ id }) => {
  const { data } = await api.get(`/api/usuario/obtener/${id}`)
  return data
}
export const fetchObtenerPerfilPorId = async ({ id }) => {
  const { data } = await api.get(`/api/perfil/obtener/${id}`)
  return data
}
export const fetchListarUsuarios = async () => {
  const { data } = await api.get(`/api/usuario/listar`)
  return data
}
export const fetchListarPerfiles = async () => {
  const { data } = await api.get(`/api/perfil/listar`)
  return data
}
export const fetchListarPerfilesActivos = async () => {
  const { data } = await api.get(`/api/perfil/listarActivos`)
  return data
}
export const fetchListarModulos = async () => {
  const { data } = await api.get(`/api/perfil/listarModulos`)
  return data
}
export const fetchListarFunciones = async () => {
  const { data } = await api.get(`/api/perfil/listarFunciones`)
  return data
}
export const fetchObtenerPersonaById = async ({ id }) => {
  const { data } = await api.get(`/api/usuario/obtenermipersona/${id}`)
  return data
}
