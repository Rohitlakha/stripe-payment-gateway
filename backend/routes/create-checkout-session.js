const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {

    const { amount, productName } = req.body;

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: productName || "Test Product",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: "http://localhost:5500/examples/flask-example/success.html",

      cancel_url: "http://localhost:5500/examples/flask-example/cancel.html",

    });

    res.json({ id: session.id });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
