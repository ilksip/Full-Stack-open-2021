import React, {useState, useEffect} from "react"
import axios from "axios"
const Weather = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.city}`).then(response => setWeather(response.data))
    },[api_key, props.city])
    if (weather) {
        return(
            <div>
                <h2>Weather in {props.city}</h2>
                <p>temperature: {weather.current.temperature} Celsius </p>
                <img src={weather.current.weather_icons[0]} alt="weather icon"/>
                <p>wind: {weather.current.wind_speed}km/h {weather.current.wind_dir} </p>
            </div>  
        )
    }
    return null
}

export default Weather