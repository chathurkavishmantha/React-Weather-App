// import axios from "axios";
import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../api";

const Search = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [units] = useState("metric");
  const [city, setCity] = useState("colombo");
  const [selectedData, setSelectedData] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      // console.log(data);
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [city]);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      // console.log(e.currentTarget.value);

      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const selectedDataInput = async (e) =>{
    // console.log(e.target.value);
    const value = await e.target.value;
    // console.log(data);
    setSelectedData(value);
  }

  const submitData = (e) => {
    e.preventDefault();
    // console.log(selectedData);
    setCity(selectedData);
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
            <form action="" onSubmit={submitData}>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  onKeyDown={enterKeyPressed}
                  onChange={selectedDataInput}
                />
                <button type="submit">
                  Find
                </button>
                </form>
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
