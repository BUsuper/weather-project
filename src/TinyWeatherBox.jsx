import './TinyWeatherBox.css'
import { displayPrecipitationProbability, displayIcon } from './utils';

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
  } = units;

  const conditionsSrc = displayIcon(rain[index], showers[index], snow[index], cloudCover[index], isDay[index]);

  return (
    <div className="tinyWeatherBox">
      <div className='timeTiny'>
        {time[index].slice(-5)}
      </div>
      <div className='middleRowTiny'>
          <img src={conditionsSrc} className='conditionsIconTiny'/>
          <span className='temperatureTiny'>{Math.round(temperature[index])}{temperatureUnit}</span>
      </div>
      <div className='precipitationTiny'>{displayPrecipitationProbability(precipitationChance[index], snow[index], rain[index], showers[index], temperature[index])}</div>
    </div>
  );
}

export default TinyWeatherBox