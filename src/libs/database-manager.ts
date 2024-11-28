import { Weather } from "src/entities/weather.entity";
import { DataSource, EntityManager } from "typeorm";

let dataSource: DataSource;

const getDatabaseConnection = async (): Promise<EntityManager> => {
  if (dataSource && dataSource.isInitialized) {
    console.log("Connection Already Available, Reusing existing connection");
    return dataSource.manager;
  } else {
    console.log("Connection not available, creating new connection");
    dataSource = new DataSource({
      applicationName: 'weather-service',
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      schema: process.env.DB_SCHEMA,
      connectTimeoutMS: 3000,
      synchronize: true,
      logging: false,
      useUTC: true,
      entities: [Weather],
    });

    // Initialize the data source
    await dataSource.initialize();
  }

  return dataSource.manager;
};

export { getDatabaseConnection };
