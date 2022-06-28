const DefaultTable = ({ columns, children, extra }) => {
  return (
    <div className="relative max-w-6xl overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-white uppercase bg-primary ">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-6 py-3">
                {column}
              </th>
            ))}
            {Array.from(Array(extra)).map((e, i) => (
              <th scope="col" className="px-6 py-3" key={i}>
                <span className="sr-only">Action</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
export default DefaultTable
