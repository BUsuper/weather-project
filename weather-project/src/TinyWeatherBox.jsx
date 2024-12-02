import './TinyWeatherBox.css'
import sunnyIcon from './assets/sunny.svg'
import moonIcon from './assets/night.svg'
import cloudyIcon from './assets/cloudy.svg'
import rainyIcon from './assets/rain.svg'
import snowyIcon from './assets/snow.svg'

function TinyWeatherBox({ weatherObj, index}) {
  const { hourly: weather, hourly_units: units } = weatherObj;
  const { temperature_2m: temperature,
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

  const conditionsSrc = displayIcon(rain[index], showers[index], snow[index], cloudCover[index], isDay[index]);

  return (
    <div className="tinyWeatherBox">
      <div className='timeTiny'>
        {time[index]}
      </div>
      <div className='conditionsRowTiny'>
          <img src={conditionsSrc} className='conditionsIconTiny'/>
          <span className='temperatureTiny'>{Math.round(temperature[index])}{temperatureUnit}</span>
      </div>
      <div className='precipitationTiny'>{displayPrecipitationProbability(precipitationChance[index], snow[index], rain[index], showers[index], temperature[index])}</div>
    </div>
  );
}

export default SmallWeatherBox