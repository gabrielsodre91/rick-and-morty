import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as path from 'path';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Characters', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'Characters',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const getLambda = new lambda.Function(this, 'GetLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'get.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const populateLambda = new lambda.Function(this, 'PopulateLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'populate.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const fetchLambda = new lambda.Function(this, 'FetchLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'fetch.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const registerLambda = new lambda.Function(this, 'RegisterLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'register.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const updateLambda = new lambda.Function(this, 'UpdateLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'update.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas')),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantReadWriteData(fetchLambda);
    table.grantReadWriteData(registerLambda);
    table.grantReadWriteData(updateLambda);
    table.grantReadWriteData(getLambda);
    table.grantReadWriteData(populateLambda);

    const api = new apigateway.RestApi(this, 'rickAndMortyApi', {
      restApiName: 'RickAndMortyService',
      description: 'This service serves Rick and Morty data.',
    });

    const fetchIntegration = new apigateway.LambdaIntegration(fetchLambda);
    const registerIntegration = new apigateway.LambdaIntegration(registerLambda);
    const updateIntegration = new apigateway.LambdaIntegration(updateLambda);
    const getIntegration = new apigateway.LambdaIntegration(getLambda);
    const populateIntegration = new apigateway.LambdaIntegration(populateLambda);

    api.root.addResource('get').addMethod('GET', getIntegration);
    api.root.addResource('fetch').addMethod('GET', fetchIntegration);
    api.root.addResource('register').addMethod('POST', registerIntegration);
    api.root.addResource('update').addMethod('PUT', updateIntegration);
    api.root.addResource('populate').addMethod('POST', populateIntegration);
  }
}
