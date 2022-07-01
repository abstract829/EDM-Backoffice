import { useState } from 'react'

const useSearch = (key) => {
  const [searchValue, setSearchValue] = useState('')

  const filterListado = (arr) => {
    let search = searchValue.trim().toLowerCase()
    if (search.length > 0) {
      return arr.filter((u) => {
        if (u[key]) {
          return u[key].toString().toLowerCase().includes(search)
        }
        return
      })
    } else {
      return arr
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  return {
    searchValue,
    handleChange,
    filterListado,
  }
}
export default useSearch
