import './App.css';
import {
  SmallBox,
  SmallWeatherBox,
  SmallAddBox,
  SearchBox,
  BigWeatherBox,
  BigModal
} from './components';
import useApp from './useApp';

export default function App() {
  const {
    gLocation,
    gWeather,
    locations,
    locationsWeather,
    currentLocation,
    currentWeather,
    currentGeo,
    currentIndex,
    isSearchVisible,
    isBigWeatherVisible,
    bigModalRef,
    handleDeletion,
    handleLocationAddition,
    handleSmallAddBoxClick,
    handleSmallWeatherClick,
  } = useApp();

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
