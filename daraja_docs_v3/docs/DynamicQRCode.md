# DynamicQRCode
**Source:** https://developer.safaricom.co.ke/apis/DynamicQRCode

---

[![safaricom logo](../images/DynamicQRCode_img_0.svg)](/)

HomeAPIsDashboardMarketplaceFAQsMiniApps

Log Out

1. Discover APIs
2. /
3. Dynamic QR

![](../images/DynamicQRCode_img_1.svg)

###### Dynamic QR

By Safaricom

Generates a dynamic M-PESA QR Code.

POST

https://sandbox.safaricom.co.ke/mpesa/qrcode/v1/generate

Use API

Get Started in 3 easy steps

![simulator-progress](../images/DynamicQRCode_img_2.svg)

Open Simulator

API DocumentationError

Overview

Use this API to generate a Dynamic QR which enables Safaricom M-PESA customers who have My Safaricom App or M-PESA app, to scan a QR (Quick Response) code, to capture till number and amount then authorize to pay for goods and services at select LIPA NA M-PESA (LNM) merchant outlets.

Request Body

{

"MerchantName":"TEST SUPERMARKET",

"RefNo":"Invoice Test",

"Amount":1,

"TrxCode":"BG",

"CPI":"373132",

"Size":"300"

}

Request Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| MerchantName | Name of the Company/M-Pesa Merchant Name | String | "TEST-Supermarket" |
| RefNo | Transaction Reference | String | "xewr34fer4t" |
| Amount | The total amount for the sale/transaction. | Numeric | 2000 |
| TrxCode | Transaction Type. The supported types are:  **BG**: Pay Merchant (Buy Goods).  **WA**: Withdraw Cash at Agent Till.  **PB**: Paybill or Business number.  **SM**: Send Money(Mobile number)  **SB**: Sent to Business. Business number CPI in MSISDN format. | String | - BG  - WA  - PB  - SM  - SB |
| CPI | Credit Party Identifier. Can be a Mobile Number, Business Number, Agent Till, Paybill or Business number, or Merchant Buy Goods. | String | "174379" |
| Size | Size of the QR code image in pixels. QR code image will always be a square image. | String | "300" |

Response Body

{

"ResponseCode":"AG\_20191219\_000043fdf61864fe9ff5",

"RequestID":"16738-27456357-1",

"ResponseDescription":QR Code Successfully Generated.,

"QRCode":"iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAHtElEQVR42u3d23rqIBAGUN//pbNv91c1cpwMsP7L1lg
uUAaF+XiDyal0MgAqEIhCICoQiEIgKhCIQiAqEIhCICoQiEu+zbf2l7wfvLyl/Z/Cc62/Btk8Ktag/Ot7/1LeWbQLgbw
dWtLlVfVxj7AZWEON9hf34wjPoQjhXIRDLsi11TmkspMgPMHhQQjfu7MZYRWnSQhrr6u1lZ0H4fYOIazg8QjCIW3odDX
bxqryHcCuGf7oxB2AljIMJ5AzPDEQ7cEQjTISy/Rr1v1fyQ2Yywsw09Ffw4wnMcHjRF0YOwZ5NRCCc9Q0II4QMICyfxB
8eAq4//kMhPOmKCCEsLQLyxG2jTHW/qptcKJhjHT2FAWEEFYj/DnIEfOr/utq84QhhBA+g/DPxTAS4f1DaW0J9i9hq1p
yGEUxAWTl1UzSMPnPGbNJcNIYTPI7wq5w/XQjhw8s08IYQTEV6/JtMmIfx2M9wwstI8ZrMKQitmjkbY8+GjUQhHteH+5
wGNmzhjbmfhvCZRBeZRMA8xAOuV5N/YhQHoTX7oEwFOFVP8s36qF3yIBqPMLrgPhkfcsH4Xs2H/jYVnvL3TyO+gjC65j
EIRgVAEQhl0cD99bUnP15zMeM3PP73uP1qBkMBXMMIeVw1N1cUQLiNwFML715S/4YxXCoSpBRbWa+c94fuvSmjVnkc4h
9foXFWnsZvEHY9sO222k9DuEaApvL/f6dm8FACOEpIzGjEJa8ZzPC8ntgAiFcCWHzo9fPt+1HWDvWYlQGwsUQ9ox/9MA
dA8IYQ73532XwaHI/zGzJUQQgi/XiSHPBOWt8QzIYSbI6wVGIzQ6CiEEFb8Mz0IIZRlEM54pUAI4e/b11FDOBBCuA/Ctt
etHa0fMjUGCmEEPoUBYSSFeE14vOEPa8UCCGse+dyVATOzj9sNbb7uEGwmwAAAABJRU5ErkJggg==."

}

Response Parameter Definition

|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Description** | **Type** | **Sample Values** |
| ResponseCode | Used to return the Transaction Type. | String | An alpha-numeric string of fewer than 20 characters |
| ResponseDescription | This is a response describing the status of the transaction. | String | QR Code Successfully Generated |
| QRCode | QR Code Image/Data/String. | String | An alpha-numeric string containing the QR Code |

Daraja 3.0

Daraja 3.0 is a web platform that offers access to Safaricom and M-PESA APIs that creates a bridge for payment integration to web and mobile apps. By connecting to our APIs, you open a world of possibilities to you and your clients. Together, we can transform lives.

Discover more

[Privacy Policy](/terms)

[Terms and Conditions](/terms)

Copyright@Safaricom PLC 2025

Ask Daraja about anything 😊

![chatbot icon](../images/DynamicQRCode_img_3.svg)

Logout of Daraja?

If you Logout, you will be required to Login again to access some features.

CancelLogout