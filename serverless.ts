import type { AWS } from '@serverless/typescript';

import wheather from '@functions/wheather';

const serverlessConfiguration: AWS = {
  service: 'weather-service',
  frameworkVersion: '3',
  // added serveless offline plugin
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    //changed the nodejs version to 18
    runtime: 'nodejs18.x',
    //added the profile name
    profile: 'sls',
    //add stage, stack name, api name and region
    stage: "dev",
    stackName: "${self:service}-stack-${self:provider.stage}",
    apiName: "${self:service}-${self:provider.stage}",
    region: "eu-north-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { wheather },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
