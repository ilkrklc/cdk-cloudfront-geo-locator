import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CloudfrontGeoLocator } from '../../lib/index';

export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const geoLocator = new CloudfrontGeoLocator(this, 'GeoLocator');

    new cdk.CfnOutput(this, 'S3BucketArn', {
      value: geoLocator.s3BucketArn,
    });
    new cdk.CfnOutput(this, 'LambdaFunctionArn', {
      value: geoLocator.lambdaFunctionArn,
    });
    new cdk.CfnOutput(this, 'LambdaFunctionVersion', {
      value: geoLocator.lambdaFunctionVersion.version,
    });
    new cdk.CfnOutput(this, 'DistributionId', {
      value: geoLocator.distributionId,
    });
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: geoLocator.distributionDomainName,
    });
    new cdk.CfnOutput(this, 'CloudfrontCachePolicyId', {
      value: geoLocator.cloudfrontCachePolicyId,
    });
    new cdk.CfnOutput(this, 'CloudfrontOriginRequestPolicyId', {
      value: geoLocator.cloudfrontOriginRequestPolicyId,
    });
  }
}
