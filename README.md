# Universal Stripe Payment Gateway SDK

A reusable Stripe payment integration system designed for easy embedding into any web project including Flask, Django, MERN, PHP, or static HTML.

## Features

* Universal JavaScript SDK
* Centralized Node.js payment server
* Stripe Checkout integration
* No backend setup required for student projects
* Easy embed with one script
* Test mode supported
* Production ready architecture

---

## Architecture

Client Project (Flask / MERN / Django / HTML)
↓
Stripe SDK Script
↓
Gateway Server (Node.js)
↓
Stripe Checkout

---

## Installation

Clone repository:

```
git clone https://github.com/YOUR_USERNAME/stripe-payment-gateway.git
```

Install dependencies:

```
cd backend
npm install
```

Create `.env` file:

```
STRIPE_SECRET_KEY=sk_test_your_key
PORT=4242
```

Start server:

```
npm start
```

---

## SDK Usage

Include Stripe and SDK:

```
<script src="https://js.stripe.com/v3/"></script>
<script src="http://localhost:4242/sdk/payment-sdk.js"></script>
```

Add payment button:

```
<button onclick="pay()">Pay Now</button>
```

Add script:

```
function pay() {
  StripeGateway.startPayment({
    amount: 500,
    productName: "Course Fee",
    publishableKey: "pk_test_your_key"
  });
}
```

---

## Test Card

```
4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
```

---

## Supported Frameworks

* Flask
* Django
* MERN Stack
* PHP
* Static HTML

---

## License

MIT License
