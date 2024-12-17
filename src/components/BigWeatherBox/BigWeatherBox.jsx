import './BigWeatherBox.css'
import {TinyWeatherBox} from '../TinyWeatherBox/TinyWeatherBox'
import locationArrow from '../../assets/location-arrow.svg'
import trashIcon from '../../assets/trash.svg'
import { convertWindDirection, displayPrecipitationProbability, displayIcon } from '../../utils'

export function BigWeatherBox({geo, locationObj, weatherObj, del}) {
  const forecastHoursIndecies = [1, 2, 3, 4];
  const { country, city } = locationObj;
  const { hourly: weather, hourly_units: units, daily, } = weatherObj;
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
  const { temperature_2m_min: minTemps,
          temperature_2m_max: maxTemps,
  } = daily;

  const conditionsSrc = displayIcon(rain[0], showers[0], snow[0], cloudCover[0], isDay[0]);
  const locationName = `${city}, ${country}`;

  return (
    <div className="bigWeatherBox">
      <div className='topRowBig'>
          {geo ? <img src={locationArrow} className='geolocationIconBig'/> : <img src={locationArrow} className='geolocationIconBig hidden'/>}
          <div className='locationBig'>
            {
            // Checks if the location name is too long to be fully displayed
            locationName.length > 23 ?
            // Only playes the animations if it is
            <span className='scroll'>{city}, {country}</span> :
            <span>{city}, {country}</span>
            }
            </div>
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
        <span className='dayTemperatureBig'>Min: {Math.round(minTemps[0])}{temperatureUnit}</span>
        <span className='dayTemperatureBig'>Max: {Math.round(maxTemps[0])}{temperatureUnit}</span>
      </div>
      <div className='forecastRowBig'>
        {forecastHoursIndecies.map(i => {
          return <TinyWeatherBox weatherObj={weatherObj} index={i} key={`forecast${i}`} />
        })}
      </div>
      {geo ? <img src={trashIcon} className='deleteIconBig hidden'/> : <img src={trashIcon} className='deleteIconBig' onClick={del}/>}
    </div>
  );
}
