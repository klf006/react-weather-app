import React, { useState } from 'react';

//API key and base search 
const API = {
  key:"cc7581bc4d1e89b910f7d21fe45199dc",
  base:"api.openweathermap.org/data/2.5/"
}

//Date Builder for location box
const dateBuilder = (d) =>{
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${date}, ${year}`
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

//Search callback for location
  const search = event => {
    if (event.key === "Enter"){
      fetch(`${API.base}weather?q=${query}&units=imperial&APPID=${API.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }


  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
            <div className="location-box">
              <div className="location">Houston, TX</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                95°F
              </div>
              <div className="weather">
                Sunny
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
