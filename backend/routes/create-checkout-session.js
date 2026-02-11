const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const projects = require("../config/projects");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {

  try {

    const { projectId, amount, successUrl, cancelUrl } = req.body;

    if (!projectId || !amount) {
      return res.status(400).json({
        error: "Missing projectId or amount"
      });
    }

    const project = projects[projectId];

    if (!project) {
      return res.status(400).json({
        error: "Invalid project"
      });
    }

    if (!project.allowedAmounts.includes(amount)) {
      return res.status(400).json({
        error: "Invalid amount"
      });
    }

    // VERY IMPORTANT: fallback URLs
    const finalSuccessUrl =
      successUrl || "http://localhost:5000/set-success";

    const finalCancelUrl =
      cancelUrl || "http://localhost:5000/set-cancel";

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: project.currency,
            product_data: {
              name: project.name
            },
            unit_amount: amount * 100
          },
          quantity: 1
        }
      ],

      mode: "payment",

      success_url: finalSuccessUrl,

      cancel_url: finalCancelUrl

    });

    res.json({
      sessionId: session.id
    });

  }
  catch (error) {

    console.error("Stripe error:", error);

    res.status(500).json({
      error: "Payment failed"
    });

  }

});

module.exports = router;
