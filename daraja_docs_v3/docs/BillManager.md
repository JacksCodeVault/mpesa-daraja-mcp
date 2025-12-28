# BillManager
**Source:** https://developer.safaricom.co.ke/apis/BillManager

---

[![safaricom logo](../images/BillManager_img_0.svg)](/)

HomeAPIsDashboardMarketplaceFAQsMiniApps

Log Out

1. Discover APIs
2. /
3. Bill Manager

![](../images/BillManager_img_1.svg)

###### Bill Manager

By Safaricom

Gives the business and customers a one-stop end-to-end platform to send, receive, pay and reconcile all payments.

Use API

Get Started in 3 easy steps

![simulator-progress](../images/BillManager_img_2.svg)

Open Simulator

API DocumentationError

Overview

Welcome to M-PESA Bill manager for organizations. M-PESA Bill Manager is a digital service that gives the business and customers a one-stop end-to-end platform to send, receive, pay and reconcile all payments.

Onboarding Generic API

**Endpoint:**
<https://api.safaricom.co.ke/v1/billmanager-invoice/optin>
Copy

This is the first API used to opt you as a biller to our bill manager features. Once you integrate to this API and send a request with a success response, your shortcode is whitelisted and you are able to integrate with all the other remaining bill manager APIs.

**Important Information**

You will use your daraja access token for all the bill manager integrated APIs.

You can use the same consumer key for multiple shortcodes that belong to that consumer key.

Request Body

{

"shortcode":"718003",

"email":"youremail@gmail.com",

"officialContact":"0710XXXXXX",

"sendReminders":"1",

"logo":"image",

"callbackurl":"http://my.server.com/bar/callback"

}

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| shortcode | This is organizations shortcode (Paybill or Buygoods - A 5 to 6 digit account number) used to identify an organization and receive the transaction. | Numeric|Required | Shortcode (5 to 6 digits) e.g. 654321 |
| Email | This is the official contact email address for the organization signing up to bill manager. It will appear in features sent to the customer such as invoices and payment receipts for customers to reach out to you as a business. | String|Required | example@mail.com |
| officialContact | This is the official contact phone number for the organization signing up to bill manager. It will appear in features sent to the customer such as invoices and payment receipts for customers to reach out to you as a business. | Numeric|Required | 0710XXXXXX |
| sendReminders | This field gives you the flexibility as a business to enable or disable sms payment reminders for invoices sent.  A payment reminder is sent 7 days before the due date, 3 days before the due date and on the day the payment is due.  0 - Disable Reminders 1- Enable Reminders | Boolean|Required | 0 or 1 |
| Logo | Image to be embedded in the invoices and receipts sent to your customer. | Image|Optional | JPEG, JPG |
| callback URL | This callbackurl will be availed by you to billmanager during the initial opt-in process.  This callback url will be invoked by our payments API inorder to push payments done to your paybill.    More details on the callback url are in the payments and reconciliation API documentation. | URL|FF Required | http://my.server.com/bar/callback |

'

Response Body

{

"app\_key":"AG\_2376487236\_126732989KJ",

"resmsg":"Success",

"rescode":"200"

}

Response Parameter Definition

|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Sample Values** |
| app\_key | This app\_key is the one you receive upon onboarding your paybill to the Daraja Platform. | AG\_2376487236\_126732989KJ |
| Resmsg | This is a message from the API that gives the status of the request processing and usually maps to a specific result code value. | Success |
| rescode | This is a numeric status code that indicates the status of the transaction processing. 200 means success and any other code means an error occurred or the transaction failed. | 200 |

Single Invoicing - Generic API

**Endpoint:**
<https://api.safaricom.co.ke/v1/billmanager-invoice/single-invoicing>
Copy

Bill Manager invoicing service enables you
to create and send e-invoices to your customers.
Single invoicing
functionality will allow you to send out customized individual e-invoices.
Your customers will receive this notification(s) via
an SMS to the Safaricom phone
number specified while creating the invoice.

**Important Information**

A customer can still opt to pay via USSD, Sim tool kit, M-PESA App, Safaricom App to your pay bill number as long as they reference the correct account number (account reference) as specified on the invoice.

