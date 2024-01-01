import type {
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
  Handler,
} from 'aws-lambda';

const notFoundResponse: CloudFrontRequestResult = {
  status: '404',
  statusDescription: 'Not Found',
  headers: {
    'content-type': [{ key: 'Content-Type', value: 'text/plain' }],
  },
  body: '404 Not Found',
};

export const handler: Handler<
  CloudFrontRequestEvent,
  CloudFrontRequestResult
> = async (event) => {
  if (!event.Records || event.Records.length === 0) return notFoundResponse;

  const eventRecord = event.Records[0] as CloudFrontRequestEvent['Records'][0];
  const { headers, uri } = eventRecord.cf.request;
  if (uri !== '/') return notFoundResponse;

  return {
    status: '200',
    statusDescription: 'OK',
    headers: {
      'content-type': [{ key: 'Content-Type', value: 'application/json' }],
    },
    body: JSON.stringify({
      country: headers['cloudfront-viewer-country']
        ? headers['cloudfront-viewer-country'][0]?.value
        : null,
      countryName: headers['cloudfront-viewer-country-name']
        ? headers['cloudfront-viewer-country-name'][0]?.value
        : null,
      countryRegion: headers['cloudfront-viewer-country-region']
        ? headers['cloudfront-viewer-country-region'][0]?.value
        : null,
      countryRegionName: headers['cloudfront-viewer-country-region-name']
        ? headers['cloudfront-viewer-country-region-name'][0]?.value
        : null,
      city: headers['cloudfront-viewer-city']
        ? headers['cloudfront-viewer-city'][0]?.value
        : null,
    }),
  };
};
