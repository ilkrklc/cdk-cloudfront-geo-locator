// An AWS CDK construct to create a CloudFront-powered HTTP endpoint delivering requestor's geolocation details.
package cdkcloudfrontgeolocator

import (
	"reflect"

	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
)

func init() {
	_jsii_.RegisterClass(
		"cdk-cloudfront-geo-locator.CloudfrontGeoLocator",
		reflect.TypeOf((*CloudfrontGeoLocator)(nil)).Elem(),
		[]_jsii_.Member{
			_jsii_.MemberProperty{JsiiProperty: "cloudfrontCachePolicyId", GoGetter: "CloudfrontCachePolicyId"},
			_jsii_.MemberProperty{JsiiProperty: "cloudfrontOriginRequestPolicyId", GoGetter: "CloudfrontOriginRequestPolicyId"},
			_jsii_.MemberProperty{JsiiProperty: "distributionDomainName", GoGetter: "DistributionDomainName"},
			_jsii_.MemberProperty{JsiiProperty: "distributionId", GoGetter: "DistributionId"},
			_jsii_.MemberProperty{JsiiProperty: "lambdaFunctionArn", GoGetter: "LambdaFunctionArn"},
			_jsii_.MemberProperty{JsiiProperty: "lambdaFunctionVersion", GoGetter: "LambdaFunctionVersion"},
			_jsii_.MemberProperty{JsiiProperty: "node", GoGetter: "Node"},
			_jsii_.MemberProperty{JsiiProperty: "s3BucketArn", GoGetter: "S3BucketArn"},
			_jsii_.MemberMethod{JsiiMethod: "toString", GoMethod: "ToString"},
		},
		func() interface{} {
			j := jsiiProxy_CloudfrontGeoLocator{}
			_jsii_.InitJsiiProxy(&j.Type__constructsConstruct)
			return &j
		},
	)
	_jsii_.RegisterStruct(
		"cdk-cloudfront-geo-locator.CloudfrontGeoLocatorProps",
		reflect.TypeOf((*CloudfrontGeoLocatorProps)(nil)).Elem(),
	)
}
