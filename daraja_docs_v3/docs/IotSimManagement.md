# IotSimManagement
**Source:** https://developer.safaricom.co.ke/apis/IotSimManagement

---

[![safaricom logo](../images/IotSimManagement_img_0.svg)](/)

HomeAPIsDashboardMarketplaceFAQsMiniApps

Log Out

1. Discover APIs
2. /
3. IoT SIM Management

![](../images/IotSimManagement_img_1.svg)

###### IoT SIM Management

By Safaricom

IoT SIM management APIs enable seamless activation, monitoring, messaging and control of SIM cards in connected devices, ensuring efficient network management and real-time data usage tracking.

POST

https://sandbox.safaricom.co.ke/simportal/{path\_suffix}

Use API

Get Started in 3 easy steps

![simulator-progress](../images/IotSimManagement_img_2.svg)

Open Simulator

###### DOCUMENTATION

- Overview

- How It Works

- Getting Started

- Integration Steps

- Go live

## Overview

The IoT SIM Management APIs make it easy for developers and businesses to manage their Safaricom IoT SIM cards and messaging services. With these APIs, you can efficiently handle SIM lifecycle management, monitor in real-time, and send messages, ensuring your connected devices run smoothly.

These APIs help you automate SIM and messaging tasks, improve device connectivity, and boost communication efficiency in your IoT applications.

#### Key features of the APIs include:

* SIM Operations:

  + Activate, suspend & rename SIM cards or assets
  + Retrieve all SIMs, check SIM lifecycle status, query customer & product details
  + Analyze activation trends.
* Messaging:

  + Send single or bulk messages
  + Search messages
  + Filter messages
  + Delete messages
  + Fetch all stored messages.
