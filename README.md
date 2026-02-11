# Universal Stripe Payment Gateway SDK

A secure, reusable, and beginner-friendly Stripe Payment Gateway designed for easy integration into any web project including Flask, Django, MERN Stack, PHP, or static HTML.

This system provides a centralized Node.js payment server and a lightweight JavaScript SDK so students and developers can accept payments without writing complex backend logic.

---

# Live Architecture

```
Frontend Project (Flask / React / HTML / Django)
        │
        ▼
StripeGateway SDK (payment-sdk.js)
        │
        ▼
Central Payment Server (Node.js + Express)
        │
        ▼
Stripe Checkout
        │
        ▼
Success / Cancel Redirect to Frontend
```

---

# Key Features

• Universal JavaScript SDK
• Works with Flask, Django, MERN, PHP, HTML
• Centralized secure payment backend
• No Stripe secret key exposure
• Beginner-friendly integration
• Dynamic success and cancel URLs
• Test mode and production mode support
• Professional folder structure
• GitHub ready
• Secure architecture

---

# Project Structure

```
stripe-payment-gateway/
│
├── backend/
│   ├── routes/
│   │   ├── create-checkout-session.js
│   │   └── config.js
│   │
│   ├── public/
│   │   └── payment-sdk.js
│   │
│   ├── config/
│   │   └── projects.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── examples/
│   └── flask-example/
│       ├── app.py
│       └── templates/
│           ├── index.html
│           ├── success.html
│           └── cancel.html
│
└── README.md
```

---

# Backend Setup (Payment Gateway Server)

## Step 1 — Clone Repository

```
git clone https://github.com/YOUR_USERNAME/stripe-payment-gateway.git
cd stripe-payment-gateway/backend
```

---

## Step 2 — Install Dependencies

```
npm install
```

---

## Step 3 — Create Environment File

Create `.env` file inside backend folder:

```
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
PORT=4242
```

Never share this file publicly.

---

## Step 4 — Start Payment Server

```
node server.js
```

You should see:

```
Server running at http://localhost:4242
SDK available at http://localhost:4242/sdk/payment-sdk.js
```

---

# Frontend Integration (Any Project)

## Step 1 — Load Stripe and SDK

```
<script src="https://js.stripe.com/v3/"></script>
<script src="http://localhost:4242/sdk/payment-sdk.js"></script>
```

---

## Step 2 — Add Payment Button

```
<button onclick="pay()">Pay Now</button>
```

---

## Step 3 — Start Payment

```
function pay() {

  StripeGateway.startPayment({

    projectId: "flask_course",

    amount: 500,

    backendUrl: "http://localhost:4242",

    successUrl: "http://localhost:5000/set-success",

    cancelUrl: "http://localhost:5000/set-cancel"

  });

}
```

That's it. No backend coding required in student projects.

---

# Flask Integration Example

## app.py

```
from flask import Flask, render_template, redirect, session

app = Flask(__name__)
app.secret_key = "secret"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/set-success")
def set_success():
    session["payment_status"] = "success"
    return redirect("/success")

@app.route("/set-cancel")
def set_cancel():
    session["payment_status"] = "cancel"
    return redirect("/cancel")

@app.route("/success")
def success():
    return render_template("success.html")

@app.route("/cancel")
def cancel():
    return render_template("cancel.html")

app.run(port=5000)
```

---

# Stripe Test Cards

## Successful Payment

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
ZIP: Any
```

---

## Failed Payment

```
4000 0000 0000 0002
```

---

## Cancel Payment

Click back arrow on Stripe page.

---

# Security Design

Sensitive operations are handled only on backend.

Secure components:

• Secret key stored in .env
• No secret exposure to frontend
• SDK only communicates with backend
• Project ID validation
• Amount validation
• Stripe secure checkout

---

# How Students Use This

Students only need:

```
<script src="https://js.stripe.com/v3/"></script>
<script src="http://localhost:4242/sdk/payment-sdk.js"></script>
```

and one function call.

No Stripe backend required.

---

# Production Deployment

Deploy backend to:

• Render
• Railway
• AWS
• DigitalOcean

Then use:

```
https://yourdomain.com/sdk/payment-sdk.js
```

---

# Supported Frontend Frameworks

• Flask
• Django
• React
• MERN Stack
• PHP
• Static HTML
• Next.js

---

# Development Stack

Backend:

• Node.js
• Express
• Stripe API

Frontend:

• JavaScript SDK
• Stripe Checkout

---

# License

MIT License

Free to use for educational and commercial projects.

---

# Author

Developed by Rohit Lakha
MCA Student | Full Stack Developer | Payment Gateway SDK Creator

---
