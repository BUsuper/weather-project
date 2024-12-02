import './SmallWeatherBox.css'
import locationArrow from './assets/location-arrow.svg'
import sunnyIcon from './assets/sunny.svg'
import moonIcon from './assets/night.svg'
import cloudyIcon from './assets/cloudy.svg'
import rainyIcon from './assets/rain.svg'
import snowyIcon from './assets/snow.svg'

function SmallWeatherBox({geo=false, locationObj, weatherObj}) {
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

  const conditionsSrc = displayIcon(rain[0], showers[0], snow[0], cloudCover[0], isDay[0]);

  return (
    <div className="smallWeatherBox">
      <div className='topRow'>
          {geo ? <img src={locationArrow} className='geolocationIcon'/> : <img src={locationArrow} className='geolocationIcon hidden'/>}
          <span className='location'>{city}</span>
      </div>
      <div className='middleRow'>
          <img src={conditionsSrc} className='conditionsIcon'/>
          <span className='temperature'>{Math.round(temperature[0])}{temperatureUnit}</span>
      </div>
      <div className='wind'>Wind: {convertWindDirection(windDirection[0])} {Math.round(windSpeed[0])}{windSpeedUnit}</div>
      <div className='precipitation'>{displayPrecipitationProbability(precipitationChance[0], snow[0], rain[0], showers[0], temperature[0])}</div>
    </div>
  );
}

export default SmallWeatherBox