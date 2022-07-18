import React, {useState} from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b079a28dc41651842e4c78085d0f46ef`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation(' ')
    }
  }

  return(
    <div className="app">
      <div className="container">
        <div className="left">
          <div className="location">
            <p className="city">{data.name}</p>
          </div>
          <div className="search">
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder='enter location'
            onKeyPress={searchLocation}
            type="text"/>
          </div>
        </div>

        {data.name !== undefined &&
          <div className="right">
            <p className="description">Description</p>
            <div className="info">
              <div className="sky">
                {data.weather ? <p>Sky: {data.weather[0].main}</p> : null}
              </div>
              <div className="feels">
                {data.main ? <p>Feels like: {data.main.feels_like.toFixed()}°C</p> : null}
              </div>
              <div className="humidity">
                {data.main ? <p>Humifity: {data.main.humidity}%</p> : null}
              </div>
              <div className="wind">
                {data.wind ? <p>Wind speed: {data.wind.speed.toFixed()}KMH</p> : null}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
    
}

export default App;
