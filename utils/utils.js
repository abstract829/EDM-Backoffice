import api from './axios'

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete api.defaults.headers.common.Authorization
  }
}
export const getSession = () => {
  let token = localStorage.getItem('accessToken')
  if (token) {
    setSession(token)
  } else {
    setSession(null)
  }
}
export const dateHourParse = (value) => {
  if (value) {
    let hour = value.split('T')[1]
    hour = hour.split(':')
    hour = `${hour[0]}:${hour[1]}`
    let date = new Date(value)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()

    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year} ${hour}`
  }
  return
}
export const dateParse = (value) => {
  if (value) {
    let date = new Date(value)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()

    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`
  }
  return
}
export const parseMonthNumberToName = (num) => {
  switch (num) {
    case 1:
      return 'Enero'
    case 2:
      return 'Febrero'
    case 3:
      return 'Marzo'
    case 4:
      return 'Abril'
    case 5:
      return 'Mayo'
    case 6:
      return 'Junio'
    case 7:
      return 'Julio'
    case 8:
      return 'Ago.'
    case 9:
      return 'Sept.'
    case 10:
      return 'Oct.'
    case 11:
      return 'Nov.'
    case 12:
      return 'Dic.'
    default:
      break
  }
}
export const parseDayNumberToName = (num) => {
  switch (num) {
    case 1:
      return 'Lunes'
    case 2:
      return 'Martes'
    case 3:
      return 'Miercoles'
    case 4:
      return 'Jueves'
    case 5:
      return 'Viernes'
    case 6:
      return 'Sabado'
    case 0:
      return 'Domingo'
  }
}
export function checkRut(rut) {
  // Despejar Puntos
  var valor = rut.replace('.', '')
  var valor = valor.replace('.', '')
  // Despejar Gui??n
  valor = valor.replace('-', '')

  // Aislar Cuerpo y D??gito Verificador
  var cuerpo = valor.slice(0, -1)
  var dv = valor.slice(-1).toUpperCase()

  // Formatear RUN
  rut = cuerpo + '-' + dv

  // Si no cumple con el m??nimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    return [false, valor]
  }

  // Calcular D??gito Verificador
  var suma = 0
  var multiplo = 2

  // Para cada d??gito del Cuerpo
  for (var i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el M??ltiplo Correspondiente
    var index = multiplo * valor.charAt(cuerpo.length - i)

    // Sumar al Contador General
    suma = suma + index

    // Consolidar M??ltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1
    } else {
      multiplo = 2
    }
  }

  // Calcular D??gito Verificador en base al M??dulo 11
  var dvEsperado = 11 - (suma % 11)

  // Casos Especiales (0 y K)
  dv = dv == 'K' ? 10 : dv
  dv = dv == 0 ? 11 : dv

  // Validar que el Cuerpo coincide con su D??gito Verificador
  if (dvEsperado != dv) {
    return [false, valor]
  }

  // Si todo sale bien, eliminar errores (decretar que es v??lido)
  return [true, valor]
}
export const validateValue = (value) => {
  if (value) return value
  return ''
}
export const formatCLP = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value)
}
