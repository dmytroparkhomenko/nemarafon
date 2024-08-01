// import LiqPay from "./lib";
// import crypto from "crypto";

// export default async function handler(req, res) {
//   const { amount } = req.body;
//   const publicKey = process.env.LIQPAY_PUBLIC_KEY;
//   const privateKey = process.env.LIQPAY_PRIVATE_KEY;

//   const params = {
//     public_key: publicKey,
//     version: "3",
//     action: "pay",
//     amount: amount,
//     currency: "UAH",
//     description: "Test Payment",
//     order_id: "order_" + new Date().getTime(),
//   };

//   const data = Buffer.from(JSON.stringify(params)).toString("base64");
//   const signature = generateSignature(data, privateKey);

//   res.status(200).json({ data, signature });
// }

// function generateSignature(data, privateKey) {
//   const str = privateKey + data + privateKey;
//   const sha1 = crypto.createHash("sha1");
//   sha1.update(str);
//   return sha1.digest("base64");
// }

// import LiqPay from "./lib";
// import crypto from "crypto";

// export default async function handler(req, res) {
//   const { amount, orderId } = req.body;
//   console.log(amount, orderId);
//   const publicKey = process.env.LIQPAY_PUBLIC_KEY;
//   const privateKey = process.env.LIQPAY_PRIVATE_KEY;

//   const params = {
//     version: "3",
//     public_key: publicKey,
//     action: "pay",
//     amount: amount,
//     currency: "UAH",
//     description: "Test Payment",
//     order_id: orderId,
//   };

//   const data = Buffer.from(JSON.stringify(params)).toString("base64");
//   const signature = generateSignature(data, privateKey);

//   res.status(200).json({ data, signature });
// }

// function generateSignature(data, privateKey) {
//   const str = privateKey + data + privateKey;
//   const sha1 = crypto.createHash("sha1");
//   sha1.update(str);
//   return sha1.digest("base64");
// }

// import LiqPay from "./lib";
// import crypto from "crypto";

// export default async function handler(req, res) {
//   const { amount, orderId } = req.body;
//   const publicKey = process.env.LIQPAY_PUBLIC_KEY;
//   const privateKey = process.env.LIQPAY_PRIVATE_KEY;

//   const params = {
//     public_key: publicKey,
//     version: "3",
//     action: "pay",
//     amount: amount,
//     currency: "UAH",
//     description: "Test Payment",
//     order_id: orderId,
//     result_url: "http://localhost:3000/payment-status",
//     server_url: "http://localhost:3000/api/payment-webhook",
//   };

//   const data = Buffer.from(JSON.stringify(params)).toString("base64");
//   const signature = generateSignature(data, privateKey);

//   res.status(200).json({ data, signature });
// }

// function generateSignature(data, privateKey) {
//   const str = privateKey + data + privateKey;
//   const sha1 = crypto.createHash("sha1");
//   sha1.update(str);
//   return sha1.digest("base64");
// }

// import crypto from "crypto";

// export default async function handler(req, res) {
//   const { amount, orderId } = req.body;
//   const publicKey = process.env.LIQPAY_PUBLIC_KEY;
//   const privateKey = process.env.LIQPAY_PRIVATE_KEY;

//   const params = {
//     public_key: publicKey,
//     version: "3",
//     action: "pay",
//     amount: amount,
//     currency: "UAH",
//     description: "Test Payment",
//     order_id: orderId,
//     result_url: `http://localhost:3000/payment-status?order_id=${orderId}`, // Update with your actual domain
//     server_url: "http://localhost:3000/api/payment-webhook",
//   };

//   const data = Buffer.from(JSON.stringify(params)).toString("base64");
//   const signature = generateSignature(data, privateKey);

//   res.status(200).json({ data, signature });
// }

// function generateSignature(data, privateKey) {
//   const str = privateKey + data + privateKey;
//   const sha1 = crypto.createHash("sha1");
//   sha1.update(str);
//   return sha1.digest("base64");
// }

// export default async function handler(req, res) {
//   try {
//     const { amount, orderId } = req.body;
//     const publicKey = process.env.LIQPAY_PUBLIC_KEY;
//     const privateKey = process.env.LIQPAY_PRIVATE_KEY;

//     if (!amount || !orderId) {
//       return res.status(400).json({ error: "Missing amount or orderId" });
//     }

//     const params = {
//       public_key: publicKey,
//       version: "3",
//       action: "pay",
//       amount: amount,
//       currency: "UAH",
//       description: "Test Payment",
//       order_id: orderId,
//       result_url: `http://localhost:3000/payment-status?order_id=${orderId}`,
//       server_url: "http://localhost:3000/api/payment-webhook",
//     };

//     const data = Buffer.from(JSON.stringify(params)).toString("base64");
//     const signature = generateSignature(data, privateKey);

//     res.status(200).json({ data, signature });
//   } catch (error) {
//     console.error("Init Payment Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// function generateSignature(data, privateKey) {
//   const str = privateKey + data + privateKey;
//   const sha1 = crypto.createHash("sha1");
//   sha1.update(str);
//   return sha1.digest("base64");
// }

import crypto from "crypto";

export default async function handler(req, res) {
  try {
    const { amount, orderId } = req.body;
    const publicKey = process.env.LIQPAY_PUBLIC_KEY;
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    if (!amount || !orderId) {
      console.error("Error: Missing amount or orderId");
      return res.status(400).json({ error: "Missing amount or orderId" });
    }

    const params = {
      public_key: publicKey,
      version: "3",
      action: "pay",
      amount: amount.toString(), // Ensure amount is a string
      currency: "UAH",
      description: "Test Payment",
      order_id: orderId,
      result_url: `https://nemarafon.vercel.app/payment-status?order_id=${orderId}`, // Replace with your actual domain
      server_url: "https://nemarafon.vercel.app/api/payment-webhook", // Replace with your actual server URL
    };

    const data = Buffer.from(JSON.stringify(params)).toString("base64");
    const signature = generateSignature(data, privateKey);

    console.log("Generated data:", data);
    console.log("Generated signature:", signature);

    res.status(200).json({ data, signature });
  } catch (error) {
    console.error("Init Payment Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function generateSignature(data, privateKey) {
  const str = privateKey + data + privateKey;
  const sha1 = crypto.createHash("sha1");
  sha1.update(str);
  return sha1.digest("base64");
}
