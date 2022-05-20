import SentryUtil from '@/helpers/sentryUtil';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Primitive } from '@sentry/types/types/misc';

interface IError {
  err: AxiosError | Error | unknown;
  name: string;
  ctx: string;
  description?: string;
}

interface IErrorDetails {
  code?: string;
  phrase?: string;
  description?: string;
  spec_title?: string;
  spec_href?: string;
}

const errorCodes: Record<number, IErrorDetails> = {
  400: {
    code: '400',
    phrase: 'Bad Request',
    description:
      'indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.',
    spec_title: 'RFC7231#6.5.1',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
  },
  401: {
    code: '401',
    phrase: 'Unauthorized',
    description:
      'indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.',
    spec_title: 'RFC7235#6.3.1',
    spec_href: 'https://tools.ietf.org/html/rfc7235#section-3.1',
  },
  402: {
    code: '402',
    phrase: 'Payment Required',
    description: '*reserved*',
    spec_title: 'RFC7231#6.5.2',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.2',
  },
  403: {
    code: '403',
    phrase: 'Forbidden',
    description:
      'indicates that the server understood the request but refuses to authorize it.',
    spec_title: 'RFC7231#6.5.3',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.3',
  },
  404: {
    code: '404',
    phrase: 'Not Found',
    description:
      'indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
    spec_title: 'RFC7231#6.5.4',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
  },
  405: {
    code: '405',
    phrase: 'Method Not Allowed',
    description:
      'indicates that the method specified in the request-line is known by the origin server but not supported by the target resource.',
    spec_title: 'RFC7231#6.5.5',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.5',
  },
  406: {
    code: '406',
    phrase: 'Not Acceptable',
    description:
      'indicates that the target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.',
    spec_title: 'RFC7231#6.5.6',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.6',
  },
  407: {
    code: '407',
    phrase: 'Proxy Authentication Required',
    description:
      'is similar to 401 (Unauthorized), but indicates that the client needs to authenticate itself in order to use a proxy.',
    spec_title: 'RFC7235#3.2',
    spec_href: 'https://tools.ietf.org/html/rfc7235#section-3.2',
  },
  408: {
    code: '408',
    phrase: 'Request Timeout',
    description:
      'indicates that the server did not receive a complete request message within the time that it was prepared to wait.',
    spec_title: 'RFC7231#6.5.7',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.7',
  },
  409: {
    code: '409',
    phrase: 'Conflict',
    description:
      'indicates that the request could not be completed due to a conflict with the current state of the resource.',
    spec_title: 'RFC7231#6.5.8',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.8',
  },
  410: {
    code: '410',
    phrase: 'Gone',
    description:
      'indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.',
    spec_title: 'RFC7231#6.5.9',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.9',
  },
  411: {
    code: '411',
    phrase: 'Length Required',
    description:
      'indicates that the server refuses to accept the request without a defined Content-Length.',
    spec_title: 'RFC7231#6.5.10',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.10',
  },
  412: {
    code: '412',
    phrase: 'Precondition Failed',
    description:
      'indicates that one or more preconditions given in the request header fields evaluated to false when tested on the server.',
    spec_title: 'RFC7232#4.2',
    spec_href: 'https://tools.ietf.org/html/rfc7232#section-4.2',
  },
  413: {
    code: '413',
    phrase: 'Payload Too Large',
    description:
      'indicates that the server is refusing to process a request because the request payload is larger than the server is willing or able to process.',
    spec_title: 'RFC7231#6.5.11',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.11',
  },
  414: {
    code: '414',
    phrase: 'URI Too Long',
    description:
      'indicates that the server is refusing to service the request because the request-target is longer than the server is willing to interpret.',
    spec_title: 'RFC7231#6.5.12',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.12',
  },
  415: {
    code: '415',
    phrase: 'Unsupported Media Type',
    description:
      'indicates that the origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.',
    spec_title: 'RFC7231#6.5.13',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.13',
  },
  416: {
    code: '416',
    phrase: 'Range Not Satisfiable',
    description:
      "indicates that none of the ranges in the request's Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.",
    spec_title: 'RFC7233#4.4',
    spec_href: 'https://tools.ietf.org/html/rfc7233#section-4.4',
  },
  417: {
    code: '417',
    phrase: 'Expectation Failed',
    description:
      "indicates that the expectation given in the request's Expect header field could not be met by at least one of the inbound servers.",
    spec_title: 'RFC7231#6.5.14',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.14',
  },
  418: {
    code: '418',
    phrase: "I'm a teapot",
    description:
      "Any attempt to brew coffee with a teapot should result in the error code 418 I'm a teapot.",
    spec_title: 'RFC2324#2.3.1',
    spec_href: 'https://tools.ietf.org/html/rfc2324#section-2.3.1',
  },
  426: {
    code: '426',
    phrase: 'Upgrade Required',
    description:
      'indicates that the server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.',
    spec_title: 'RFC7231#6.5.15',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.5.15',
  },
  500: {
    code: '500',
    phrase: 'Internal Server Error',
    description:
      'indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
    spec_title: 'RFC7231#6.6.1',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
  },
  501: {
    code: '501',
    phrase: 'Not Implemented',
    description:
      'indicates that the server does not support the functionality required to fulfill the request.',
    spec_title: 'RFC7231#6.6.2',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.6.2',
  },
  502: {
    code: '502',
    phrase: 'Bad Gateway',
    description:
      'indicates that the server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.',
    spec_title: 'RFC7231#6.6.3',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.6.3',
  },
  503: {
    code: '503',
    phrase: 'Service Unavailable',
    description:
      'indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.',
    spec_title: 'RFC7231#6.6.4',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.6.4',
  },
  504: {
    code: '504',
    phrase: 'Gateway Time-out',
    description:
      'indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.',
    spec_title: 'RFC7231#6.6.5',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.6.5',
  },
  505: {
    code: '505',
    phrase: 'HTTP Version Not Supported',
    description:
      'indicates that the server does not support, or refuses to support, the protocol version that was used in the request message.',
    spec_title: 'RFC7231#6.6.6',
    spec_href: 'https://tools.ietf.org/html/rfc7231#section-6.6.6',
  },
  102: {
    code: '102',
    phrase: 'Processing',
    description:
      'is an interim response used to inform the client that the server has accepted the complete request, but has not yet completed it.',
    spec_title: 'RFC5218#10.1',
    spec_href: 'https://tools.ietf.org/html/rfc2518#section-10.1',
  },
  207: {
    code: '207',
    phrase: 'Multi-Status',
    description: 'provides status for multiple independent operations.',
    spec_title: 'RFC5218#10.2',
    spec_href: 'https://tools.ietf.org/html/rfc2518#section-10.2',
  },
  226: {
    code: '226',
    phrase: 'IM Used',
    description:
      'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
    spec_title: 'RFC3229#10.4.1',
    spec_href: 'https://tools.ietf.org/html/rfc3229#section-10.4.1',
  },
  308: {
    code: '308',
    phrase: 'Permanent Redirect',
    description:
      'The target resource has been assigned a new permanent URI and any future references to this resource outght to use one of the enclosed URIs. [...] This status code is similar to 301 Moved Permanently (Section 7.3.2 of rfc7231), except that it does not allow rewriting the request method from POST to GET.',
    spec_title: 'RFC7538',
    spec_href: 'https://tools.ietf.org/html/rfc7538',
  },
  422: {
    code: '422',
    phrase: 'Unprocessable Entity',
    description:
      'means the server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.',
    spec_title: 'RFC5218#10.3',
    spec_href: 'https://tools.ietf.org/html/rfc2518#section-10.3',
  },
  423: {
    code: '423',
    phrase: 'Locked',
    description:
      'means the source or destination resource of a method is locked.',
    spec_title: 'RFC5218#10.4',
    spec_href: 'https://tools.ietf.org/html/rfc2518#section-10.4',
  },
  424: {
    code: '424',
    phrase: 'Failed Dependency',
    description:
      'means that the method could not be performed on the resource because the requested action depended on another action and that action failed.',
    spec_title: 'RFC5218#10.5',
    spec_href: 'https://tools.ietf.org/html/rfc2518#section-10.5',
  },
  428: {
    code: '428',
    phrase: 'Precondition Required',
    description:
      'indicates that the origin server requires the request to be conditional.',
    spec_title: 'RFC6585#3',
    spec_href: 'https://tools.ietf.org/html/rfc6585#section-3',
  },
  429: {
    code: '429',
    phrase: 'Too Many Requests',
    description:
      'indicates that the user has sent too many requests in a given amount of time ("rate limiting").',
    spec_title: 'RFC6585#4',
    spec_href: 'https://tools.ietf.org/html/rfc6585#section-4',
  },
  431: {
    code: '431',
    phrase: 'Request Header Fields Too Large',
    description:
      'indicates that the server is unwilling to process the request because its header fields are too large.',
    spec_title: 'RFC6585#5',
    spec_href: 'https://tools.ietf.org/html/rfc6585#section-5',
  },
  451: {
    code: '451',
    phrase: 'Unavailable For Legal Reasons',
    description:
      'This status code indicates that the server is denying access to the resource in response to a legal demand.',
    spec_title: 'draft-ietf-httpbis-legally-restricted-status',
    spec_href:
      'https://tools.ietf.org/html/draft-ietf-httpbis-legally-restricted-status',
  },
  506: {
    code: '506',
    phrase: 'Variant Also Negotiates',
    description:
      'indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.',
    spec_title: 'RFC2295#8.1',
    spec_href: 'https://tools.ietf.org/html/rfc2295#section-8.1',
  },
  507: {
    code: '507',
    phrase: 'Insufficient Storage',
    description:
      'means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
    spec_title: 'RFC5218#10.6',
    spec_href: 'https://tools.ietf.org/html/rfc2518#section-10.6',
  },
  511: {
    code: '511',
    phrase: 'Network Authentication Required',
    description:
      'indicates that the client needs to authenticate to gain network access.',
    spec_title: 'RFC6585#6',
    spec_href: 'https://tools.ietf.org/html/rfc6585#section-6',
  },
};

