import { createContext, useEffect, useState } from 'react'
export const ReservaContext = createContext(null)

export const ReservaProvider = ({ children }) => {
  const [asistentes, setAsistentes] = useState([])
  const [solicitante, setSolicitante] = useState([])
  const [reservaData, setReservaData] = useState([])
  useEffect(() => {
    console.log(asistentes)
  }, [asistentes])

  return (
    <ReservaContext.Provider
      value={{
        asistentes,
        solicitante,
        reservaData,
        setAsistentes,
        setSolicitante,
        setReservaData,
      }}
    >
      {children}
    </ReservaContext.Provider>
  )
}
