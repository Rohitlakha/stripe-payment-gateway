/*
========================================
Project Configuration Database
========================================

This defines all student projects allowed to use the gateway.

Later this can be replaced with MongoDB, MySQL, etc.
*/

module.exports = {

  flask_course: {

    id: "flask_course",

    name: "Flask Course Fee",

    description: "Payment for Flask course enrollment",

    currency: "inr",

    allowedAmounts: [100, 200, 500, 1000],

    successUrl: "http://localhost:5500/examples/flask-example/success.html",

    cancelUrl: "http://localhost:5500/examples/flask-example/cancel.html",

    active: true

  },

  react_course: {

    id: "react_course",

    name: "React Course Fee",

    description: "Payment for React course enrollment",

    currency: "inr",

    allowedAmounts: [300, 600, 900],

    successUrl: "http://localhost:5500/examples/react-example/success.html",

    cancelUrl: "http://localhost:5500/examples/react-example/cancel.html",

    active: true

  },

  test_project: {

    id: "test_project",

    name: "Test Payment",

    description: "Test project payment",

    currency: "inr",

    allowedAmounts: [50, 100, 500],

    successUrl: "http://localhost:5500/examples/html-example/success.html",

    cancelUrl: "http://localhost:5500/examples/html-example/cancel.html",

    active: true

  }

};
