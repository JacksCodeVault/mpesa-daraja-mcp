# BusinessPayBill
**Source:** https://developer.safaricom.co.ke/apis/BusinessPayBill

---

[![safaricom logo](../images/BusinessPayBill_img_0.svg)](/)

HomeAPIsDashboardMarketplaceFAQsMiniApps

Log Out

1. Discover APIs
2. /
3. Business Pay Bill

![](../images/BusinessPayBill_img_1.svg)

###### Business Pay Bill

By Safaricom

This API enables you to pay bills directly from your business account to a pay bill number, or a paybill store.

POST

https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest

Use API

Get Started in 3 easy steps

![simulator-progress](../images/BusinessPayBill_img_2.svg)

Open Simulator

API DocumentationError

Overview

This API enables you to pay bills directly from your business account to
a pay bill number, or a paybill store. You can use this API to pay on behalf of
a consumer/requester.

The transaction moves money from your MMF/Working account to the recipient’s
utility account.

Request Body

{

"Initiator":"API\_Usename",

"SecurityCredential":"FKXl/KPzT8hFOnozI+unz7mXDgTRbrlrZ+C1Vblxpbz7jliLAFa0E/…../uO4gzUkABQuCxAeq+0Hd0A==",

"Command ID": "BusinessPayBill",

"SenderIdentifierType": "4",

"RecieverIdentifierType":"4",

"Amount":"239",

"PartyA":"123456",

"PartyB":"000000",

"AccountReference":"353353",

"Requester":"254700000000",

"Remarks":"OK",

"QueueTimeOutURL":"http://0.0.0.0:0000/ResultsListener.php",

"ResultURL":"http://0.0.0.0:8888/TimeOutListener.php",

}

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| CommandID | For this API use **BusinessPayBill** only. | String | BusinessPayBill |
| Initiator | The M-Pesa API operator username. This user needs Org Business Pay Bill API initiator role on M-Pesa | String | Username, user\_name |
| SecurityCredential | The encrypted password of the M-Pesa API operator. The process for encrypting the initiator password has been described under docs. An online encryption tool is available under the test credentials section. | String | 32SzVdmCvjpmQfw3X2RK8UAv7xuhhkgjfgHAJSGFHJgagfagF  HAGHFSGhjgsfhjasKHSAGfdghsfhdfjhfDGHFSJGHDFGJshfdksjkd;ahb HJGXCJHGXHJGCH`JGZCKXJ`GASYAHC`JGXZCSAGuls uiduisa304dXxFC5+3lslkk2TDJY/Lh6ESVwtqMxJzF7qA== |
| PartyA | Your shortcode. The shortcode from which money will be deducted. | Number | Shortcode (5-6 digits) e.g., 123454 |
| SenderIdentifierType | The type of shortcode from which money is deducted. For this API, only "4" is allowed. | Number | 4 |
| PartyB | The shortcode to which money will be moved | Number | 000000 |
| RecieverIdentifierType | The type of shortcode to which money is credited. This API supports type 4 only | Number | 4 |
| Requester | Optional. The consumer’s mobile number on behalf of whom you are paying. | Mobile | 254000000000 |
| Amount | The transaction amount. | Number | 300 |
| Account Reference | The account number to be associated with the payment. Up to 13 characters. | String | ACC#03929/4yu |
| Remarks | Any additional information to be associated with the transaction. | String | Sentence of up to 100 characters. |
| QueueTimeOutURL | A URL that will be used to notify your system in case the request times out before processing. | URL | https://ip or domain: port/path |
| ResultURL | A URL that will be used to send transaction results after processing. | URL | https://ip or domain: port/path |
| Occassion | Any additional information to be associated with the transaction. | String | Sentence of up to 100 characters |

'

Response Body

{

"OriginatorConversationID": "5118-111210482-1",

"ConversationID": "AG\_20230420\_2010759fd5662ef6d054",

"ResponseCode": "0",

"ResponseDescription": "Accept the service request successfully."

}

Repsonse Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| OriginatorConverstionID | Unique request identifier assigned by Daraja upon successful request submission. | String | String of less then 20 characters |
| ConversationID | Unique request identifier assigned by M-Pesa upon successful request submission. | String | 500 OK, Error codes |
| ResponseCode | Status code for request submission. 0(zero) indicates successful submission. | String | 0 |
| ResponseDescription | A descriptive message of the request submission status. | String | Accept the service request successfully. |

Successful Result Body

{

"Result":

{

"ResultType": "0",

"ResultCode":"0",

"ResultDesc": "The service request is processed successfully",

"OriginatorConversationID":"626f6ddf-ab37-4650-b882-b1de92ec9aa4",

"ConversationID":"12345677dfdf89099B3",

"TransactionID":"QKA81LK5CY",

"ResultParameters":

{

"ResultParameter":

[{

"Key":"DebitAccountBalance",

"Value":"{Amount={CurrencyCode=KES, MinimumAmount=618683, BasicAmount=6186.83}}"

},

{

"Key":"Amount",

"Value":"190.00"

},

{

"Key":"DebitPartyAffectedAccountBalance",

"Value":"Working Account|KES|346568.83|6186.83|340382.00|0.00"

},

{

"Key":"TransCompletedTime",

"Value":"20221110110717"

},

{

"Key":"DebitPartyCharges",

"Value":""

},

{

"Key":"ReceiverPartyPublicName",

"Value":000000– Biller Companty

},

{

"Key":"Currency",

"Value":"KES"

},

{

"Key":"InitiatorAccountCurrentBalance",

"Value":"{Amount={CurrencyCode=KES, MinimumAmount=618683, BasicAmount=6186.83}}"

}]

},

"ReferenceData":

{

"ReferenceItem":[

{"Key":"BillReferenceNumber", "Value":"19008"},

{"Key":"QueueTimeoutURL", "Value":"http://172.31.234.68:8888/Listener.php"}

]

}
}
}

Successful Result Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| Result | The root parameter encloses the entire result message. | JSON Object | "Result":{ } |
| ConversationId | Unique request identifier assigned by M-Pesa upon successful request submission. | String | 236543-276372-2 |
| OriginatorConversationId | Unique request identifier assigned by API gateway upon successful request submission. | String | AG\_2376487236\_126732989KJHJKH |
| ResultDesc | A descriptive message for the transaction result. | String | The service request is processed successfully. |
| ResultType | A status code indicating whether the transaction was already sent to your listener. The usual value is 0. | Number | 0 |
| ResultCode | A transaction result status code. 0(zero) indicates successful processing. | Number | 0 |
| TransactionID | Unique M-PESA transaction ID for the payment request. | String | LHG31AA5TX |
| ResultParameters | This is a JSON object that holds more details for the transaction. | JSON Object | "Result":{"ResultParameters":{"":[ ]}} |
| ResultParameter | A JSON array within the ResultParameters that holds additional transaction details as JSON objects. | JSON Object | "Result":{"ResultParameters":{"ResultParameter":[ ]}} |
| TransactionID | Unique M-PESA receipt number for the payment request. | String | LHG31AA5TX |
| Amount | The transaction amount that was transacted. Returned as one of the key-value objects under the ResultParameter array. | Number | 100 |
| TransactionCompletedTime | A 14-digit timestamp indicating the date and time the transaction completed on M-PESA. Returned as one of the key-value objects under the ResultParameter array. | Number | 20171206163233 |
| ReceiverPartyPublicName | The public name of the credit party/organization. Returned as one of the key-value objects under the ResultParameter array. | String | 600000 - saf test org |
| DebitPartyCharges | Transaction fee deducted on the debit party if applicable. Value is empty if no charges apply. Returned as one of the key-value objects under the ResultParameter array. | Number | 1 |
| Currency | A currency code of the transaction amount. Returned as one of the key-value objects under the ResultParameter array. | String | KES |
| DebitPartyAffectedAccountBalance | The balance in the organization's account from which funds were deducted under the shortcode. Returned as one of the key-value objects under the ResultParameter array. | String | Working Account|KES|500000.00|599490.00|0.00|0.00 |
| DebitAccountCurrentBalance | The balance in the organization's account from which funds were deducted under the shortcode. Returned as one of the key-value objects under the ResultParameter array. | String | {Amount={CurrencyCode=KES, MinimumAmount=59949000, BasicAmount=599490.00}} |
| InitiatorAccountCurrentBalance | The balance in the organization accounts from which funds were deducted under the shortcode. Returned as one of the key-value objects under the ResultParameter array. | String | {Amount={CurrencyCode=KES, MinimumAmount=59949000, BasicAmount=599490.00}} |
| ReferenceData | This JSON object holds more details for the transaction reference data. | JSON Object | "ReferenceData": {"ReferenceItem": []} |
| ReferenceItem | A JSON array that holds JSON Objects with additional transaction details. |  | ReferenceItem": [{"Key": "BillReferenceNumber", "Value": "19008" }, {"Key": "", "Value": "" }]] |

Unsuccessful Result Body

{

"Result":

{

"ResultType": 0,

"ResultCode":2001,

"ResultDesc": "The initiator information is invalid.",

"OriginatorConversationID":"12337-23509183-5",

"ConversationID":"AG\_20200120\_0000657265d5fa9ae5c0",

"TransactionID":"OAK0000000",

"ResultParameters":

{

"ResultParameter":

{

"Key":"BOCompletedTime", "Value":20200120164825}

},

"ReferenceData":{

"ReferenceItem":{

"Key":"QueueTimeoutURL",

"Value":"https://internalapi.safaricom.co.ke/mpesa/abresults/v1/submit"

}
  }

}

}

Failed Result Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| Result | The root parameter encloses the entire result message. | JSON Object | "Result":{ } |
| ConversationId | This is a global unique identifier for the transaction request returned by the M-Pesa upon successful request submission. | String | 236543-276372-2 |
| OriginatorConversationId | This is a global unique identifier for the transaction request returned by the API proxy upon successful request submission. | String | AG\_2376487236\_126732989KJHJKH |
| ResultDesc | This is a message from the API that gives the status of the request processing and usually maps to a specific result code value. | String | The initiator information is invalid. |
| ResultType | This is a status code that indicates whether the transaction was already sent to your listener. Usual value is 0. | Number | 0 |
| ResultCode | This is a numeric status code that indicates the status of the transaction processing. 0 means success and any other code means an error occurred or the transaction failed. | Number | 2001 |
| ResultParameters | This is a JSON object that holds more details for the transaction  in a key-value format. | JSON Object | ResultParameters:{"ResultParameter":{"Key":"BOCompletedTime","Value":20200120164825}} |
| TransactionID | Unique M-PESA transaction ID for the payment request. A generic value is passed for certain failure scenarios. | String | OAK0000000 |
| ReferenceData | This JSON object holds more details for the transaction reference data. | JSON Object | "ReferenceData": {"ReferenceItem": []} |
| ReferenceItem | A JSON array within the that holds JSON Objects with additional transaction details |  | ReferenceItem": [{"Key": "BillReferenceNumber", "Value": "19008" }, {"Key": "", "Value": "" }]] |

Daraja 3.0

Daraja 3.0 is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for payment integration to web and mobile apps. By connecting to our APIs, you open a world of possibilities to you and your clients. Together, we can transform lives.

Discover more

[Privacy Policy](/terms)

[Terms and Conditions](/terms)

Copyright@Safaricom PLC 2025

Ask Daraja about anything 😊

![chatbot icon](../images/BusinessPayBill_img_3.svg)

Logout of Daraja?

If you Logout, you will be required to Login again to access some features.

CancelLogout