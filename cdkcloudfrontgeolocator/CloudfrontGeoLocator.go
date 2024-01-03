package cdkcloudfrontgeolocator

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
	_init_ "github.com/ilkrklc/cdk-cloudfront-geo-locator/cdkcloudfrontgeolocator/jsii"

	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/ilkrklc/cdk-cloudfront-geo-locator/cdkcloudfrontgeolocator/internal"
)

type CloudfrontGeoLocator interface {
	constructs.Construct
	// The ID of the CloudFront cache policy.
	CloudfrontCachePolicyId() *string
	// The ID of the CloudFront origin request policy.
	CloudfrontOriginRequestPolicyId() *string
	// The domain name of the CloudFront distribution.
	DistributionDomainName() *string
	// The ID of the CloudFront distribution.
	DistributionId() *string
	// The ARN of the Lambda function.
	LambdaFunctionArn() *string
	// The current version of the Lambda function.
	LambdaFunctionVersion() awslambda.Version
	// The tree node.
	Node() constructs.Node
	// The ARN of the S3 bucket.
	S3BucketArn() *string
	// Returns a string representation of this construct.
	ToString() *string
}

// The jsii proxy struct for CloudfrontGeoLocator
type jsiiProxy_CloudfrontGeoLocator struct {
	internal.Type__constructsConstruct
}

func (j *jsiiProxy_CloudfrontGeoLocator) CloudfrontCachePolicyId() *string {
	var returns *string
	_jsii_.Get(
		j,
		"cloudfrontCachePolicyId",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_CloudfrontGeoLocator) CloudfrontOriginRequestPolicyId() *string {
	var returns *string
	_jsii_.Get(
		j,
		"cloudfrontOriginRequestPolicyId",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_CloudfrontGeoLocator) DistributionDomainName() *string {
	var returns *string
	_jsii_.Get(
		j,
		"distributionDomainName",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_CloudfrontGeoLocator) DistributionId() *string {
	var returns *string
	_jsii_.Get(
		j,
		"distributionId",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_CloudfrontGeoLocator) LambdaFunctionArn() *string {
	var returns *string
	_jsii_.Get(
		j,
		"lambdaFunctionArn",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_CloudfrontGeoLocator) LambdaFunctionVersion() awslambda.Version {
	var returns awslambda.Version
	_jsii_.Get(
		j,
		"lambdaFunctionVersion",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_CloudfrontGeoLocator) Node() constructs.Node {
	var returns constructs.Node
	_jsii_.Get(
		j,
		"node",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_CloudfrontGeoLocator) S3BucketArn() *string {
	var returns *string
	_jsii_.Get(
		j,
		"s3BucketArn",
		&returns,
	)
	return returns
}


func NewCloudfrontGeoLocator(scope constructs.Construct, id *string, props *CloudfrontGeoLocatorProps) CloudfrontGeoLocator {
	_init_.Initialize()

	if err := validateNewCloudfrontGeoLocatorParameters(scope, id, props); err != nil {
		panic(err)
	}
	j := jsiiProxy_CloudfrontGeoLocator{}

	_jsii_.Create(
		"cdk-cloudfront-geo-locator.CloudfrontGeoLocator",
		[]interface{}{scope, id, props},
		&j,
	)

	return &j
}

func NewCloudfrontGeoLocator_Override(c CloudfrontGeoLocator, scope constructs.Construct, id *string, props *CloudfrontGeoLocatorProps) {
	_init_.Initialize()

	_jsii_.Create(
		"cdk-cloudfront-geo-locator.CloudfrontGeoLocator",
		[]interface{}{scope, id, props},
		c,
	)
}

// Checks if `x` is a construct.
//
// Returns: true if `x` is an object created from a class which extends `Construct`.
// Deprecated: use `x instanceof Construct` instead.
func CloudfrontGeoLocator_IsConstruct(x interface{}) *bool {
	_init_.Initialize()

	if err := validateCloudfrontGeoLocator_IsConstructParameters(x); err != nil {
		panic(err)
	}
	var returns *bool

	_jsii_.StaticInvoke(
		"cdk-cloudfront-geo-locator.CloudfrontGeoLocator",
		"isConstruct",
		[]interface{}{x},
		&returns,
	)

	return returns
}

func (c *jsiiProxy_CloudfrontGeoLocator) ToString() *string {
	var returns *string

	_jsii_.Invoke(
		c,
		"toString",
		nil, // no parameters
		&returns,
	)

	return returns
}

