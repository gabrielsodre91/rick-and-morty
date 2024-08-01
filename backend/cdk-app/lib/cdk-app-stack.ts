import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as path from 'path';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda for fetching data
    const fetchLambda = new lambda.Function(this, 'FetchLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'fetch.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../backend/lambdas')),
    });

    // Lambda for registering data
    const registerLambda = new lambda.Function(this, 'RegisterLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'register.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../backend/lambdas')),
    });

    // Lambda for updating data
    const updateLambda = new lambda.Function(this, 'UpdateLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'update.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../backend/lambdas')),
    });

    // API Gateway
    const api = new apigateway.RestApi(this, 'rickAndMortyApi', {
      restApiName: 'RickAndMortyService',
      description: 'This service serves Rick and Morty data.',
    });

    const fetchIntegration = new apigateway.LambdaIntegration(fetchLambda);
    const registerIntegration = new apigateway.LambdaIntegration(registerLambda);
    const updateIntegration = new apigateway.LambdaIntegration(updateLambda);

    api.root.addResource('fetch').addMethod('GET', fetchIntegration);
    api.root.addResource('register').addMethod('POST', registerIntegration);
    api.root.addResource('update').addMethod('PUT', updateIntegration);
  }
}
