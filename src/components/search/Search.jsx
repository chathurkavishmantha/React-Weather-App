// import axios from "axios";
import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../api";

const Search = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setunit] = useState("metric");
  const [city, setCity] = useState("colombo");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      console.log(data);
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [units, city]);

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) {
      // key code for enter key
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/522148349/photo/colombo-skyline.jpg?s=612x612&w=0&k=20&c=yZptq7SuDj_nOxkVd4i7ieaJvSwPgrDHsFu6ph6Z1_8=)",
      }}
    >
      <div className="overlay">
        {weatherData && (
          <div className="containers">
            <div className="section section-input">
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                onKeyDown={enterKeyPress}
              />
              <button>Find</button>
            </div>

            <div className="section section-temperature">
              <div className="icon">
                <h3>
                  {weatherData.name}, {weatherData.country}
                </h3>
                <img src={weatherData.iconURL} alt="" />
                <h4>{weatherData.description}</h4>
              </div>

              <div className="temperature">
                <h3>
                  {weatherData.temp.toFixed()}°{units === "metric" ? "C" : "F"}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
