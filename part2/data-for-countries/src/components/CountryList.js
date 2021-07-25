import Country from "./Country"

const CountryList = ({countries, filter, setFilter}) => {
    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (filteredCountries.length === 0) {
      return(<p>No countries to display</p>)
    } else if (filteredCountries.length === 1) {
      return(<Country country={filteredCountries[0]}/>)
    } else if (filteredCountries.length > 10) {
      return(<p>Too many countries to display. please refine your search.</p>)
    } else {
      return(
        <div>
          {filteredCountries.map((country) => 
          <div key={country.name}>
            {country.name}
            <button onClick={() => setFilter(country.name)}>show</button>
          </div>
        )}
        </div>  
      )
    }
  }

export default CountryList