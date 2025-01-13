import sunnyIcon from '../assets/sunny.svg'
import moonIcon from '../assets/night.svg'
import cloudyIcon from '../assets/cloudy.svg'
import rainyIcon from '../assets/rain.svg'
import snowyIcon from '../assets/snow.svg'

export function displayIcon (rain, showers, snow, cloudCover, isDay) {
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
