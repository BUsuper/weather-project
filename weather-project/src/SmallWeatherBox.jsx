import './SmallWeatherBox.css'
import locationArrow from './assets/location-arrow.svg'
import { convertWindDirection, displayPrecipitationProbability, displayIcon } from './weatherfunctions'

function SmallWeatherBox({geo=false, locationObj, weatherObj, onClick}) {
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

  const conditionsSrc = displayIcon(rain[0], showers[0], snow[0], cloudCover[0], isDay[0]);

  return (
    <div className="smallWeatherBox" onClick={onClick}>
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