import { successResponse } from "@libs/api-gateway";
import { Weather } from "src/entities/weather.entity";
import { fetch } from "src/functions/weather/weather-service";

const fetchWeather = async (event) => {
    const weather:Weather = await fetch(event.path.weatherId);
    return successResponse({weather});
};


export const main = fetchWeather;