export default {
  async logError(
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    error: AxiosError | Error | any,
    componentName: string,
    componentContext: string,
    description?: string,
    _extra?: Record<string, unknown>,
    _tags?: Record<string, Primitive>
  ): Promise<void> {
    SentryUtil.capture(
      error,
      componentName,
      componentContext,
      description,
      _extra,
      _tags
    );
  },
  makeErrorMessage(err: IError): string {
    let incidentId;
    let code: number | undefined;

    if (axios.isAxiosError(err.err)) {
      code = err.err.response
        ? err.err.response?.status
        : err.err.request?.status;
      incidentId = err.err.response?.data.incidentId;
    }

    const description =
      err.description ??
      this.getErrorMessageByCode(code) ??
      'Oops, something went wrong.';

    // todo: for further incident tracking through system
    if (incidentId) {
      return (
        description +
        '\nIf you would like to contact us, please use the following reference in your correspondence, so that we can help you quickly: \n' +
        incidentId +
        '\n' +
        'We apologize for the inconvenience.\n'
      );
    }

    return description;
  },

  getErrorMessageByCode(code: number | undefined): string | undefined {
    if (code === undefined) {
      return;
    }
    return errorCodes[code]?.phrase;
  },

  // use this custom catcher to get all failed responses from .allSettled promise method
  catchErrorsFromAxiosResponses(
    responses: Array<PromiseSettledResult<AxiosResponse>>
  ): Array<AxiosError> {
    return responses
      .filter((res): res is PromiseRejectedResult => res.status === 'rejected')
      .map((rejectedRes): AxiosError => rejectedRes.reason);
  },
};
