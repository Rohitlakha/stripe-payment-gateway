(function () {

  // Prevent duplicate loading
  if (window.StripeGateway) {
    console.warn("StripeGateway already loaded");
    return;
  }

  window.StripeGateway = {

    /*
    ========================================
    Start Payment Function
    ========================================
    */
    startPayment: async function (config) {

      try {

        /* ===============================
           Validate config
        =============================== */

        if (!config) {
          alert("Payment configuration missing");
          return;
        }

        if (!config.projectId) {
          alert("Project ID is required");
          return;
        }

        if (!config.amount) {
          alert("Amount is required");
          return;
        }

        /* ===============================
           Detect backend URL automatically
        =============================== */

        let backendUrl;

        if (config.backendUrl) {

          // Use custom backend if provided
          backendUrl = config.backendUrl;

        }
        else if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        ) {

          // Local development
          backendUrl = "http://localhost:4242";

        }
        else {

          // Production deployment (same domain)
          backendUrl = window.location.origin;

        }


        /* ===============================
           Load publishable key
        =============================== */

        const keyResponse = await fetch(`${backendUrl}/api/config`);

        if (!keyResponse.ok) {
          throw new Error("Failed to load payment config");
        }

        const keyData = await keyResponse.json();

        if (!keyData.publishableKey) {
          throw new Error("Publishable key missing");
        }


        /* ===============================
           Load Stripe
        =============================== */

        if (typeof Stripe === "undefined") {
          throw new Error("Stripe.js not loaded");
        }

        const stripe = Stripe(keyData.publishableKey);


        /* ===============================
           Create checkout session
        =============================== */

        const sessionResponse = await fetch(
          `${backendUrl}/create-checkout-session`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              projectId: config.projectId,
              amount: config.amount,
              successUrl: config.successUrl,
              cancelUrl: config.cancelUrl
            })
          }
        );

        if (!sessionResponse.ok) {
          throw new Error("Session creation failed");
        }

        const session = await sessionResponse.json();

        if (!session.sessionId) {
          throw new Error("Invalid session");
        }


        /* ===============================
           Redirect to Stripe Checkout
        =============================== */

        const result = await stripe.redirectToCheckout({
          sessionId: session.sessionId
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

      }
      catch (error) {

        console.error("StripeGateway Error:", error);

        alert(
          error.message ||
          "Payment failed. Please try again."
        );

      }

    }

  };

})();
