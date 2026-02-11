const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const projects = require("../config/projects");

// Initialize Stripe securely
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20"
});


/*
========================================
Create Checkout Session (Dynamic)
========================================
*/
router.post("/", async (req, res) => {

  try {

    const { projectId, amount, successUrl, cancelUrl } = req.body;

    /* ===============================
       Basic validation
    =============================== */

    if (!projectId) {
      return res.status(400).json({
        error: "Project ID is required"
      });
    }

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        error: "Valid amount is required"
      });
    }

    /* ===============================
       Project validation
    =============================== */

    const project = projects[projectId];

    if (!project) {
      return res.status(400).json({
        error: "Invalid project ID"
      });
    }

    /* ===============================
       Amount validation
    =============================== */

    if (!project.allowedAmounts.includes(Number(amount))) {
      return res.status(400).json({
        error: "Amount not allowed for this project"
      });
    }

    /* ===============================
       Create Stripe Checkout Session
    =============================== */

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {

            currency: project.currency || "inr",

            product_data: {
              name: project.name
            },

            unit_amount: Number(amount) * 100
          },

          quantity: 1
        }
      ],

      mode: "payment",

      success_url:
        successUrl ||
        project.successUrl ||
        "http://localhost:5500/success.html",

      cancel_url:
        cancelUrl ||
        project.cancelUrl ||
        "http://localhost:5500/cancel.html"

    });


    /* ===============================
       Send session ID to frontend
    =============================== */

    res.json({
      sessionId: session.id
    });

  }
  catch (error) {

    console.error("Stripe Session Error:", error.message);

    res.status(500).json({
      error: "Unable to create checkout session"
    });

  }

});


module.exports = router;
