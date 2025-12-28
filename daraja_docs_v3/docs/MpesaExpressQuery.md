# MpesaExpressQuery
**Source:** https://developer.safaricom.co.ke/apis/MpesaExpressQuery

---

[![safaricom logo](../images/MpesaExpressQuery_img_0.svg)](/)

HomeAPIsDashboardMarketplaceFAQsMiniApps

Log Out

1. Discover APIs
2. /
3. M-Pesa Express Query

![](../images/MpesaExpressQuery_img_1.svg)

###### M-Pesa Express Query

By Safaricom

Check the status of a Lipa Na M-Pesa Online Payment.

POST

https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query

Use API

Get Started in 3 easy steps

![simulator-progress](../images/MpesaExpressQuery_img_2.svg)

Open Simulator

API DocumentationError

Overview

Use this API to check the status of a Lipa Na M-Pesa Online Payment.

Request Body

{

"BusinessShortCode":"174379",

"Password": "MTc0Mzc5YmZiMjc5TliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",

"Timestamp":"20160216165627",

"CheckoutRequestID": "ws\_CO\_260520211133524545",

}

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| BusinessShortCode | This is the organization's shortcode (Paybill or Buygoods - a 5 to 7-digit account number) used to identify an organization and receive the transaction. | Numeric | Shortcode (5 to 7 digits) e.g. 654321 |
| Password | This is the password used for encrypting the request sent: a base64 encoded string. (The base64 string is a combination of Shortcode+Passkey+Timestamp). | String | base64.encode(Shortcode+Passkey+Timestamp) |
| Timestamp | This is the Timestamp of the transaction, normally in the format of YEAR+MONTH+DATE+HOUR+MINUTE+SECOND (YYYYMMDDHHMMSS). Each part should be at least two digits, apart from the year which takes four digits. | Timestamp | YYYYMMDDHHmmss |
| CheckoutRequestID | This is a global unique identifier of the processed checkout transaction request. | String | ws\_CO\_DMZ\_123212312\_2342347678234 |

Response Body

{

"ResponseCode":"0",

"ResponseDescription": "The service request has been accepted successfully",

"MerchantRequestID":"22205-34066-1",

"CheckoutRequestID": "ws\_CO\_13012021093521236557",

"ResultCode":"0",

"ResultDesc":"The service request is processed successfully.",

}

Response Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Value** |
| MerchantRequestID | This is a global unique Identifier for any submitted payment request. | String | 16813-1590513-1 |
| CheckoutRequestID | This is a global unique identifier of the processed checkout transaction request. | String | ws\_CO\_DMZ\_123212312\_2342347678234 |
| ResponseCode | This is a numeric status code that indicates the status of the transaction submission. 0 means successful submission and any other code means an error occurred. | Numeric | 0 |
| ResultDesc | Result description is a message from the API that gives the status of the request processing, usually maps to a specific ResultCode value. It can be a success processing message or an error description message. | String | 0: The service request is processed successfully.  1032: Request canceled by the user |
| ResponseDescription | Response description is an acknowledgment message from the API that gives the status of the request submission usually maps to a specific ResponseCode value. It can be a "Success" submission message or an error description. | String | The service request has failed.  The service request has been accepted successfully |
| ResultCode | This is a numeric status code that indicates the status of the transaction processing. 0 means successful processing and any other code means an error occurred or the transaction failed. | Numeric | 0, 1032 |

Daraja 3.0

Daraja 3.0 is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for payment integration to web and mobile apps. By connecting to our APIs, you open a world of possibilities to you and your clients. Together, we can transform lives.

Discover more

[Privacy Policy](/terms)

[Terms and Conditions](/terms)

Copyright@Safaricom PLC 2025

Ask Daraja about anything 😊

![chatbot icon](../images/MpesaExpressQuery_img_3.svg)

Logout of Daraja?

If you Logout, you will be required to Login again to access some features.

CancelLogout