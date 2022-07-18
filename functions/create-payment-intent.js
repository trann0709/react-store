//domain/.netlify/functions/create-payment-intent
// use this function to communicate with stripe (similar to a backend service)
// Since this is part of the node land, will not be able to use process.env to access env variables.
// In order to do so, will have to install the dotenv package and invoke config

require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    // access using POST
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    //if access using GET
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
