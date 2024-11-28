import { get } from "http";

let city, country, lat, lon;

// Test Location from IP API
/*
const lURL = "http://ip-api.com/json/";
try {
    const lres = await fetch(lURL);
    const locationResult = await lres.json();

    ({city, country, lat, lon} = locationResult);

    console.log(`Country: ${country}, City: ${city},\nLatitude: ${lat}, Longitude: ${lon}`);
    
}
catch(err) {
    console.log(err)
}

// Test Weather API
const wURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m`;
try {
    const wres = await fetch(wURL);
    const weatherResult = await wres.json();

    console.log(weatherResult);
    
}
catch(err) {
    console.log(err)
} 
*/

/*
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

  console.log(displayPrecipitationProbability(10, 0, 1.20, 0.2, 11)) */

  async function getListOfLocations (input) {
    const apiKey = '9487826a849c6e290364f57c634026fd';
    const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`;

    try {
        const gRes = await fetch(geocodingURL);
        const geocodingResult = await gRes.json();

        const listOfLocations = geocodingResult.map(r => {
            return {
                name: r.name,
                state: r.state,
                country: r.country,
                lat: r.lat,
                lon: r.lon,
            };
        });

        console.log(listOfLocations);
    } 
    catch (err) {
        console.log(err);
    }
  }

  getListOfLocations('Lo');