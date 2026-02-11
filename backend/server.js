const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const createCheckoutSession = require("./routes/create-checkout-session");

const app = express();

app.use(cors());
app.use(express.json());

// serve SDK publicly
app.use("/sdk", express.static(path.join(__dirname, "public")));

app.use("/create-checkout-session", createCheckoutSession);

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Gateway running at http://localhost:${PORT}`);
});
