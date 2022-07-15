import api from '../utils/axios'
export const fetchListarEmpresas = async () => {
  const { data } = await api.get('/api/empresa/listar')
  return data
}
export const fetchGuardarEmpresa = async ({
  EmpresaId,
  Nombre,
  Rut,
  Activo,
  CodigoSAP,
}) => {
  const request = {
    EmpresaId,
    Nombre,
    Rut,
    Activo,
    CodigoSAP,
    PrecioFijoTourPP: '70000',
  }
  const { data } = await api.post(`/api/empresa/guardar/`, request)
  return data
}
export const fetchEliminarEmpresa = async ({ EmpresaId }) => {
  const { data } = await api.post(`/api/empresa/eliminar/`, { EmpresaId })
  return data
}
export const fetchObtenerEmpresaPorId = async ({ id }) => {
  const { data } = await api.get(`/api/empresa/obtener/${id}`)
  return data
}
export const fetchListarUsuariosEmpresa = async ({ empresaId }) => {
  const { data } = await api.get(`/api/empresausuario/listar/${empresaId}`)
  return data
}
export const fetchObtenerUsuarioEmpresaPorId = async ({ id }) => {
  const { data } = await api.get(`/api/empresausuario/obtener/${id}`)
  return data
}
export const fetchGuardarUsuarioEmpresa = async ({
  PersonaId,
  NombreCompleto,
  FechaNacimiento,
  CorreoElectronico,
  Genero,
  Ciudad,
  PaisId,
  NumeroDocumento,
  Telefono,
  EmpresaId,
  Password,
}) => {
  const request = {
    PersonaId,
    NombreCompleto,
    FechaNacimiento,
    CorreoElectronico,
    Genero,
    Ciudad,
    PaisId,
    NumeroDocumento,
    Telefono,
    EmpresaId,
    Password,
  }
  const { data } = await api.post(`/api/empresausuario/guardar`, request)
  return data
}
export const fetchEliminarUsuarioEmpresa = async ({ PersonaId }) => {
  const { data } = await api.post(`/api/empresausuario/eliminar/`, {
    PersonaId,
  })
  return data
}
export const fetchAutenticarUsuarioEmpresa = async ({
  CorreoElectronico,
  Password,
}) => {
  const { data } = await api.post(`/api/empresausuario/autenticar/`, {
    CorreoElectronico,
    Password,
  })
  return data
}
