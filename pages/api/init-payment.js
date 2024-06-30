// import LiqPay from "./liqpay";

// export default async function handler(req, res) {
//   const { amount } = req.body;
//   const liqPay = new LiqPay(
//     process.env.LIQPAY_PUBLIC_KEY,
//     process.env.LIQPAY_PRIVATE_KEY
//   );

//   const params = {
//     action: "pay",
//     amount: amount,
//     currency: "USD",
//     description: "Test Payment",
//     order_id: "order_" + new Date().getTime(), // Ensure unique order IDs in production
//     version: "3",
//   };

//   const data = Buffer.from(JSON.stringify(params)).toString("base64");
//   const signature = liqPay.cnb_signature(params);

//   res.status(200).json({ data, signature });
// }

import fetch from "node-fetch"; // or you can use axios

export default async function handler(req, res) {
  const { amount } = req.body;

  // Convert amount from UAH to the smallest currency unit, копійки, if necessary
  const kopiykyAmount = parseInt(amount) * 100;

  // Monobank API request setup
  const monobankApiUrl = "https://api.monobank.ua/api/merchant/invoice/create";
  const monobankData = {
    amount: kopiykyAmount, // Amount in smallest unit
  };

  const monobankHeaders = {
    "Content-Type": "application/json",
    "X-Token": process.env.MONOBANK_TOKEN, // Ensure your token is correctly set in env variables
  };

  try {
    // Making the API request to Monobank
    const apiResponse = await fetch(monobankApiUrl, {
      method: "POST",
      headers: monobankHeaders,
      body: JSON.stringify(monobankData),
    });

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    // Assuming the API returns the payment URL or some data to redirect to the payment gateway
    const apiJson = await apiResponse.json();
    const paymentUrl = apiJson.paymentUrl; // This depends on the actual response structure

    // Respond to the client with the URL or necessary data to redirect for payment
    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("Failed to process payment:", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
}
