const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'api-reat-lambda-fun',
  deps: [
    '@aws-cdk/aws-apigatewayv2-alpha@2.7.0-alpha.0',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha@2.7.0-alpha.0',
  ],
  gitignore: [
    'cdk.context.json', 'cdk.out', 'images',
  ],
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['neilkuan'],
  },
});
project.synth();