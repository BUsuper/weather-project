import { useState, useEffect, useRef } from 'react';
import './App.css';
import { SmallBox } from './components';
import { SmallWeatherBox } from './components/';
import { SmallAddBox } from './components/';
import { SearchBox } from './components';
import { BigWeatherBox } from './components';
import { BigModal } from './components';

function App() {
  const [gLocation, setGLocation] = useState({});
  const [gWeather, setGWeather] = useState({});
  const [locations, setLocations] = useState([]);
  const [locationsWeather, setLocationsWeather] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentGeo, setCurrentGeo] = useState(false)
  const [currentIndex, setCurrentIndex] = useState();

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isBigWeatherVisible, setIsBigWeatherVisible] = useState(false);
  const bigModalRef = useRef(null);

  function handleLocationAddition (coordinates) {
    setLocations([...locations, coordinates])
    getWeather(coordinates.lat, coordinates.lon).then(weatherResult => {
      setLocationsWeather([...locationsWeather, weatherResult]);
    })
  }

  function handleSmallWeatherClick (geo, locationObj, weatherObj, index) {
    setCurrentGeo(geo);
    setCurrentLocation(locationObj);
    setCurrentWeather(weatherObj);
    setIsBigWeatherVisible(true);
    setCurrentIndex(index);
  }

  function handleSmallAddBoxClick () {
    setIsSearchVisible(true);
  }

  function handleDeletion (index) {
    console.log('Deleting index:', index);
    setLocations(locations.filter((location, i) => index !== i));
    setLocationsWeather(locationsWeather.filter((location, i) => index !== i));
    setIsBigWeatherVisible(false);
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

  // Gets user's coordinates based on their ip adress
  useEffect(() => {
    getCurrenLocation();
  }, []);

  // Gets the weather in user's location
  useEffect(() => {
    if (gLocation.lat && gLocation.lon) {
      getWeather(gLocation.lat, gLocation.lon).then(weatherResult => {
        setGWeather(weatherResult)
      });
    }
  }, [gLocation]);

  // Makes SearchBox or BigWeatherBox within BigModal disappear when the user clicks somewhere outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bigModalRef.current && !bigModalRef.current.contains(e.target)) {
        setIsSearchVisible(false);
        setIsBigWeatherVisible(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bigModalRef]);

  // Renders when the data about user's weather is loaded, if not, renders 'Loading...'
  if (gWeather && gWeather.hourly && gWeather.hourly_units) {
    return (
      <>
      <div id="weatherContainer">
        <SmallBox>
          <SmallWeatherBox geo={true} 
                          locationObj={gLocation}
                          weatherObj={gWeather}
                          onClick={() => handleSmallWeatherClick(true, gLocation, gWeather, null)}
          />
        </SmallBox>
        {locationsWeather.length > 0
         ? locationsWeather.map((location, index) => {
            return <SmallBox key={`${locations[index].city}${locations[index].country}${locations[index].lat}${locations[index].lon}`}>
                      <SmallWeatherBox geo={false}
                                      locationObj={locations[index]}
                                      weatherObj={location}
                                      onClick={() => handleSmallWeatherClick(false, locations[index], location, index)}
                      />
                  </SmallBox>
         })
         : ''}
        <SmallBox>
          <SmallAddBox onClick={handleSmallAddBoxClick}/>
        </SmallBox>
        {isSearchVisible && <BigModal ref={bigModalRef}>
                              <SearchBox onSubmit={handleLocationAddition}/>
                            </BigModal>}
        {isBigWeatherVisible && <BigModal ref={bigModalRef}>
                                  <BigWeatherBox geo={currentGeo}
                                                 locationObj={currentLocation}
                                                 weatherObj={currentWeather}
                                                 del={() => handleDeletion(currentIndex)}/>
                                </BigModal>}
      </div>  
      </>
    )
  } else {
    return <div>Loading...</div>;
  }
}

export default App
