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

import LiqPay from "./lib";
import crypto from "crypto";

export default async function handler(req, res) {
  const { amount, orderId } = req.body;
  const publicKey = process.env.LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;

  const params = {
    public_key: publicKey,
    version: "3",
    action: "pay",
    amount: amount,
    currency: "UAH",
    description: "Test Payment",
    order_id: orderId,
  };

  const data = Buffer.from(JSON.stringify(params)).toString("base64");
  const signature = generateSignature(data, privateKey);

  res.status(200).json({ data, signature });
}

function generateSignature(data, privateKey) {
  const str = privateKey + data + privateKey;
  const sha1 = crypto.createHash("sha1");
  sha1.update(str);
  return sha1.digest("base64");
}
