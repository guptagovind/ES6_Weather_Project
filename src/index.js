import "./styles.css";
import * as ELEMENTS from "./elements";
import { Http } from "./http";
import { WeatherData, WEATHER_PROXY_HANDLER } from "./weather-data";
import { APP_ID } from "./config";


ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener("click", searchWeather);

function searchWeather() {
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = "none";
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = "block";
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if (CITY_NAME.length === 0) {
    alert("please enter city");
  }

  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${APP_ID}`;
  Http.fetchData(URL)
    .then(responseData => {
      const WEATHER_DATA = new WeatherData(
        CITY_NAME,
        responseData.weather[0].description.toUpperCase()
      );
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temperature = responseData.main.temp;
      updateWeather(WEATHER_PROXY);
    })
    .catch(error => {
      console.log(error);
    });
}

const updateWeather = weatherData => {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = "block";
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = "none";
};
