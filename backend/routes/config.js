const express = require("express");
const router = express.Router();

router.get("/config", (req, res) => {

  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return res.status(500).json({
      error: "Publishable key missing"
    });
  }

  res.json({
    publishableKey
  });

});

module.exports = router;
