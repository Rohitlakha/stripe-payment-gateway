const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Serve SDK */
app.use("/sdk", express.static(path.join(__dirname, "public")));

/* Routes */
const configRoute = require("./routes/config");
app.use("/api", configRoute);

const createCheckoutSession = require("./routes/create-checkout-session");
app.use("/create-checkout-session", createCheckoutSession);

/* Root test route */
app.get("/", (req, res) => {
  res.send("Payment Gateway Running");
});

/* Start server */
const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
