import { Duration, ResourceProps } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';

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

export class CloudfrontGeoLocator extends Construct {
  /**
   * The ARN of the S3 bucket.
   */
  public readonly s3BucketArn: string = '';

  /**
   * The ARN of the Lambda function.
   */
  public readonly lambdaFunctionArn: string = '';

  /**
   * The current version of the Lambda function.
   */
  public readonly lambdaFunctionVersion: lambda.Version;

  /**
   * The ID of the CloudFront distribution.
   */
  public readonly distributionId: string = '';

  /**
   * The domain name of the CloudFront distribution.
   */
  public readonly distributionDomainName: string = '';

  /**
   * The ID of the CloudFront cache policy.
   */
  public readonly cloudfrontCachePolicyId: string = '';

  /**
   * The ID of the CloudFront origin request policy.
   */
  public readonly cloudfrontOriginRequestPolicyId: string = '';

  constructor(scope: Construct, id: string, props?: CloudfrontGeoLocatorProps) {
    super(scope, id);

    props = props || ({} as CloudfrontGeoLocatorProps);

    const bucket = this._createBucket(props);
    const originAccessIdentity = this._createOriginAccessIdentity();
    this._modifyImagesBucketPolicy(bucket, originAccessIdentity);

    const lambdaFunction = this._createFunction(props);

    const cachePolicy = this._createDistributionCachePolicy(props);
    const originRequestPolicy =
      this._createDistributionOriginRequestPolicy(props);
    const distribution = this._createDistribution({
      props,
      bucket,
      lambdaFunctionVersion: lambdaFunction.currentVersion,
      cachePolicy,
      originRequestPolicy,
      originAccessIdentity,
    });

    this.s3BucketArn = bucket.bucketArn;
    this.lambdaFunctionArn = lambdaFunction.functionArn;
    this.lambdaFunctionVersion = lambdaFunction.currentVersion;
    this.distributionId = distribution.distributionId;
    this.distributionDomainName = distribution.distributionDomainName;
    this.cloudfrontCachePolicyId = cachePolicy.cachePolicyId;
    this.cloudfrontOriginRequestPolicyId =
      originRequestPolicy.originRequestPolicyId;
  }

  private _createBucket(props: CloudfrontGeoLocatorProps): s3.Bucket {
    return new s3.Bucket(this, 'CloudfrontGeoLocatorS3Bucket', {
      bucketName: props.s3BucketName || 'cloudfront-geo-locator-origin',
      blockPublicAccess: {
        blockPublicAcls: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true,
      },
    });
  }

  private _createFunction(props: CloudfrontGeoLocatorProps): lambda.Function {
    return new lambda.Function(this, 'CloudfrontGeoLocatorLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      architecture: lambda.Architecture.X86_64,
      code: lambda.Code.fromAsset(join(__dirname, 'lambda.zip')),
      handler: 'index.handler',
      functionName: props.lambdaFunctionName || 'cloudfront-geo-locator',
    });
  }

  private _createDistributionCachePolicy(
    props: CloudfrontGeoLocatorProps
  ): cloudfront.CachePolicy {
    return new cloudfront.CachePolicy(this, 'CloudfrontGeoLocatorCachePolicy', {
      cachePolicyName:
        props.cloudfrontCachePolicyName || 'CloudfrontGeoLocatorCachePolicy',
      headerBehavior: cloudfront.CacheHeaderBehavior.allowList(
        'CloudFront-Viewer-Country',
        'CloudFront-Viewer-Country-Region',
        'CloudFront-Viewer-City'
      ),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
      enableAcceptEncodingBrotli: true,
      enableAcceptEncodingGzip: true,
    });
  }

  private _createDistributionOriginRequestPolicy(
    props: CloudfrontGeoLocatorProps
  ): cloudfront.OriginRequestPolicy {
    return new cloudfront.OriginRequestPolicy(
      this,
      'CloudfrontGeoLocatorOriginRequestPolicy',
      {
        originRequestPolicyName:
          props.cloudfrontOriginRequestPolicyName ||
          'CloudfrontGeoLocatorOriginRequestPolicy',
        headerBehavior: cloudfront.OriginRequestHeaderBehavior.allowList(
          'CloudFront-Viewer-Country',
          'CloudFront-Viewer-Country-Name',
          'CloudFront-Viewer-Country-Region',
          'CloudFront-Viewer-Country-Region-Name',
          'CloudFront-Viewer-City'
        ),
        cookieBehavior: cloudfront.OriginRequestCookieBehavior.none(),
        queryStringBehavior: cloudfront.OriginRequestQueryStringBehavior.none(),
      }
    );
  }

  private _createOriginAccessIdentity(): cloudfront.OriginAccessIdentity {
    return new cloudfront.OriginAccessIdentity(
      this,
      'CloudfrontGeoLocatorOriginAccessIdentity'
    );
  }

  private _createDistribution({
    props,
    bucket,
    lambdaFunctionVersion,
    cachePolicy,
    originRequestPolicy,
    originAccessIdentity,
  }: {
    readonly props: CloudfrontGeoLocatorProps;
    readonly bucket: s3.Bucket;
    readonly lambdaFunctionVersion: lambda.Version;
    readonly cachePolicy: cloudfront.CachePolicy;
    readonly originRequestPolicy: cloudfront.OriginRequestPolicy;
    readonly originAccessIdentity: cloudfront.OriginAccessIdentity;
  }): cloudfront.Distribution {
    return new cloudfront.Distribution(
      this,
      'CloudfrontGeoLocatorDistribution',
      {
        defaultBehavior: {
          origin: new cloudfrontOrigins.S3Origin(bucket, {
            originAccessIdentity,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          edgeLambdas: [
            {
              functionVersion: lambdaFunctionVersion,
              eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
            },
          ],
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachePolicy,
          originRequestPolicy,
          responseHeadersPolicy:
            cloudfront.ResponseHeadersPolicy
              .CORS_ALLOW_ALL_ORIGINS_WITH_PREFLIGHT,
        },
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        priceClass:
          props.cloudfrontPriceClass || cloudfront.PriceClass.PRICE_CLASS_100,
        errorResponses: [
          {
            ttl: Duration.seconds(10),
            httpStatus: 403,
            responseHttpStatus: 404,
            responsePagePath: '/404',
          },
        ],
        ...(props.customDomain && {
          domainNames: [props.customDomain.domainName],
          certificate: acm.Certificate.fromCertificateArn(
            this,
            'CloudfrontGeoLocatorCertificate',
            props.customDomain.certificateArn
          ),
        }),
      }
    );
  }

  private _modifyImagesBucketPolicy(
    bucket: s3.Bucket,
    identity: cloudfront.OriginAccessIdentity
  ): void {
    const policyStatement = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      effect: iam.Effect.ALLOW,
      principals: [
        new iam.CanonicalUserPrincipal(
          identity.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
    });

    if (bucket.policy) bucket.policy.document.addStatements(policyStatement);
    else
      new s3.BucketPolicy(this, 'CloudfrontGeoLocatorS3BucketPolicy', {
        bucket,
      }).document.addStatements(policyStatement);
  }
}
