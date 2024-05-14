import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Ziguinchor&appid=054424501187266f320cdf3e37aa43f2&units=metric"
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setIsReady(false);
      })
      .catch((error) => console.error("Error fetching weather data: ", error));
  };

  const temperature = weatherData ? weatherData.main.temp : null;
  const isHotTheme = temperature && temperature > 20;

  return (
    <div className="container mt-5">
      <div className="row">
        <div
          className={`col-md-6 ${
            isHotTheme ? "bg-danger" : "bg-primary"
          } text-white`}
        >
          <div className="card text-center">
            <div className="card-header">
              <h1 className="text-uppercase">My Weather App</h1>
              <h2 className="text-uppercase">City: Ziguinchor</h2>
            </div>
            <div className="card-body">
              {isReady ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <p className="card-text">
                    Temperature: {weatherData.main.temp} °C
                  </p>
                  <p className="card-text">
                    Main: {weatherData.weather[0].main}
                  </p>
                  <p className="card-text">
                    Description: {weatherData.weather[0].description}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                    className="weather-icon"
                  />
                  <p className="card-text">
                    Sunrise:{" "}
                    {new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString()}
                  </p>
                  <p className="card-text">
                    Sunset:{" "}
                    {new Date(
                      weatherData.sys.sunset * 1000
                    ).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`col-md-6 ${
            isHotTheme ? "bg-warning" : "bg-secondary"
          } text-white`}
        >
          <div className="card text-center">
            <div className="card-header">
              <h1 className="text-uppercase">Put Coordinates</h1>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Longitude"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Latitude"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
