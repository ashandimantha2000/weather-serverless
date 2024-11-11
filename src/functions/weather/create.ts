import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { successResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Weather } from 'src/entities/employee.entity';
import { create } from 'src/functions/weather/weather-service';

import schema from "./schema";

const createWeather: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
    const weather: Weather = event.body as any as Weather;
    const weath = await create(weather);
  return successResponse({weather});
};

export const main = middyfy(createWeather);
