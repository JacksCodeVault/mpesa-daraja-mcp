# Authorization
**Source:** https://developer.safaricom.co.ke/apis/Authorization

---

[![safaricom logo](../images/Authorization_img_0.svg)](/)

HomeAPIsDashboardMarketplaceFAQsMiniApps

Log Out

1. Discover APIs
2. /
3. Authorization

![](../images/Authorization_img_1.svg)

###### Authorization

By Safaricom

Gives you a time bound access token to call allowed APIs.

GET

https://sandbox.safaricom.co.ke/oauth/v1/generate?grant\_type=client\_credentials

Use API

Get Started in 3 easy steps

![simulator-progress](../images/Authorization_img_2.svg)

Open Simulator

## Overview

The Authorization API generates access tokens required for authenticating API calls.

Key Features:

* OAuth 2.0 Authentication
* Token Expiry: 3600 seconds
* Supports Automated Testing via the Simulator
* Simulator: Developers can automatically generate tokens by selecting an app in the simulator section, where keys auto-populate.
* Postman Collection: Developers can also obtain their Consumer Key and Consumer Secret from the Daraja [My Apps](https://daraja.safaricom.co.ke/dashboard/myapps) page and use them for manual authentication.

  > **Note:** This API must be called before any other API in the Daraja platform, as all other APIs require an access token for authentication.

## How It Works

1. A developer retrieves the Consumer Key and Consumer Secret from the Daraja Portal.
2. The developer sends a request to the Authorization API using Basic Authentication.
3. The API validates credentials and returns an access token.
4. The token is then used in subsequent API calls.

## Getting Started

### Prerequisites

1. Create a Daraja Account on [Safaricom Developer Portal](https://daraja.safaricom.co.ke/).
2. Create an sandbox app in the portal to get API credentials.
3. Retrieve Consumer Key & Consumer Secret from your sandbox app on [My Apps](https://daraja.safaricom.co.ke/myapps).

### Good to Know

* Token Expiry: Tokens expires after 3600 seconds (1 hour).

## Environments

| Environment | Description |
| --- | --- |
| Sandbox | Testing environment. |
| Production | Live environment for real transactions. |

## Integration Steps

**Generate an OAuth Access Token**

All API calls require a Bearer Token obtained from the Authorization API.

**Request Body**

```json
// AUTHORIZATION (Basic Auth)
username
password
// HEADERS
{
  "Authorization": "Basic Q2RtTmJkdDBpQk4xb3FEZkthc200ZGFiZHBLbXRhTm46RExLRzdQQnVuNzIwR1ppbQ=="
}

// PARAMS
grant_type;
client_credentials;
```

**Request Parameter Definition**

| Name | Description | Type | Sample Values |
| --- | --- | --- | --- |
| grant\_type | The client\_credentials grant type is supported. Put this under Params. | Query | client\_credentials |

**Response Body**

```json
{
  "access_token": "c9SQxWWhmdVRlyh0zh8gZDTkubVF",
  "expires_in": 3599
}
```

**Response Parameter Definition**

| Name | Description | Type | Sample Values |
| --- | --- | --- | --- |
| access\_token | Access token to access the APIs | JSON Response Item | c9SQxWWhmdVRlyh0zh8gZDTkubVF |
| expires\_in | Token expiry time in seconds | JSON Response Item | 3599 |

**Error Response Parameter Definition**

| Name | Description | Probable Cause | Mitigation plan |
| --- | --- | --- | --- |
| 400.008.02 | Invalid grant type passed | Incorrect grant type | Select grant type as client Credentials |
| 400.008.01 | Invalid authentication type passed | Incorrect Authorisation type | Select authorization type as Basic |

## Testing

Using the Simulator

* Safaricom provides an Authorization API Simulator for testing access token generation.
* Access the simulator via the Daraja Portal.

**Steps to Test**

1. Select one of your apps to simulate.
2. Use simulator to invoke requests to the API
3. Check response for success or to resolve any errors.

## Support

### FAQs

1. Why is my access token not working?
   * Tokens expire in 3600 seconds. Generate a new one if expired.
2. What should I do if I get an invalid grant type error?
   * Ensure grant\_type is set to client\_credentials.
3. Can I generate multiple tokens?
   * Yes, but each request invalidates the previous token.

### Chatbot

Developers can get instant responses using the Daraja Chatbot for both development and production support.

### Production Issues & Incident Management

For production support and incident management, use:

* **Incident Management Page:** Visit the [Incident Management](https://daraja.safaricom.co.ke/dashboard/incidentmanagement) page.
* **Email:** Reach out to API support at [apisupport@safaricom.co.ke](mailto:apisupport@safaricom.co.ke).

Daraja 3.0

Daraja 3.0 is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for payment integration to web and mobile apps. By connecting to our APIs, you open a world of possibilities to you and your clients. Together, we can transform lives.

Discover more

[Privacy Policy](/terms)

[Terms and Conditions](/terms)

Copyright@Safaricom PLC 2025

Ask Daraja about anything 😊

![chatbot icon](../images/Authorization_img_3.svg)

Logout of Daraja?

If you Logout, you will be required to Login again to access some features.

CancelLogout