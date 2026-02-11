const FilterBar = ({ children, results }) => {
  return (
    <div className="filters-bar">
      {children}
      {results ? <div className="results-count">{results}</div> : null}
    </div>
  )
}

export default FilterBar
