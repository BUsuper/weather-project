export function displayPrecipitationProbability (probability, snow, rain, showers, temperature) {
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
