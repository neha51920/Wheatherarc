import { useState, useEffect } from 'react';
import './App.css';
import { faTemperatureLow,faTemperatureHigh,faTachometerAlt,faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Gujarat');
  const [state, setState] = useState('Gujarat');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div class="col-auto">
            <label for="location-name" style={{color:"#4d4a4a",fontWeight:500}} class="col-form-label">
              Enter Location :
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto" style={{ width: '40vw' ,opacity:0.8,backgroundColor:"#d9effd"}}>
          {apiData.main ? (
            <div class="card-body text-center" style={{}}>
              <img style={{height:80,width:80}}
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />
                  <p>
                    {' '}
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
              <p className="h2">
                {kelvinToFarenheit(apiData.main.temp)}&deg; C
              </p>
            <div class="row" style={{paddingLeft:200}}>
              <p className="h5">
                <strong>{apiData.name},</strong>
              </p>
              <p className="h5">
                <strong>
                  {' '}
                  {countries.getName(apiData.sys.country, 'en', {
                    select: 'official',
                  })}
                </strong>
              </p>
            </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                  <FontAwesomeIcon icon={faTemperatureLow} />{' '}
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                    </strong>
                  </p>
                  <p>
                  <FontAwesomeIcon icon={faTemperatureHigh} />{' '}
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                    </strong>
                  </p>
                  </div>
                  <div className="col-md-6">
                  <p>
                  <FontAwesomeIcon icon={faTachometerAlt} />{' '}
                    <strong>
                      {apiData.main.pressure} mb
                    </strong>
                  </p>
                  <p>
                  <FontAwesomeIcon icon={faWind} />{' '}
                    <strong>
                      {apiData.wind.speed} km/h 
                    </strong>
                  </p>
                </div>
                
              </div>
            </div>
          ) : (
            <h1 style={{color:"red"}}>Enter a valid city</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;