Request Body

{

" "externalReference": "#9932340",

"billedFullName":  "John Doe",

"billedPhoneNumber":  "07XXXXXXXX",

"billedPeriod":"August 2021",

"invoiceName":"Jentrys",

"dueDate":"2021-10-12",

"accountReference":"1ASD678H"

"amount":"800",

"invoiceItems":[

{

"itemName":"food",

"amount":"700"

},

{

"itemName":"water",

"amount":"100"

}

]

}

}

}

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Parameter Type** | **Possible Values** |
| externalReference | This is a unique invoice name on your system’s end. To be used for referencing an invoice from both Bill Manager and your system. invoice externalReference must be existing otherwise the invoice will not be sent. | Varchar| Required | INV2345 |
| billedFullName | The name of the recipient to receive the invoice details. It will appear in the sms sent. | String|Required | Thomas Shelby   Tasha WholeSalers |
| billedPhoneNumber | This is the phone number to receive invoice details via sms. It must be a Safaricom number. | Numeric|Required | 1.0722XXXXXX  2.0712XXXXXX |
| billedPeriod | Month and Year | Date(M/Y)| Required | August 2021 |
| invoiceName | A descriptive invoice name for what your customer is being billed. It will appear in the invoice sms sent to your customer | Varchar|Required | 1. damagefee  2. watersupply |
| dueDate | This is the date you expect the customer to have paid the invoice amount. 3 reminders shall be sent before the due date. That is, seven and three days before the due date and on the day the payment is due. | String Varchar| Required | 2021-09-15 00:00:00.00 |
| accountReference | The account number being invoiced that uniquely identifies a customer. It could be a customer name,business name, a property unit, a student’s name etc. | String(Varchar)|Required | Customer Name - John Doe  Busines Name - WS Suppliers   Property Unit - G70  Student Name - Joan Doe |
| amount | Total Invoice amount to be paid in Kenyan Shillings No special characters eg comma’s should be put in the currency amount | Numeric| Required | 1. 2000  2. 500  3. 200000 |
| invoiceItems | These are additional billable items that you need included in your invoice. The invoice items will appear on the e-invoice. | itemName - String amount - Numeric | Optional | Food  1000 |

Response Body

{

"Status\_Message":"Invoice sent successfully",

"resmsg":"Success",

"rescode":"200"

}

Response Parameter Definition

|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Sample Values** |
| Status\_Message | Descriptive message to show the exact meaning of a response. | Invoice sent successfully |
| rescode | This is a numeric status code that indicates the status of the transaction processing. 200 means success and any other code means an error occurred or the transaction failed. | 200 |
| resmsg | This is a message from the API that gives the status of the request processing and usually maps to a specific result code value. | Success |

Bulk Invoicing - Generic API

