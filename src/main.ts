import * as aw2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);
    const lambda = new cdk.aws_lambda.Function(this, 'MyLambda', {
      code: new cdk.aws_lambda.InlineCode(`
def handler(event, context):
    return 'Hello, World!'`),
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_9,
      handler: 'index.handler',
    });

    const helloApi = new aw2.HttpApi(this, 'HttpApi', {
      apiName: 'HelloApi',
    });
    helloApi.addRoutes({
      path: '/',
      methods: [aw2.HttpMethod.GET],
      integration: new HttpLambdaIntegration('HttpApiIg', lambda),
    });
    new cdk.CfnOutput(this, 'HttpApiUrl', {
      value: `${helloApi.url}`,
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new MyStack(app, 'api-rest-lambda-fun', { env: devEnv });

app.synth();