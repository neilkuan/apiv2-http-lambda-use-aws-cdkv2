import { App } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { MyStack } from '../src/main';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  const template = Template.fromStack(stack);
  template.findResources('AWS::Lambda::Function');
  template.findResources('AWS::ApiGatewayV2::Route');
  template.hasResourceProperties('AWS::ApiGatewayV2::Integration', Match.objectLike(
    {
      ApiId: {
        Ref: 'HttpApiF5A9A8A7',
      },
      IntegrationType: 'AWS_PROXY',
      IntegrationUri: {
        'Fn::GetAtt': [
          'MyLambdaCCE802FB',
          'Arn',
        ],
      },
      PayloadFormatVersion: '2.0',
    },
  ));
});