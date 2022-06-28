const Pagination = ({
  prevPage,
  nextPage,
  setPage,
  currentPage,
  itemsPerPage,
  totalPages,
}) => {
  return (
    <>
      <button className="h-10 button" onClick={prevPage}>
        Anterior
      </button>
      <select
        onChange={(e) => setPage(e.target.value)}
        value={currentPage / itemsPerPage}
        className="h-10 text-center border-2 border-primary"
      >
        {Array.from(Array(totalPages).keys()).map((page) => (
          <option key={page} value={page}>
            {page + 1}
          </option>
        ))}
      </select>
      <button className="h-10 button" onClick={nextPage}>
        Siguiente
      </button>
    </>
  )
}
export default Pagination
