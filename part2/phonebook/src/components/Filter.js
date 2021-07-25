const Filter = ({filter, handleFilterChange}) => {
    return(
        <div>
            Filter shown with: <input value={filter} onChange={handleFilterChange}></input>
        </div>
    )
    
}

export default Filter