* Supports Automated Testing via the Simulator
* Postman Collection

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
4. Have access to the IoT platform. [Safaricom IoT SIM Management](https://www.iotsimmanagement.safaricombusiness.co.ke/landing-page) .To get access to the platform, you will need to buy our IoT SIM Connectivity solution on [Safaricom Business Hub](https://www.business.safaricom.co.ke/products/IoTSimManagement). You will be assigned an active number that you will use here.
5. If actioning on behalf, the Admin's Username and account number [Safaricom IoT SIM Management](https://www.iotsimmanagement.safaricombusiness.co.ke/landing-page)

### Good to Know

The APIs are divided into two categories: the SIM operations APIs that allow users to manage their SIM cards and Messaging APIs that allow users to manage messages.

### Environments

| Environment | Description |
| --- | --- |
| Sandbox | Testing environment. |
| Production | Live environment for real transactions. |

## Integration Steps

### SIM Operations APIs

#### Get All Sims

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/allsims>

The get all sims API allows users fetch details of all the sims in a given customer account.

**Request Body**

```json
{
    "vpnGroup": [
        "1-225560081***_VPN"
    ],
    "startAtInde": "0",
    "pageSize": "3",
    "username": "user@safaricom.co.ke"
}
```

**Request Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| vpnGroup | Specified account number whose SIMs are to be queried | String | Customer account number e.g.: 1-225560081663\_VPN |
| startAtIndex | Index at which to start generating response | String | Any digit equal to or greater than 0, e.g.: 1 |
| pageSize | Number of objects expected from query | String | Any digit greater than 0, e.g.: 5 |
| username | Username of user registered under vpnAccount | String | Email address of user with access to the account, e.g.: [johndoe@gmail.com](mailto:johndoe@gmail.com) |

**Response Body**

```json
{
    "header": {
        "requestRefId": "9953-4cfa-a173-507eb79891fe237",
        "responseCode": 200,
        "responseMessage": "Success",
        "customerMessage": "Operation Successfull",
        "timestamp": "2025-03-20T11:22:53.461865400"
    },
    "body": {
        "Desc": [
        {
            "life_cycle_status":"Active",
            "iccid":"***************",
            "asset_name":"*******",
            "activation_date":"-",
            "expiry_date":"2030",
            "imei":"-",
            "product_status":"Active",
            "imsi":"***************",
            "msisdn":"*********",
            "vpn_group":"1-225560081***_VPN",
            "activation_agent":"-",
        }
        ]
    }
}
```

**Response Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| life\_cycle\_status | Status of SIM card on the network | String | Active |
| iccid | Unique SIM card identification code | String | 89254014010100030360 |
| asset\_name | Customer assigned asset name for SIM card | String | Tracker012 |
| activation\_date | Date and time log for when the SIM card was activated | String | 2025-03-05T11:05:06.088002510 |
| expiry\_date | Expected year for SIM card expiration | String | 2050 |
| imei | IMEI for the device on which the SIM card is used | String | 350123451234560 |
| product\_status | Status of the tariff/product assigned to the SIM card | String | Active |
| imsi | Unique SIM card network identification code | String | 639014010003036 |
| msisdn | Unique SIM card IoT subscriber identifier | String | 300000003036 |
| vpn\_group | Account number to which customer SIM cards are registered | String | 1-225560081663\_VPN |
| activation\_agent | Name of entity that performed activation procedure on SIM card | String | jDoe |

**Error Codes**

| Error | Possible Cause | Mitigation |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorized - Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |
| 401 User not permitted to carry out operation | The username provided in the payload doesn’t have the required permissions | Assign the required permission to the user, alternatively use a user account with permission |
| 404 No records were found | The account number provided doesn’t exist in the database | Check the format of the account number provided, verify, and retry |

#### Query Life Cycle Status

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/queryLifeCycleStatus>

The Query Life Cycle Status(Check Sim Status) helps you check the status of a SIM and provides detailed information about its current state

**Request Body**

```json
{
    "msisdn": "300000020***",
    "vpnGroup": "1-225560081***_VPN",
    "username": "user@safaricom.co.ke"
}
```

**Request Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| msisdn | Unique SIM card IoT subscriber identifier to be queried | String | 300000443539 |
| vpnGroup | Specified account number where the SIM card is assigned | String | Customer account number e.g.: 1-225560081663\_VPN |
| username | Username of user registered under account number | String | Email address of user with access to the account, e.g.: [johndoe@gmail.com](mailto:johndoe@gmail.com) |

**Response Body**

```json
{
    "header": {
        "requestRefId": "228f-45a2-9987-5780c2ff600f362",
        "responseCode": 200,
        "responseMessage": "Success",
        "customerMessage": "Operation Successfull",
        "timestamp": "2025-03-21T08:57:25.407140944"
    },
    "body": {
        "desc": "Operation successfull",
        "status": "Active",
        "statusCode": "0"
    }
}
```

**Response Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| desc | Description of the operation status | String | Operation Successful |
| status | Status of the SIM card on the network | String | Active |
| statusCode | Numerical description of the SIM card status on the network | String | 0 |

**Errors**

| Error | Possible Cause | Mitigation |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorised - Invalid Access Token | Null or expired access token used to make API call | Generate new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |
| 401 User not permitted to carry out operation | The username provided in the payload doesn’t have the required permissions to carry out the operation | Assign the required permission to the user, or alternatively use a user account that has the required permission |
| 404 No records were found | The account number provided doesn’t exist in the database | Check the format of the account number provided, verify and retry |
| 200 No records were found | The msisdn provided doesn’t belong to the account provided | Validate that the msisdn belongs to the account number and then retry |

#### Query Customer Info

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/querycustomerinfo>

The Query Customer Info(Check Sim and Product Status) API checks both SIM card and product statuses, as well as the product assigned to the SIM card.

**Request Body**

```json
{
    "msisdn": "300000443***",
    "vpnGroup": "1-225560081***_VPN",
    "username": "user@safaricom.co.ke"
}
```

**Request Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| msisdn | Unique SIM card IoT subscriber identifier to be queried | String | 300000443539 |
| vpnGroup | Specified account number where the SIM card is assigned | String | Customer account number e.g., 1-225560081663\_VPN |
| username | Username of user registered under the account number | String | Email address of user with access to the account, e.g., [johndoe@gmail.com](mailto:johndoe@gmail.com) |

**Response Body**

```json
{
    "header": {
        "requestRefId": "228f-45a2-9987-5780c2ff600f362",
        "responseCode": 200,
        "responseMessage": "Success",
        "customerMessage": "Operation Successfull",
        "timestamp": "2025-03-21T08:57:25.407140944"
    },
    "body": {
        "offeringName": "Speed Governor 300MB + 20SMS",
        "offeringStatus": "Active",
        "subscriberStatus": "Active",
        "offeringId": "14205***",
        "vpnGroup": "1-22556008****_VPN"
    }
}
```

**Response Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| offeringName | Name of tariff that’s assigned to SIM card | String | Speed Governor 300MB + 20SMS |
| offeringStatus | Status of the tariff/product that’s assigned to the SIM card | String | Active |
| subscriberStatus | Status of SIM card on the network | String | Active |
| offeringId | ID of tariff assigned to SIM card | String | 14205001 |
| vpnGroup | Specified account number whose SIMs are to be queried | String | Customer account number e.g., 1-225560081663\_VPN |

**Errors**

| Error | Possible Cause | Mitigation |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorized - Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |
| 401 User not permitted to carry out operation | The username provided in the payload doesn’t have the required permissions to carry out the operation | Assign the required permission to the user, or use a user account that has the required permission |
| 404 No records were found | The account number provided doesn’t exist in the database | Check the format of the account number provided, verify, and retry |
| 200 No records were found | The msisdn provided doesn’t belong to the account number provided | Validate that the msisdn belongs to the account number and then retry |

#### SIM Activation

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/simactivation>

The sim activation(Activate SIM card) API allows users to activate a SIM card.

**Request Body**

```json
{
    "msisdn": "300000443***",
    "vpnGroup": "1-225560081***_VPN",
    "username": "user@safaricom.co.ke"
}
```

**Request Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| msisdn | Unique SIM card IoT subscriber identifier to be queried | String | 300000443539 |
| vpnGroup | Specified account number where the SIM card is assigned | String | Customer account number e.g., 1-225560081663\_VPN |
| username | Username of user registered under the account number | String | Email address of user with access to the account, e.g., [johndoe@gmail.com](mailto:johndoe@gmail.com) |

**Response Body**

```json
{
    "header": {
        "requestRefId": "228f-45a2-9987-5780c2ff600f362",
        "responseCode": 200,
        "responseMessage": "Success",
        "customerMessage": "Operation Successfull",
        "timestamp": "2025-03-21T08:57:25.407140944"
    },
    "body": {
        "Desc": "Line activated successfully",
        "requestId": "df19-47d1-826e-1ef0b317fed3145596",
        "ID": "300000130371"
    }
}
```

**Response Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| Desc | Description of the operation response | String | Line activated successfully |
| requestId | Request identifier for the API call | String | df19-47d1-826e-1ef0b317fed3145596 |
| ID | Unique SIM card IoT subscriber identifier to be queried | String | 300000130371 |

**Errors**

| Error | Possible Cause | Mitigation |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorized - Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |
| 401 User not permitted to carry out operation | The username provided in the payload doesn’t have the required permissions to carry out the operation | Assign the required permission to the user, or use a user account that has the required permission |
| 404 No records were found | The account number provided doesn’t exist in the database | Check the format of the account number provided, verify, and retry |
| 200 Operation Failed | The msisdn provided doesn’t belong to the account number provided | Validate that the msisdn belongs to the account number and then retry |

#### Get Activation Trends

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/getactivationtrends>

The get activation trends API provides a visual graph of the trends in operations performed on SIM cards within your account.

**Request Body**

```json
{
    "vpnGroup": "1-22556008****_VPN",
    "startDate": "20240221",
    "stopDate": "20240421",
    "username": "user@safaricom.co.ke"
}
```

**Request Parameter Definition**

| Name | Description | Parameter Type | Sample Values |
| --- | --- | --- | --- |
| vpnGroup | Specified account number where the SIM card is assigned | String | 1-22556008\*\*\*\*\_VPN |
| startDate | Start date from which report is generated | String | 20240413 |
| endDate | End date to which report is generated | String | 20240727 |
| username | Username of user registered under an account number | String | [johndoe@gmail.com](mailto:johndoe@gmail.com) |

**Response Body**

```json
{
    "header": {
        "requestRefId": "9953-4cfa-a173-507eb79891fe358",
        "responseCode": 200,
        "responseMessage": "Success",
        "customerMessage": "Operation Successfull",
        "timestamp": "2025-03-21T09:19:45.058033487"
    },
    "body": {
        "body": [
            {
                "pooledTrend":[ ...
                ],
                "suspendedTrend":[ ...
                ],
                "dates":[ ...
                ],
                "activeTrend":[ ...
                ],
                "idleTrend":[ ...
                ]
            }
        ]
    }
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| pooledTrend | A trend of how SIM cards in the account were set to the pooled status | String | 524 |
| suspendedTrend | A trend of how SIM cards in the account were set to the suspended status | String | 34 |
| dates | Individual dates split in days within the startDate and endDate range | String | 20240604 |
| activeTrend | A trend of how SIM cards in the account were set to the active status | String | 23 |
| idleTrend | A trend of how SIM cards in the account were set to the idle status | String | 4 |

**Errors**

| **Error** | **Possible Cause** | **Mitigation** |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorized - Invalid Access Token | Null or expired access token used to make the API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |
| 401 User not permitted to carry out operation | The username provided in the payload doesn’t have the required permissions | Assign the required permission to the user, alternatively use a user account that has the required permission |

#### Rename Asset

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/renameasset>

The rename asset API is used to assign a preferred name to a given asset/SIM card.

**Request Body**

```json
{
    "msisdn": "300000038722",
    "vpnGroup": "1-225560081663_VPN",
    "username": "test@safaricom.co.ke",
    "assetName": "test11111"
}
```

**Request Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| msisdn | Unique SIM card IoT subscriber identifier to be queried | String | 300000443539 |
| vpnGroup | Specified account number where the SIM card is assigned | String | 1-225560081663\_VPN |
| username | Username of user registered under the account number | String | [johndoe@gmail.com](mailto:johndoe@gmail.com) |
| assetName | The customer-preferred identifier to be assigned to the asset that has msisdn | String | Tracker001 |

**Response Body**

```json
{
    "header": {
        "requestRefId": "228f-45a2-9987-5780c2ff600f362",
        "responseCode": 200,
        "responseMessage": "Success",
        "customerMessage": "Asset renamed successfully",
        "timestamp": "2025-03-21T08:57:25.407140944"
    },
    "body": {
        "result": "Success",
        "desc": "Operation Successfull"
    }
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| result | Response of the renaming operation | String | Success |
| desc | Description of result from renaming operation | String | Operation Successful |

```json
                          |
```

**Errors**

| Error | Possible Cause | Mitigation |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorized - Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |
| 401 User not permitted to carry out operation | The username provided in the payload doesn’t have the required permissions to carry out the operation | Assign the required permission to the user, or use a user account that has the required permission |
| 404 No records were found | The account number provided doesn’t exist in the database | Check the format of the account number provided, verify, and retry |
| 200 Operation Failed | The msisdn provided doesn’t belong to the account number provided | Validate that the msisdn belongs to the account number and then retry |

#### Suspend Or Unsuspend Subscriber

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/suspend_unsuspend_sub>

The suspend unsuspend sub API lets you easily suspend or unsuspend a subscriber or SIM card.

**Request Body**

```json
{
    "msisdn": "30000010****",
    "username": "user@safaricom.co.ke",
    "vpnGroup": "1-22556008****_VPN",
    "product": "14205***",
    "operation": "resume"
}
```

**Request Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| msisdn | Unique SIM card IoT subscriber identifier to be queried | String | 30000044\*\*\*\* |
| username | Username of user registered under the account number | String | [johndoe@gmail.com](mailto:johndoe@gmail.com) |
| vpnGroup | Specified account number where the SIM card is assigned | String | 1-22556008\*\*\*\*\_VPN |
| product | This is the ID of the tariff that the SIM is registered on | String | 14205\*\*\* |
| operation | This is the task that you’d like to perform on the SIM, it can either be “suspend” or “resume” | String | suspend |

**Response Body**

```json
{
    "header": {
        "requestRefId": "9953-4cfa-a173-507eb79891fe359",
        "responseCode": 200,
        "responseMessage": "Success",
        "customerMessage": "Operation Successfull",
        "timestamp": "2025-03-21T09:35:24.665853885"
    },
    "body": {
        "statusCode": 0,
        "statusDesc": "Operation successfully."
    }
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| statusCode | A code of the operation’s response | int | 0 |
| statusDesc | A description of the operation’s response | String | Operation successfully |

**Errors**

| Error | Possible Cause | Mitigation |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorized - Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |
| 401 User not permitted to carry out operation | The username provided in the payload doesn’t have the required permissions to carry out the operation | Assign the required permission to the user, or use a user account that has the required permission |
| 404 No records were found | The account number provided doesn’t exist in the database | Check the format of the account number provided, verify, and retry |
| 200 Operation Failed | The msisdn provided doesn’t belong to the account number provided | Validate that the msisdn belongs to the account number and then retry |

### Messaging APIs

#### Search Messages

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/searchmessages?pageNo=1&pageSize=50>

The search message API allows you to find and retrieve messages based on specific search criteria, making it easy to filter and access stored messages efficiently.

**Request Body**

```json
{
    "searchValue": "25430000010****"
}
```

**Request Parameter Definition**

| Name | Description | Type | Sample Values |
| --- | --- | --- | --- |
| searchValue | The SIM whose messages are to be searched, preceded with ‘254’ | String | 25430000010\*\*\*\* |

**Response Body**

```json
{
    "header": {
        "requestRefId": "9953-4cfa-a173-507eb79891fe237",
        "responseCode": 200,
        "responseMessage": "Details fetched successfully.",
        "customerMessage": "Details fetched successfully.",
        "timestamp": "2025-03-20T11:22:53.461865400"
    },
    "body": {
        "content": [
        {
            "id":4149,
            "recepitId":-1,
            "sourceAddr":"23122",
            "msisdn":"25430000010****",
            "message":"route",
            "sourceSystem":"sim-portal",
            "processingStatus":"1",
            "messageId":"247439",
            "date":"13-06-2024 11:39:58",
            "deliverTime":"-",
            "description":"sent",
            "vpnGroup":"1-225560081663_VPN",
        }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 50,
            "sort": {
                "unsorted": false,
                "sorted": true,
                "empty": false
            },
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 0,
        "totalElements": 0,
        "last": true,
        "numberOfElements": 0,
        "size": 50,
        "number": 0,
        "sort": {
            "unsorted": false,
            "sorted": true,
            "empty": false
        },
        "first": true,
        "empty": true
    }
}
```

**Response Parameter Definition**

| Name | Description | Parameter Type | Sample Value |
| --- | --- | --- | --- |
| id | Message’s ID on the database | Int | 4149 |
| reciptId | Flag for status of message’s reception on the database | Int | 1 |
| sourceAddr | ID of the message’s source | String | 2331 |
| msisdn | Unique SIM card IoT subscriber identifier | String | 254300000003036 |
| message | Raw contents of the message | String | test |
| sourceSystem | Source from which the message was sent | String | sim-portal |
| processingStatus | Status of the message transmission operation | String | 1 |
| messageId | ID of the message on the database | String | 32242 |
| date | Timestamp of when the message was sent | String | 13-06-2024 11:39:58 |
| deliverTime | Timestamp of when the device acknowledged receipt of the message | String | 13-06-2024 11:39:58 |
| description | A description of the messaging operation | String | sent |
| vpnGroup | Account number to which customer SIM cards are registered | String | 1-225560081663\_VPN |
| pageNumber | An index of the page on which the message is contained | Int | 0 |
| pageSize | Total number of messages to be contained in response page | Int | 50 |
| unsorted | Flag on whether the response generated is unsorted | Boolean | false |
| sorted | Flag on whether the response generated is sorted | Boolean | true |
| empty | Flag on whether the response generated is empty | Boolean | false |
| offset | Number of records to be skipped before selecting next result | Int | 0 |
| unpaged | Flag on whether the response generated has pagination disabled | Boolean | false |
| paged | Flag on whether the response generated has pagination enabled | Boolean | true |
| totalPages | The total number of pages in the response generated | Int | 1 |
| totalElements | The total number of elements in the response generated | Int | 1 |
| last | Flag on whether the page in the response is the last one | Boolean | true |
| numberOfElements | The number of elements in the response generated | Int | 1 |
| size | The size of the page for the response generated | Int | 50 |
| number | Position of the record within the response dataset | Int | 0 |
| first | Flag on whether the response generated is the initial page | Boolean | true |

**Errors**

| Error | Possible Cause | Mitigation |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using the account number that the user is allowed access to |
| 401 Unauthorized – Invalid Access Token | Null or expired access token used to make API call | Generate new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |

#### Filter Messages

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/filtermessages?pageNo=1&pageSize=10>

The filter messages API allows you to fetch messages within a specified start date and end date, based on a given status.

**Request Body**

```json
{
    "startDate": "02-05-2022 08:39:11",
    "endDate": "02-10-2022 00:00:00",
    "status": "1"
}
```

**Request Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| startDate | Timestamp of the start of the date range from which the messages filtering is to be performed | String | 02-05-2024 08:39:11 |
| endDate | Timestamp of the end of the date range to which the messages filtering is to be performed | String | 02-05-2024 08:39:11 |
| status | Processing status code of the messages which are to be filtered | String | 1 |

**Response Body**

```json
{
    "header": {
        "requestRefId": "228f-45a2-9987-5780c2ff600f368",
        "responseCode": 200,
        "responseMessage": "Details fetched successfully.",
        "customerMessage": "Details fetched successfully.",
        "timestamp": "2025-03-21T09:45:12.345576841"
    },
    "body": {
        "content": [
            {
                "id": 4156,
                "receiptId": -1,
                "sourceAddr": "23122",
                "msisdn": "254300001365500",
                "message": "Unavailable",
                "sourceSystem": "sim-portal",
                "processingStatus": "1",
                "messageId": "1837299002",
                "date": "02-09-2024 17:01:07",
                "deliverTime": "-",
                "description": "sent",
                "vpnGroup": "1-225560081663_VPN"
            },
            {
                "id": 4154,
                "receiptId": -1,
                "sourceAddr": "23122",
                "msisdn": "254300000109264",
                "message": "Unavailable",
                "sourceSystem": "sim-portal",
                "processingStatus": "1",
                "messageId": "1837298987",
                "date": "02-09-2024 11:30:58",
                "deliverTime": "-",
                "description": "sent",
                "vpnGroup": "1-225560081663_VPN"
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 10,
            "sort": {
                "sorted": true,
                "unsorted": false,
                "empty": false
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalPages": 1,
        "totalElements": 2,
        "last": true,
        "size": 10,
        "number": 0,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "numberOfElements": 2,
        "first": true,
        "empty": false
    }
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| id | Message’s id on the database | int | 4149 |
| reciptId | Flag for status of message’s reception on the database | int | 1 |
| sourceAddr | ID of the message’s source | String | 2331 |
| msisdn | Unique SIM card IoT subscriber identifier | String | 254300000003036 |
| message | Raw contents of the message | String | test |
| sourceSystem | Source from which the message was sent | String | sim-portal |
| processingStatus | Status of the message transmission operation | String | 1 |
| messageId | ID of the message on the database | String | 32242 |
| date | Timestamp of when the message was sent | String | 13-06-2024 11:39:58 |
| deliverTime | Timestamp of when the device acknowledged receipt of the message | String | 13-06-2024 11:39:58 |
| description | A description of the messaging operation | String | sent |
| vpnGroup | Account number to which customer SIM cards are registered | String | 1-225560081663\_VPN |

**Errors**

| **Error** | **Possible Cause** | **Mitigation** |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using an account number that the user is authorized to access |
| 401 Unauthorized-Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |

#### Delete Message Thread

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/deleteMessageThread>

The delete message thread API is used to delete all messages sent to a given SIM.

**Request Body**

```json
{
    "msisdn": "254724751076"
}
```

**Request Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| msisdn | The SIM whose messages are to be deleted, preceded with ‘254’ | String | 254300000109271 |

**Response Body**

```json
{
    "header": {
        "requestRefId": "9953-4cfa-a173-507eb79891fe361",
        "responseCode": 200,
        "responseMessage": "Message deleted successfully.",
        "customerMessage": "Message deleted successfully.",
        "timestamp": "2025-03-21T09:53:15.341533626"
    },
    "body": null
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| requestRefId | The transaction reference ID for the API call | String | db6d-46f8-b385-e91c17c867df60905 |
| responseCode | API call response code, aligned to standard HTTP status code definitions | int | 200 |
| responseMessage | API call technical response message | String | Success |
| customerMessage | Customer response message | String | Operation Successful |
| timestamp | Date and time log for when request was sent | String | 2025-03-05T11:05:06.088002510 |

**Errors**

| **Error** | **Possible Cause** | **Mitigation** |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using an account number that the user is authorized to access |
| 401 Unauthorized-Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |

#### Get All Messages

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/getallmessages?pageNo=1&pageSize=10>

The get all messages API allows you to fetch details of all messages sent to all SIMs within a specified account number.

**Request Body**

```json
{
    "vpnGroup": "1-24856327146_VPN",
    "pageNo": 1,
    "pageSize": 10,
}
```

**Request Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| vpnGroup | Specified account number where the SIM card is assigned | String | Customer account number eg: 1-225560081663\_VPN |

**Response Body**

```json
{
    "header": {
        "requestRefId": "228f-45a2-9987-5780c2ff600f369",
        "responseCode": 200,
        "responseMessage": "Details fetched successfully.",
        "customerMessage": "Details fetched successfully.",
        "timestamp": "2025-03-21T10:03:14.025032625"
    },
    "body": {
        "content": [
            {
                "id": 4190,
                "receiptId": -1,
                "sourceAddr": "23122",
                "msisdn": "254300000002967",
                "message": "Test",
                "sourceSystem": "sim-portal",
                "processingStatus": "0",
                "messageId": "-",
                "date": "17-03-2025 14:32:22",
                "deliverTime": "-",
                "description": "-",
                "vpnGroup": "1-225560081663_VPN"
            },
            ...
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 10,
            "sort": {
                "sorted": true,
                "unsorted": false,
                "empty": false
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalPages": 2,
        "totalElements": 16,
        "last": false,
        "size": 10,
        "number": 0,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "numberOfElements": 10,
        "first": true,
        "empty": false
    }
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| id | Message’s id on the database | int | 4149 |
| reciptId | Flag for status of message’s reception on the database | int | 1 |
| sourceAddr | ID of the message’s source | String | 2331 |
| msisdn | Unique SIM card IoT subscriber identifier | String | 254300000003036 |
| message | Raw contents of the message | String | test |
| sourceSystem | Source from which the message was sent | String | sim-portal |
| processingStatus | Status of the message transmission operation | String | 1 |
| messageId | ID of the message on the database | String | 32242 |
| date | Timestamp of when the message was sent | String | 13-06-2024 11:39:58 |
| deliverTime | Timestamp of when the device acknowledged receipt of the message | String | 13-06-2024 11:39:58 |
| description | A description of the messaging operation | String | sent |
| vpnGroup | Account number to which customer SIM cards are registered | String | 1-225560081663\_VPN |

**Errors**

| **Error** | **Possible Cause** | **Mitigation** |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using an account number that the user is authorized to access |
| 401 Unauthorized-Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |

#### Send Single Message

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/sendsinglemessage>

The send single message API allows you to send a single message to a given SIM.

**Request Body**

```json
{
    "msisdn": "300001172***",
    "message": "Test",
    "vpnGroup": "1-47820525***_VPN"
}
```

**Request Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| msisdn | Unique SIM card IoT subscriber identifier to be queried | String | 300000443\*\*\* |
| message | The message content to be sent to the SIM card | String | Test |
| vpnGroup | Specified account number whose SIMs are to be queried | String | Customer account number eg: 1-225560081663\_VPN |

**Response Body**

```json
{
    "header": {
        "requestRefId": "228f-45a2-9987-5780c2ff600f368",
        "responseCode": 200,
        "responseMessage": "Message queued successfully.",
        "customerMessage": "Message queued successfully.",
        "timestamp": "2025-03-21T09:45:12.345576841"
    },
    "body": {
        "id": 4156,
        "receiptId": -1,
        "sourceAddr": "23122",
        "msisdn": "254300001365500",
        "message": "Unavailable",
        "sourceSystem": "sim-portal",
        "processingStatus": "1",
        "messageId": "1837299002",
        "date": "02-09-2024 17:01:07",
        "deliverTime": "-",
        "description": "sent",
        "vpnGroup": "1-225560081663_VPN"

    }
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| id | Message’s id on the database | int | 4149 |
| reciptId | Flag for status of message’s reception on the database | int | 1 |
| sourceAddr | ID of the message’s source | String | 2331 |
| msisdn | Unique SIM card IoT subscriber identifier | String | 254300000003036 |
| message | Raw contents of the message | String | test |
| sourceSystem | Source from which the message was sent | String | sim-portal |
| processingStatus | Status of the message transmission operation | String | 1 |
| messageId | ID of the message on the database | String | 32242 |
| date | Timestamp of when the message was sent | String | 13-06-2024 11:39:58 |
| deliverTime | Timestamp of when the device acknowledged receipt of the message | String | 13-06-2024 11:39:58 |
| description | A description of the messaging operation | String | sent |
| vpnGroup | Account number to which customer SIM cards are registered | String | 1-225560081663\_VPN |

**Errors**

| **Error** | **Possible Cause** | **Mitigation** |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using an account number that the user is authorized to access |
| 401 Unauthorized-Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |

#### Delete Message

Endpoint: <https://sandbox.safaricom.co.ke/simportal/v1/deletemessage>

The delete message API allows you to delete a specific message using its ID.

**Request Body**

```json
{
    "id": 3888
}
```

**Request Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| id | The ID of the message to be deleted. This can be gotten from the searchMessages or getAllMessages APIs | String | 2324 |

**Response Body**

```json
{
    "header": {
        "requestRefId": "9953-4cfa-a173-507eb79891fe361",
        "responseCode": 200,
        "responseMessage": "Message deleted successfully.",
        "customerMessage": "Message deleted successfully.",
        "timestamp": "2025-03-21T09:53:15.341533626"
    },
    "body": null
}
```

**Response Parameter Definition**

| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| --- | --- | --- | --- |
| requestRefId | The transaction reference ID for the API call | String | db6d-46f8-b385-e91c17c867df60905 |
| responseCode | API call response code, aligned to standard HTTP status code definitions | int | 200 |
| responseMessage | API call technical response message | String | Success |
| customerMessage | Customer response message | String | Operation Successful |
| timestamp | Date and time log for when request was sent | String | 2025-03-05T11:05:06.088002510 |

**Error Codes**

| **Error** | **Possible Cause** | **Mitigation** |
| --- | --- | --- |
| 400 Bad Request – Kindly use your own vpnGroup | Using an account number that the user is not authorized to access | Retry using an account number that the user is authorized to access |
| 401 Unauthorized-Invalid Access Token | Null or expired access token used to make API call | Generate a new access token and try again |
| 500 Failed to execute the ExtractVariables: EV-FilterMessages | Missing or invalid payload passed on the API call | Retry the API call with a payload that matches the correct structure |

### Testing

#### Option 1: Daraja Simulator

* Create a test app, select C2B product.
* Simulator uses app credentials and predefined test data.
* Register URLs before each simulation.
* Select "CustomerPayBillOnline" for Paybill or "CustomerBuyGoodsOnline" for Till.

![Create App](../images/IotSimManagement_img_3.png)
![Simulator](../images/IotSimManagement_img_4.png)

#### Option 2: Postman

* Generate access token using endpoints above.
* Download Postman collection.
* Use "Register C2B Confirmation and Validation URLs" request.
* Simulate payments using appropriate requests.
* Replace parameters with actual credentials.

> **Note:** "Simulate C2B Request" is only available in Sandbox.

### Go Live

* Attach integration to a live Paybill/Till number.
* Fill in live data: short code, organization name, M-PESA admin/manager username.
* Visit "GO LIVE" tab for more info.

![Go Live](../images/IotSimManagement_img_5.png)

Upon successful go live, production endpoints are sent to developer email.

Daraja 3.0

Daraja 3.0 is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for payment integration to web and mobile apps. By connecting to our APIs, you open a world of possibilities to you and your clients. Together, we can transform lives.

Discover more

[Privacy Policy](/terms)

[Terms and Conditions](/terms)

Copyright@Safaricom PLC 2025

Ask Daraja about anything 😊

![chatbot icon](../images/IotSimManagement_img_6.svg)

Logout of Daraja?

If you Logout, you will be required to Login again to access some features.

CancelLogout