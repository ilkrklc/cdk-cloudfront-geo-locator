# CloudfrontGeoLocator ![GitHub](https://img.shields.io/github/license/ilkrklc/cdk-cloudfront-geo-locator) ![npm version](https://img.shields.io/npm/v/cdk-cloudfront-geo-locator) [![Maven Central](https://maven-badges.herokuapp.com/maven-central/io.github.ilkrklc/cdk.cloudfront.geo.locator/badge.svg)](https://maven-badges.herokuapp.com/maven-central/io.github.ilkrklc/cdk.cloudfront.geo.locator) [![NuGet latest version](https://badgen.net/nuget/v/CDK.CloudFront.Geo.Locator/latest)](https://nuget.org/packages/CDK.CloudFront.Geo.Locator) [![Go Reference](https://pkg.go.dev/badge/github.com/ilkrklc/cdk-cloudfront-geo-locator/cdkcloudfrontgeolocator.svg)](https://pkg.go.dev/github.com/ilkrklc/cdk-cloudfront-geo-locator/cdkcloudfrontgeolocator)

The `CloudfrontGeoLocator` is an AWS CDK construct that automates the setup of a CloudFront distribution with an Origin Request Lambda function, enabling applications to determine the geolocation of their users based on incoming HTTP requests. It's an ideal solution for developers looking to enhance their cloud applications with geolocation awareness without delving into the complexities of AWS configurations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Geolocation Endpoint Response](#geolocation-endpoint-response)
- [Contributing](#contributing)
- [Pull Request Guidelines](#pull-request-guidelines)
- [License](#license)

## Installation

To install `CloudfrontGeoLocator` construct library using npm, run the following command:

```bash
npm i cdk-cloudfront-geo-locator
```

## Usage

To initialize the `CloudfrontGeoLocator` construct you can use the following code:

```typescript
import cdk = require('aws-cdk-lib');
import { Construct } from 'constructs';
import { CloudfrontGeoLocator } from 'cdk-cloudfront-geo-locator';

// stack initialization with default props
const geoLocator = new CloudfrontGeoLocator(this, 'GeoLocator');

// stack initialization with custom props
const geoLocatorWithProps = new CloudfrontGeoLocator(
  this,
  'GeoLocatorWithProps',
  {
    s3BucketName: 'cloudfront-origin-bucket-name', // optional
    lambdaFunctionName: 'cloudfront-origin-request-edge-lambda-function-name', // optional
    cloudfrontCachePolicyName: 'cloudfront-cache-policy-name', // optional
    cloudfrontOriginRequestPolicyName: 'cloudfront-origin-request-policy-name', // optional
    cloudfrontPriceClass: cloudfront.PriceClass.PRICE_CLASS_100, // optional
  }
);

// stack initialization with custom domain
const customDomainGeoLocator = new CloudfrontGeoLocator(
  this,
  'CustomDomainGeoLocator',
  {
    customDomain: {
      domainName: 'example.com',
      certificateArn:
        'arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012',
    },
  }
);

// exported properties
console.log(geoLocator.s3BucketArn); // The ARN of the S3 bucket.
console.log(geoLocator.lambdaFunctionArn); // The ARN of the Lambda function.
console.log(geoLocator.lambdaFunctionVersion); // The current version of the Lambda function.
console.log(geoLocator.distributionId); // The ID of the CloudFront distribution.
console.log(geoLocator.distributionDomainName); // The domain name of the CloudFront distribution.
console.log(geoLocator.cloudfrontCachePolicyId); // The ID of the CloudFront cache policy.
console.log(geoLocator.cloudfrontOriginRequestPolicyId); // The ID of the CloudFront origin request policy.
```

## Documentation

To initialize the `CloudfrontGeoLocator` construct you can use the following props:

```typescript
/**
 * Properties for the CloudfrontGeoLocator construct.
 */
export interface CloudfrontGeoLocatorProps extends ResourceProps {
  /**
   * A unique name to identify the s3 bucket.
   *
   * @default - cloudfront-geo-locator-origin
   */
  readonly s3BucketName?: string;

  /**
   * A unique name to identify the lambda function.
   *
   * @default - cloudfront-geo-locator
   */
  readonly lambdaFunctionName?: string;

  /**
   * A unique name to identify the cloudfront cache policy.
   *
   * @default - CloudfrontGeoLocatorCachePolicy
   */
  readonly cloudfrontCachePolicyName?: string;

  /**
   * A unique name to identify the cloudfront origin request policy.
   *
   * @default - CloudfrontGeoLocatorOriginRequestPolicy
   */
  readonly cloudfrontOriginRequestPolicyName?: string;

  /**
   * The price class for the CloudFront distribution.
   *
   * @default - PRICE_CLASS_100
   */
  readonly cloudfrontPriceClass?: cloudfront.PriceClass;

  /**
   * The domain name and certificate arn configuration for the CloudFront distribution.
   *
   * @default - undefined
   */
  readonly customDomain?: {
    /**
     * The domain name for the CloudFront distribution.
     */
    readonly domainName: string;

    /**
     * The ARN of the certificate.
     */
    readonly certificateArn: string;
  };
}
```

## Geolocation Endpoint Response

The geolocation endpoint returns a JSON object with the following properties:

```json
{
  "country": "TR",
  "countryName": "Türkiye",
  "countryRegion": "35",
  "countryRegionName": "Izmir",
  "city": "Izmir"
}
```

## Contributing

We welcome contributions! Please review [code of conduct](.github/CODE_OF_CONDUCT.md) and [contributing guide](.github/CONTRIBUTING.md) so that you can understand what actions will and will not be tolerated.

### Pull Request Guidelines

- The `main` branch is just a snapshot of the latest stable release. All development should be done in development branches. **Do not submit PRs against the `main` branch.**
- Work in the `src` folder and **DO NOT** checkin `dist` in the commits.
- It's OK to have multiple small commits as you work on the PR
- If adding a new feature add accompanying test case.
- If fixing bug,
  - Add accompanying test case if applicable.
  - Provide a detailed description of the bug in the PR.
  - If you are resolving an opened issue add issue number in your PR title.

## License

`CloudfrontGeoLocator` is [MIT licensed](./LICENSE).
