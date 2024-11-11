import axios from "axios";
import { Weather } from 'src/entities/weather.entity';
import { getDatabaseConnection } from 'src/libs/database-manager';

const API_KEY = "b3e3becbf51315a13dfda8cdf307641b";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

interface WeatherResponse {
  main: { temp: number; humidity: number };
  // weather: { description: string }[];
}

interface WeatherError {
  message: string;
}

// create a new weather record in the database
const createWeather = async (weather: Weather): Promise<Weather> => {
  try {
    const connection = await getDatabaseConnection();
    const weatherRepository = connection.getRepository(Weather);
    return await weatherRepository.save(weather);
  } catch (error) {
    console.error("Failed to create weather data", error);
    throw new Error("Error saving weather data to database.");
  }
}

//fetch existing weather data from the database by city
const fetchWeatherByCity = async (city: string): Promise<Weather | null> => {
  try {
    const connection = await getDatabaseConnection();
    const weatherRepository = connection.getRepository(Weather);
    console.log('weather is fetched from the database');
    return await weatherRepository.findOneBy({ city });
  } catch (error) {
    console.error("Failed to fetch weather data", error);
    throw new Error("Error retrieving weather data from database.");
  }
}

//checks the city in the database or fetch from the api (open weather)
export const main = async (event: any) => {
  const cityName = event.queryStringParameters?.city;
  if (!cityName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "City name is required" }),
    };
  }

  try {
    let weather = await fetchWeatherByCity(cityName);

    if (!weather) {
      const response = await axios.get<WeatherResponse>(
        `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const { temp, humidity } = response.data.main;
      // const description = response.data.weather[0].description;

      // Store the new data in the database
      const newWeather = new Weather();
      console.log("newWeather", 'is stored in the database');
      newWeather.city = cityName;
      newWeather.temperature = temp;
      newWeather.humidity = humidity;
      // newWeather.description = description;

      weather = await createWeather(newWeather);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        city: weather.city,
        temperature: weather.temperature,
        humidity: weather.humidity,
        // description: weather.description,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
