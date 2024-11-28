import { successResponse } from "@libs/api-gateway";
import { Weather } from "src/entities/weather.entity";
import { fetchAll } from "src/functions/weather/weather-service";

const fetchAllWeather = async (event) => {
    const weather:Weather[] = await fetchAll();
    return successResponse({weather});
};


export const main = fetchAllWeather;