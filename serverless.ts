import type { AWS } from "@serverless/typescript";

// import weather from '@functions/weather';
import functions from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "weather-service",
  frameworkVersion: "3",
  // added serveless offline plugin
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    //changed the nodejs version to 18
    runtime: "nodejs18.x",
    //added the profile name
    profile: "sls",
    //add stage, stack name, api name, region and endpoint type
    stage: "dev",
    stackName: "${self:service}-stack-${self:provider.stage}",
    apiName: "${self:service}-${self:provider.stage}",
    region: "eu-north-1",
    timeout: 30,
    endpointType: "regional",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      //Add API keys
      apiKeys: ["${self.provider.apiName}-${sls:stage}=apikey"],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      //add the database environment variables
      DB_HOSTNAME : "weather-service.cluster-chc6egeeywj0.eu-north-1.rds.amazonaws.com",
      DB_PORT : "5432",
      DB_NAME : "weather-db",
      DB_USERNAME : "postgres",
      DB_PASSWORD : "ashan6315",
      DB_SCHEMA : "public",
    },
  },
  // import the function via paths
  functions: functions,
  // functions:  weather ,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  //added a resouce section
  resources:{}
};

module.exports = serverlessConfiguration;