**Endpoint:**
[https://api.safaricom.co.ke/v1/billmanager-invoice/bulk-invoicing](https://api.safaricom.co.ke/v1/billmanager-invoice/bulk- invoicing)
Copy

Bill Manager invoicing service enables you
to create and send e-invoices to your customers. Bulk invoicing allows you to send
multiple invoices. Your customers will receive this notification(s) via
an SMS to the Safaricom phone
number specified while creating the invoice.

**Important Information**

A customer can still opt to pay via USSD, Sim tool kit, M-PESA App, Safaricom App to your pay bill number as long as they reference the correct account number (account reference) as specified on the invoice.

To send multiple e-invoices you specify the fields in the “bulk” array section.

You can send up-to 1000 invoices for each call you make on the bulk-invoice API.

The appKey needs to be in the Header of every Service Request provided to you during onboarding.

Request Body

{

// first invoice

{

"externalReference": "1107",

"billedFullName": "John Doe",

"billedPhoneNumber": "0722000000",

"billedPeriod": "August 2021",

"invoiceName": "Jentrys ",

 "dueDate":"2021-09-15 00:00:00.00",

"accountReference": "A1",

"amount":"2000",

"invoiceItems": [

{

"itemName": "food",

"amount": "1000"

},

{

"itemName": "water",

"amount": "1000"

}

]

},

// second invoice

{

"externalReference": "967",

"billedFullName": "John Doe",

"billedPhoneNumber": "0722000000",

"billedPeriod": "August 2021",

"invoiceName": "Jentrys ",

"dueDate": "2021-09-15 00:00:00.00",

"accountReference": "Balboa45",

"amount": "2000",

"invoiceItems": [

{

"itemName": "food",

"amount": "1000"

},

{

"itemName": "water",

"amount": "1000"

}

]

},

// third invoice  
 {  
 "externalReference": "120401",  
 "billedFullName": "John Doe"  
 "billedPhoneNumber": "0722000000",  
  "billedPeriod": "August 2021",  
 "invoiceName": "Jentrys ",  
 "dueDate": "2021-09-15 00:00:00.00",  
 "accountReference": "Balboa45",  
 "amount": "2000",  
 "invoiceItems": [

{    

"itemName": "food",  
 "amount": "1000"  
 },  
 {  
  "itemName": "water",  
 "amount": "1000"  
 }  
  ]  
 },

// fourth invoice  
 {  
 "externalReference": "120067",  
 "billedFullName": "John Doe",  
 "billedPhoneNumber": "0722000000",  
 "billedPeriod": "August 2021",  
 "invoiceName": "Jentrys ",  
 "dueDate": "2021-09-15 00:00:00.00",  
 "accountReference": "",  
 "invoiceItems": [  
 {   
 "itemName": "food  
 "amount":"1000"

},  
  {   
 "itemName": "water",  
 "amount": "1000"  
 }   
 ]   
 }

]

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Parameter Type** | **Possible Values** |
| externalReference | This is a unique invoice name on your system’s end. To be used for referencing an invoice from both Bill Manager and your system. invoice externalReference must be existing otherwise the invoice will not be sent. | Varchar| Required | INV2345 |
| billedFullName | The name of the recipient to receive the invoice details. It will appear in the sms sent. | String|Required | Thomas Shelby   Tasha WholeSalers |
| billedPhoneNumber | This is the phone number to receive invoice details via sms. It must be a Safaricom number. | Numeric|Required | 1.0722XXXXXX  2.0712XXXXXX |
| billedPeriod | Month and Year | Date(M/Y)| Required | August 2021 |
| invoiceName | A descriptive invoice name for what your customer is being billed. It will appear in the invoice sms sent to your customer | Varchar|Required | 1. damagefee  2. watersupply |
| dueDate | This is the date you expect the customer to have paid the invoice amount. 3 reminders shall be sent before the due date. That is, seven and three days before the due date and on the day the payment is due. | String Varchar| Required | 2021-09-15 00:00:00.00 |
| accountReference | The account number being invoiced that uniquely identifies a customer. It could be a customer name,business name, a property unit, a student’s name etc. | String(Varchar)|Required | Customer Name - John Doe  Busines Name - WS Suppliers   Property Unit - G70  Student Name - Joan Doe |
| amount | Total Invoice amount to be paid in Kenyan Shillings No special characters eg comma’s should be put in the currency amount | Numeric| Required | 1. 2000  2. 500  3. 200000 |
| invoiceItems | These are additional billable items that you need included in your invoice. The invoice items will appear on the e-invoice. | itemName - String amount - Numeric | Optional | Food  1000 |

Response Body

{

"Status\_Message": "Invoice sent successfully",

"resmsg": "Success",

"rescode": "200"

}

Response Parameter Definition

|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Sample Values** |
| Status\_Message | Descriptive message to show the exact meaning of a response. | Invoice sent successfully |
| rescode | This is a numeric status code that indicates the status of the transaction processing. 200 means success and any other code means an error occurred or the transaction failed. | 200 |
| resmsg | This is a message from the API that gives the status of the request processing and usually maps to a specific result code value. | Success |

Payments and Reconciliation - Generic API

**Endpoint:**
<https://api.safaricom.co.ke/v1/billmanager-invoice/reconciliation>
Copy

The bill manager
payment feature enables your customers to receive e-receipts for payments made to
your paybill account.

### Pre-Condition.

Your business pay bill must have been onboarded to bill manager for us to push payments to you and for bill manager to receive your payment acknowledgment details. Please see the bill manager onboarding documentation for more details.

### Bill Manager Payments flow.

1.   An M-PESA Customer will make a C2B payment to your pay bill number with the correct account number (account reference) via the USSD, Sim tool kit, M-PESA App, Safaricom App, and from the bill manager e-invoice.

2.   Bill Manager will receive the payment and push it to you for acknowledgment via the call-back URL you provided during onboarding. The payments will have the following structure.

**Important Information**

We will try to send payment details 5 times to your callback URL before cancelling the request.

### Sample Payment API Request and Response

### Request Body

{

"transactionId":"{trandID}",

"paidAmount":"{50}",

"msisdn":"254710119383",

"dateCreated":"2021-09-15",

"accountReference":"LGHJIO789",

"shortCode":"349350555

}

### Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| transactionId | The M-PESA generated reference. | String(Varchar)|Required | RJB53MYR1N |
| paidAmount | Amount Paid In KES | Numeric | 5000 |
| msisdn | The customers PhoneNumber debited | Numeric | 254722000000 |
| dateCreated | The date the payment was done and recorded in the BillManager System | Date | 2021-10-01 |
| accountReference | This is the account number being invoiced that uniquely identifies a customer. It could be a customer name, business name, a property unit, a student’s name etc. | AlphaNumeric | BC001 |
| shortCode | This is organizations shortcode (Paybill or Buygoods - A 5 to 6 digit account number) used to identify an organization and receive the transaction. | Numeric | 456545 |

### Response Body

{

"resmsg":"Success",

"rescode":"200"

}

### Response Parameter Definition

|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Sample Values** |
| resmsg | This is a message from the API that gives the status of the request processing and usually maps to a specific result code value. | Success |
| rescode | Numeric | 200 |

3.   Once the payment details are availed to you, you will reconcile the payment on your end and send an acknowledgment message to the bill manager acknowledgment endpoint. Acknowledgment details sent to bill manager must contain the following:

           • Payment Date

           • Paid Amount

           • Account Reference

           • External Reference

           • Transaction ID

           • Customer Phone Number

           • Customer Full Name

           • Invoice Name

4.   Upon
receiving the acknowledgment message, we will process it and send a receipt acknowledgment message to your customers via the phone
number in the acknowledgment
API result

Sample Expected Acknowledgment API Structure

### Request Body

{

"paymentDate":"2021-10-01",

"paidAmount":"800",

"accountReference":"Balboa95",

"transactionId":"PJB53MYR1N",

"phoneNumber":"0710XXXXXX",

"fullName":"John Doe",

"invoiceName":"School Fees",

"externalReference":"955"

}

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Parameter Type** | **Sample Values** |
| Payment Date | This is the date you expect your customer to settle the invoiced amount.    Two (2) reminders shall be sent to your invoiced customer i.e. Seven (7) days prior to the due date and on the due date | Date | 2021-10-01 |
| Paid Amount | Invoiced amounts will be paid in Kenyan Shillings   Special characters such as commas should not be included in the currency amount. | Numeric|Required | 5000 |
| Account Reference | This is the account number being invoiced that uniquely identifies a customer. It could be a customer name, business name, a property unit, a student’s name etc. | String(Varchar)|Required | D44 |
| Transaction ID | The M-PESA generated reference. | String(Varchar)|Required | PJB53MYR1N |
| Customer Phone Number | The Safaricom phone number that receives the e- invoice details via sms | Numeric|Required | * 0722XXXXXX * 0710XXXXXX |
| Customer Full Name | The name of the invoiced recipient | String(Varchar)|Required | * Thomas Shelby * Tasha WholeSalers |
| Invoice Name | A descriptive name for what your customer is being billed for.  It will appear on the invoice sms sent to your customer. | String(Varchar)|Required | * damagefee * watersupply |

Response Body

{

"resmsg":"Success",

"rescode":"200"

}

Response Parameter Definition

|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Sample Values** |
| resmsg | This is a message from the API that gives the status of the request processing and usually maps to a specific result code value. | Success |
| rescode | This is a numeric status code that indicates the status of the transaction processing. 200 means success and any other code means an error occurred or the transaction failed. | 200 |

Cancel Invoice

The single and bulk cancel invoice APIs allow you to recall already sent invoices.

* A partially paid or fully paid invoice cannot be canceled.
* Existing external reference number(s) are used to specify the exact invoice/invoices you want to cancel.

Cancel Single-Invoicing

The single cancel invoice API allows you to recall a sent invoice. This means the invoice will cease to exist and cannot be used as a reference to a payment.

**Endpoint:**
[https://api.safaricom.co.ke/v1/billmanager-invoice/cancel-single-invoice](https://api.safaricom.co.ke/v1/billmanager-invoice/reconciliation)
Copy

**Cancel Invoice - Request Body**

{

"externalReference":"113",

}

Cancel Bulk Invoicing

The bulk cancel invoice API allows to recall more than one sent invoice.

**Endpoint:**
 [https://sandbox.safaricom.co.ke/v1/billmanager-invoice/cancel-bulk-invoices](https://api.safaricom.co.ke/v1/billmanager-invoice/reconciliation)
Copy

**Cancel Invoice - Request Body**

[

{

"externalReference":"113",

},

{

"externalReference":"113",

}

]

Response Body

{

"Status\_Message":"Invoice cancelled successfuly.",

"resmsg": "Success",

"rescode": "200"

"errors": []

}

Cancel Invoice-Error

{

"Status\_Message":"partially or fully paid invoices cannot be cancelled.",

"resmsg": "Conflict",

"rescode": "409"

"errors": []

}

Updating Optin details

**Endpoint:**
<https://sandbox.safaricom.co.ke/v1/billmanager-invoice/change-optin-details>
Copy

This is the API used to update opt-in details.

**Important Information**

You will use your Daraja access token for all the bill manager-integrated APIs.  
You can use the same consumer key for multiple shortcodes that belong to that consumer key.

Request Body

{

"shortcode":"718003",

"email":"youremail@gmail.com",

"officialContact":"0710XXXXXX",

"sendReminders":1,

"shortcode":"718003",

"logo": "image",

"callbackurl": "/api.example.com/payments?callbackURL=http://my.server.com/bar"

}

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Parameter Type** | **Possible Values** |
| email | This is the official contact email address for the organization signing up to bill manager. It will appear in features sent to the customer such as invoices and payment receipts for customers to reach out to you as a business. | String|Required | example@mail.com |
| officialContact | This is the official contact phone number for the organization signing up to bill manager. It will appear in features sent to the customer such as invoices and payment receipts for customers to reach out to you as a business. | Numeric|Required | e.g. 0710XXXXXX |
| sendReminders | This field gives you the flexibility as a business to enable or disable sms payment reminders for invoices sent. A payment reminder is sent 7 days before the due date, 3 days before the due date, and the day the payment is due. 0 - Disable Reminders 1- Enable Reminders | Numeric|Required | 0 or 1 |
| logo | Image to be embedded in the invoices and receipts sent to your customer. | Image|Required | JPEG, JPG |
| callbackurl | This callbackurl will be availed by you to bill manager during the initial opt-in process. This callbackurl will be invoked by our payments API inorder to push payments done to your paybill. More details on the callbackURL are in the payments and reconciliation API documentation. | URL|Optional | /api.example.com/payments?callbackURL=http://my.server.com/bar |

Response Body

{

"resmsg": "Success",

"rescode": "200"

}

Response Parameter Definition

|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Sample Values** |
| Resmsg | This is a message from the API that gives the status of the request processing and usually maps to a specific result code value. | Success |
| rescode | This is a numeric status code that indicates the status of the transaction processing. 200 means success and any other code means an error occurred or the transaction failed. | 200 |

Daraja 3.0

Daraja 3.0 is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for payment integration to web and mobile apps. By connecting to our APIs, you open a world of possibilities to you and your clients. Together, we can transform lives.

Discover more

[Privacy Policy](/terms)

[Terms and Conditions](/terms)

Copyright@Safaricom PLC 2025

Ask Daraja about anything 😊

![chatbot icon](../images/BillManager_img_3.svg)

Logout of Daraja?

If you Logout, you will be required to Login again to access some features.

CancelLogout