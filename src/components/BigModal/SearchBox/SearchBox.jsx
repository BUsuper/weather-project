import { useRef, useState, useCallback, useEffect } from "react";
import { debounce } from "../../../utils";
import "./SearchBox.css";

export function SearchBox({ onSubmit }) {
  const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;
  const DEBOUNCE_DELAY = 1500;

  const [userInput, setUserInput] = useState("");
  const [locSearchResults, setLocSearchResults] = useState([]);

  let currentControllerRef = useRef();

  const updateListOfLocations = useCallback(
    async (input) => {
      const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`;

      if (currentControllerRef.current) currentControllerRef.current.abort();
      currentControllerRef.current = new AbortController();

      try {
        const gRes = await fetch(geocodingURL, {
          signal: currentControllerRef.current.signal,
        });
        const geocodingResult = await gRes.json();
        const listOfLocations = geocodingResult.map((r) => {
          return {
            name: r.name,
            state: r.state,
            country: r.country,
            lat: r.lat,
            lon: r.lon,
          };
        });
        setLocSearchResults(listOfLocations);
      } catch (err) {
        console.log(err);
      }
    },
    [apiKey, setLocSearchResults]
  );

  const debouncedRef = useRef(debounce(updateListOfLocations, DEBOUNCE_DELAY));
  useEffect(() => {
    debouncedRef.current = debounce(updateListOfLocations, DEBOUNCE_DELAY);
    return () => debouncedRef.current.cancel?.();
  }, [updateListOfLocations]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);
    if (inputValue) {
      debouncedRef.current(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedIndex = e.target.elements["location"].value;
    const coordinates = {
      lon: locSearchResults[selectedIndex].lon,
      lat: locSearchResults[selectedIndex].lat,
      city: locSearchResults[selectedIndex].name,
      country: locSearchResults[selectedIndex].country,
    };
    onSubmit(coordinates);
  };

  return (
    <div className="searchBox">
      <input
        id="searchInput"
        autoFocus
        placeholder="Enter a city name"
        onChange={handleInputChange}
      />
      <form onSubmit={handleSubmit}>
        <div id="searchResultsContainer">
          {
            // Renders an empty string if the input field is empty
            userInput ? (
              <>
                {
                  /* Checks if the data have loaded. 
                  If they have, renders a list of locations
                  If not, renders 'Loading...' */
                  locSearchResults.length > 0 && locSearchResults[0].name
                    ? locSearchResults.map((result, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="radio"
                              id={index}
                              value={index}
                              name="location"
                            />
                            <label htmlFor={index} className="searchResult">
                              {result.name}
                              {result.state ? ", " + result.state : ""}
                              {", " + result.country}
                            </label>
                          </div>
                        );
                      })
                    : "Loading..."
                }
              </>
            ) : (
              ""
            )
          }
        </div>
        <button id="confirmButton" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}
