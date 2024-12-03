import { useState, useEffect, useRef } from 'react';
import './App.css';
import SmallWeatherBox from './SmallWeatherBox';
import SmallAddBox from './SmallAddBox';
import SearchBox from './SearchBox';
import BigWeatherBox from './BigWeatherBox';

function App() {
  const [gLocation, setGLocation] = useState({});
  const [gWeather, setGWeather] = useState({});
  const [locations, setLocations] = useState([]);
  const [locationsWeather, setLocationsWeather] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentGeo, setCurrentGeo] = useState(false)

  const [searchIsVisible, setSearchIsVisible] = useState(false);
  const searchRef = useRef(null);

  const [bigWeatherIsVisible, setBigWeatherIsVisible] = useState(false);
  const bigWeatherRef = useRef(null);

  function handleLocationAddition (coordinates) {
    setLocations([...locations, coordinates])
    getWeather(coordinates.lat, coordinates.lon).then(weatherResult => {
      setLocationsWeather([...locationsWeather, weatherResult]);
    })
  }

  function handleSmallWeatherClick (geo, locationObj, weatherObj) {
    setCurrentGeo(geo);
    setCurrentLocation(locationObj);
    setCurrentWeather(weatherObj);
    setBigWeatherIsVisible(!bigWeatherIsVisible);
  }

  async function getCurrenLocation() {
    const lURL = "http://ip-api.com/json/";

    try {
      const res = await fetch(lURL);
      const locationResult = await res.json();

      const {city, country, lat, lon} = locationResult;
      setGLocation({ city, country, lat, lon });
    }
    catch(err) {
      console.log(err);
    }
  }

  async function getWeather(lat, lon) {
    const wURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&wind_speed_unit=ms&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_hours=6`;
    try {
      const res = await fetch(wURL);
      const weatherResult = await res.json();
      return (weatherResult);
    }
    catch(err) {
      console.log(err)
      return null;
    }
  }

  useEffect(() => {
    getCurrenLocation();
  }, []);

  useEffect(() => {
    if (gLocation.lat && gLocation.lon) {
      getWeather(gLocation.lat, gLocation.lon).then(weatherResult => {
        setGWeather(weatherResult)
        // DELETE THIS LATER!
        console.log(weatherResult);
      });
    }
  }, [gLocation]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchIsVisible(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bigWeatherRef.current && !bigWeatherRef.current.contains(e.target)) {
        setBigWeatherIsVisible(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bigWeatherRef]);

  if (gWeather && gWeather.hourly && gWeather.hourly_units) {
    return (
      <>
      <div id="weatherContainer">
        <SmallWeatherBox geo={true} 
                         locationObj={gLocation}
                         weatherObj={gWeather}
                         onClick={() => handleSmallWeatherClick(true, gLocation, gWeather)}
        />
        {locationsWeather.length > 0
         ? locationsWeather.map((location, index) => {
          return <SmallWeatherBox geo={false}
                                  locationObj={locations[index]}
                                  weatherObj={location}
                                  onClick={() => handleSmallWeatherClick(false, locations[index], location)}
                                  key={`${locations[index].city}${locations[index].country}${locations[index].lat}${locations[index].lon}`}
          />
         })
         : ''}
        <SmallAddBox onClick={() => setSearchIsVisible(!searchIsVisible)}/>
        {searchIsVisible && <SearchBox ref={searchRef} onSubmit={handleLocationAddition}/>}
        {bigWeatherIsVisible && <BigWeatherBox geo={currentGeo}
                                               locationObj={currentLocation}
                                               weatherObj={currentWeather}
                                               ref={bigWeatherRef}/>}
      </div>  
      </>
    )
  } else {
    return <div>Loading...</div>;
  }
}

export default App
