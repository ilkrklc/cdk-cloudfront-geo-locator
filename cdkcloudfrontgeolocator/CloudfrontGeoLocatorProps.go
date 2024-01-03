package cdkcloudfrontgeolocator

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awscloudfront"
)

// Properties for the CloudfrontGeoLocator construct.
type CloudfrontGeoLocatorProps struct {
	// The AWS account ID this resource belongs to.
	// Default: - the resource is in the same account as the stack it belongs to.
	//
	Account *string `field:"optional" json:"account" yaml:"account"`
	// ARN to deduce region and account from.
	//
	// The ARN is parsed and the account and region are taken from the ARN.
	// This should be used for imported resources.
	//
	// Cannot be supplied together with either `account` or `region`.
	// Default: - take environment from `account`, `region` parameters, or use Stack environment.
	//
	EnvironmentFromArn *string `field:"optional" json:"environmentFromArn" yaml:"environmentFromArn"`
	// The value passed in by users to the physical name prop of the resource.
	//
	// - `undefined` implies that a physical name will be allocated by
	//   CloudFormation during deployment.
	// - a concrete value implies a specific physical name
	// - `PhysicalName.GENERATE_IF_NEEDED` is a marker that indicates that a physical will only be generated
	//   by the CDK if it is needed for cross-environment references. Otherwise, it will be allocated by CloudFormation.
	// Default: - The physical name will be allocated by CloudFormation at deployment time.
	//
	PhysicalName *string `field:"optional" json:"physicalName" yaml:"physicalName"`
	// The AWS region this resource belongs to.
	// Default: - the resource is in the same region as the stack it belongs to.
	//
	Region *string `field:"optional" json:"region" yaml:"region"`
	// A unique name to identify the cloudfront cache policy.
	// Default: - CloudfrontGeoLocatorCachePolicy.
	//
	CloudfrontCachePolicyName *string `field:"optional" json:"cloudfrontCachePolicyName" yaml:"cloudfrontCachePolicyName"`
	// A unique name to identify the cloudfront origin request policy.
	// Default: - CloudfrontGeoLocatorOriginRequestPolicy.
	//
	CloudfrontOriginRequestPolicyName *string `field:"optional" json:"cloudfrontOriginRequestPolicyName" yaml:"cloudfrontOriginRequestPolicyName"`
	// The price class for the CloudFront distribution.
	// Default: - PRICE_CLASS_100.
	//
	CloudfrontPriceClass awscloudfront.PriceClass `field:"optional" json:"cloudfrontPriceClass" yaml:"cloudfrontPriceClass"`
	// The ARN of the certificate.
	// Default: - undefined.
	//
	CustomDomainCertificateArn *string `field:"optional" json:"customDomainCertificateArn" yaml:"customDomainCertificateArn"`
	// The domain name for the CloudFront distribution.
	// Default: - undefined.
	//
	CustomDomainName *string `field:"optional" json:"customDomainName" yaml:"customDomainName"`
	// A unique name to identify the lambda function.
	// Default: - cloudfront-geo-locator.
	//
	LambdaFunctionName *string `field:"optional" json:"lambdaFunctionName" yaml:"lambdaFunctionName"`
	// A unique name to identify the s3 bucket.
	// Default: - cloudfront-geo-locator-origin.
	//
	S3BucketName *string `field:"optional" json:"s3BucketName" yaml:"s3BucketName"`
}

