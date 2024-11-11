import { Weather } from 'src/entities/employee.entity';
import { getDatabaseConnection } from 'src/libs/database-manager';

//create
const create = async (weather: Weather): Promise<Weather> => {
    try {
        const connection = await getDatabaseConnection();
        if (!connection) {
            throw new Error("Database connection is not available");
        }
        const weatherRepository = connection.getRepository(Weather);
        const newWeather: Weather = await weatherRepository.save(weather);
        return newWeather;
    } catch (e) {
        console.log("Failed to create weather data", e);
        throw new Error(e);
    }
}

//fetch
const fetch = async (weatherId: string): Promise<Weather> => {
    try {
        const connection = await getDatabaseConnection();
        if (!connection) {
            throw new Error("Database connection is not available");
        }
        const weatherRepository = connection.getRepository(Weather);
        const newWeather: Weather = await weatherRepository.findOneBy({id:weatherId});
        return newWeather;
    } catch (e) {
        console.log("Failed to fetch weather data", e);
        throw new Error(e);
    }
}

//fetch all
const fetchAll = async (): Promise<Weather[]> => {
    try {
        const connection = await getDatabaseConnection();
        if (!connection) {
            throw new Error("Database connection is not available");
        }
        const weatherRepository = connection.getRepository(Weather);
        const weather: Weather[] = await weatherRepository.find();
        return weather;
    } catch (e) {
        console.log("Failed to fetch weather data", e);
        throw new Error(e);
    }
}

export { create, fetch, fetchAll };