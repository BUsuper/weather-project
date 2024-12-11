import { forwardRef, useState } from 'react';
import { GEOCODING_API_KEY as apiKey } from '../constants'
import './SearchBox.css'

const SearchBox = forwardRef(
function SearchBox(props, ref) {
  const { onSubmit } = props;

  const [userInput, setUserInput] = useState('');
  const [locSearchResults, setLocSearchResults] = useState([]);

  const updateListOfLocations = async (input) => {
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
      setLocSearchResults(listOfLocations);
    } 
    catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);
    if (inputValue) {
      updateListOfLocations(inputValue);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedIndex = e.target.elements['location'].value;
    const coordinates = {
      lon: locSearchResults[selectedIndex].lon,
      lat: locSearchResults[selectedIndex].lat,
      city: locSearchResults[selectedIndex].name,
      country: locSearchResults[selectedIndex].country, 
    }
    onSubmit(coordinates);
  }

  return (
    <div className='searchBox' ref={ref}>
      <input id='searchInput' autoFocus placeholder='Enter a city name' onChange={handleInputChange}/>
      <form onSubmit={handleSubmit}>
        <div id='searchResultsContainer'>
          {
            // Renders an empty string if the input field is empty
            userInput 
              ? <>
                  {
                  /* Checks if the data have loaded. 
                  If they have, renders a list of locations
                  If not, renders 'Loading...' */
                  (locSearchResults.length > 0 && locSearchResults[0].name) 
                    ? locSearchResults.map((result, index) => {
                        return (
                        <div key={index}>
                          <input type='radio' id={index} value={index} name='location'/>
                          <label htmlFor={index} className='searchResult'>{result.name}{result.state ? ', ' + result.state : ''}{', ' + result.country}</label>
                        </div>
                        );
                      }) 
                    : 'Loading...'
                  }
                </> 
              : ''
            }
        </div>
        <button id='confirmButton' type='submit'>Confirm</button>
      </form>
    </div>
  );
}
);

export {SearchBox}