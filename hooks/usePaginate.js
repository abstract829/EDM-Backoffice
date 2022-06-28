import { useState } from 'react'

const usePaginate = ({ perPage = 5, arr = [] }) => {
  const [itemsPerPage, setItemsPerPage] = useState(perPage)
  const [currentPage, setCurrentPage] = useState(0)
  const paginated = (x) => {
    return x.slice(currentPage, currentPage + itemsPerPage)
  }
  const nextPage = () => {
    if (currentPage + itemsPerPage > arr.length) return
    setCurrentPage((prev) => prev + itemsPerPage)
  }
  const prevPage = () => {
    if (currentPage - itemsPerPage < 0) return
    setCurrentPage((prev) => prev - itemsPerPage)
  }
  const setPage = (num) => {
    setCurrentPage(num * itemsPerPage)
  }
  const totalPages = () => {
    return Math.ceil(arr.length / itemsPerPage)
  }
  return {
    paginated,
    nextPage,
    prevPage,
    setPage,
    totalPages,
    currentPage,
    itemsPerPage,
  }
}
export default usePaginate
