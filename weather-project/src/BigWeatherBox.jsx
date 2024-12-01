import './BigWeatherBox.css'
import locationArrow from './assets/location-arrow.svg'
import sunnyIcon from './assets/sunny.svg'
import moonIcon from './assets/night.svg'
import cloudyIcon from './assets/cloudy.svg'
import rainyIcon from './assets/rain.svg'
import snowyIcon from './assets/snow.svg'
import trashIcon from './assets/trash.svg'

function BigWeatherBox({geo=false, locationObj, weatherObj}) {
  const { country, city, lat, lon } = locationObj;
  const { hourly: weather, hourly_units: units } = weatherObj;
  const { temperature_2m: temperature,
          wind_speed_10m: windSpeed,
          wind_direction_10m: windDirection,
          precipitation_probability: precipitationChance,
          rain,
          snowfall: snow,
          showers,
          cloud_cover: cloudCover,
          is_day: isDay,
  } = weather;
  const { temperature_2m: temperatureUnit,
          wind_speed_10m: windSpeedUnit,
  } = units;

  function convertWindDirection (degrees) {
      const directions = ['N', 'NNE', 'NE', 'ENE', 
                          'E', 'ESE', 'SE', 'SSE', 
                          'S', 'SSW', 'SW', 'WSW', 
                          'W', 'WNW', 'NW', 'NNW'];

      const position = Math.floor(((degrees + 11.25) % 360) / 22.5)
      return directions[position];
  }

  function displayPrecipitationProbability (probability, snow, rain, showers, temperature) {
      let type;
      let largest = 0;
  
      const precipitation = {
        'Snow': snow,
        'Rain': rain,
        'Showers': showers,
      };
  
      for (const property in precipitation) {
        if (precipitation[property] > largest) {
          type = property;
          largest = precipitation[property];
        }
      }

      if (largest < 0.1) {
          type = temperature < 0 ? 'Snow' : 'Rain';
        }
    
        return `${type}: ${probability}%`;
  }

  function displayIcon (rain, showers, snow, cloudCover, isDay) {
    if (rain >= 1 || showers >= 1) {
      return rainyIcon;
    }
    if (snow >= 0.1) {
      return snowyIcon;
    }
    if (cloudCover >= 25) {
      return cloudyIcon;
    }
    if (isDay == 1) {
      return sunnyIcon;
    } else {
      return moonIcon;
    }
  }

  const conditionsSrc = displayIcon(rain, showers, snow, cloudCover, isDay);

  return (
    <div className="bigWeatherBox">
      <div className='topRow'>
          {geo ? <img src={locationArrow} className='geolocationIcon'/> : <img src={locationArrow} className='geolocationIcon hidden'/>}
          <span className='location'>{city}, {country}</span>
      </div>
      <div className='time'>12:00</div>
      <div className='middleRow'>
          <img src={conditionsSrc} className='conditionsIcon'/>
          <span className='temperature'>{Math.round(temperature)}{temperatureUnit}</span>
      </div>
      <div className='conditionsRow'>
        <span className='windBig'>Wind: {convertWindDirection(windDirection)} {Math.round(windSpeed)}{windSpeedUnit}</span>
        <span className='precipitationBig'>{displayPrecipitationProbability(precipitationChance, snow, rain, showers, temperature)}</span>
      </div>
      <div className='conditionsRow'>
        <span className='smallTemperature'>10°C</span>
        <span className='smallTemperature'>22°C</span>
      </div>
      <div className='forecastRow'>

      </div>
      <img src={trashIcon} className='deleteIcon'/>
    </div>
  );
}

export default BigWeatherBox