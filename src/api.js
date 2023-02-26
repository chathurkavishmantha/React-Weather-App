const REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const REACT_APP_API_KEY = "b23d3d87b94aa4071299d29cf19b39d9";

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWeatherData = async (city, units = "metric") => {
  const URL = `${REACT_APP_API_URL}${city}&appid=${REACT_APP_API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };

  // console.log(data);
};

export { getWeatherData };
