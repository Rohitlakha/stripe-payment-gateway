(function() {

  window.StripeGateway = {

    startPayment: async function(config) {

      if (typeof Stripe === "undefined") {
        alert("Stripe not loaded");
        return;
      }

      if (!config.publishableKey) {
        alert("Publishable key missing");
        return;
      }

      try {

        const response = await fetch("http://localhost:4242/create-checkout-session", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            amount: config.amount,
            productName: config.productName
          })

        });

        const session = await response.json();

        const stripe = Stripe(config.publishableKey);

        stripe.redirectToCheckout({
          sessionId: session.id
        });

      } catch (error) {

        alert("Payment error: " + error.message);

      }

    }

  };

})();
