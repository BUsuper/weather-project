import './BigWeatherBox.css'
import TinyWeatherBox from './TinyWeatherBox'
import locationArrow from './assets/location-arrow.svg'
import sunnyIcon from './assets/sunny.svg'
import moonIcon from './assets/night.svg'
import cloudyIcon from './assets/cloudy.svg'
import rainyIcon from './assets/rain.svg'
import snowyIcon from './assets/snow.svg'
import trashIcon from './assets/trash.svg'

function BigWeatherBox({geo=false, locationObj, weatherObj}) {
  const forecastHoursIndecies = [1, 2, 3, 4];
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
          time,
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
    <div className="bigWeatherBox">
      <div className='topRowBig'>
          {geo ? <img src={locationArrow} className='geolocationIconBig'/> : <img src={locationArrow} className='geolocationIconBig hidden'/>}
          <span className='locationBig'>{city}, {country}</span>
      </div>
      <div className='timeBig'>{time[0].slice(-5)}</div>
      <div className='middleRowBig'>
          <img src={conditionsSrc} className='conditionsIconBig'/>
          <span className='temperatureBig'>{Math.round(temperature[0])}{temperatureUnit}</span>
      </div>
      <div className='conditionsRowBig'>
        <span className='windBig'>Wind: {convertWindDirection(windDirection[0])} {Math.round(windSpeed[0])}{windSpeedUnit}</span>
        <span className='precipitationBig'>{displayPrecipitationProbability(precipitationChance[0], snow[0], rain[0], showers[0], temperature[0])}</span>
      </div>
      <div className='conditionsRowBig'>
        <span className='dayTemperatureBig'>Min: 10°C</span>
        <span className='dayTemperatureBig'>Max: 22°C</span>
      </div>
      <div className='forecastRowBig'>
        {forecastHoursIndecies.map(i => {
          return <TinyWeatherBox weatherObj={weatherObj} index={i} key={`forecast${i}`} />
        })}
      </div>
      <img src={trashIcon} className='deleteIconBig'/>
    </div>
  );
}

export default BigWeatherBox