import { useEffect, useState } from 'react'
import { parseDayNumberToName } from '../utils/utils'
import { useQueryReservasActivas } from './reservas'
const useCalendar = () => {
  const [calendario, setCalendario] = useState([])
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const { data, isError, isLoading } = useQueryReservasActivas({
    Agno: year,
    Mes: month,
  })
  useEffect(() => {
    if (data) {
      let daysInMonth = new Date(year, month, 0).getDate()
      setCalendario(
        new Array(daysInMonth).fill(undefined).map((val, i) => {
          let fecha = `${year}-${month < 10 ? '0' + month : month}-${
            i < 9 ? '0' + (i + 1) : i + 1
          }T00:00:00`
          let filter = data.data.filter((f) => f.Fecha === fecha)
          return {
            Fecha: fecha,
            Reserva: filter,
          }
        })
      )
    }
  }, [month, year, data])

  const parseFechaToDayDisplay = (fecha) => {
    const date = new Date(fecha)
    const num = date.getDate()
    let day = date.getDay()
    day = parseDayNumberToName(day)
    return `${day} ${num < 10 ? '0' + num : num}`
  }
  const increaseYear = () => {
    setYear((prev) => prev + 1)
  }
  const decreaseYear = () => {
    const currentYear = new Date().getFullYear()
    if (year - 1 >= currentYear) {
      setYear((prev) => prev - 1)
    }
  }
  const increaseMonth = () => {
    if (month + 1 <= 12) {
      setMonth((prev) => prev + 1)
    }
  }
  const decreaseMonth = () => {
    const currentMonth = new Date().getMonth() + 1
    const thisYear = new Date().getFullYear()
    if (month - 1 < 1) return
    if (month - 1 >= currentMonth || year > thisYear) {
      setMonth((prev) => prev - 1)
    }
  }
  return {
    month,
    year,
    increaseMonth,
    decreaseMonth,
    increaseYear,
    decreaseYear,
    parseFechaToDayDisplay,
    calendario,
    isLoading,
    isError,
  }
}
export default useCalendar
