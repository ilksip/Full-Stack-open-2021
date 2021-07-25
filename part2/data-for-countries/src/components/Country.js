import Weather from "./Weather"
const Country = ({country}) => {
    return(
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Languages:</h2>
        <ul>{country.languages.map((language) => <li key={language.name}>{language.name}</li>)}</ul>
        <img src={country.flag} alt="country flag" height="200"/>
        <Weather city={country.capital}/>
      </div>
    )
}

export default Country