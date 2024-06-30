import LiqPay from "./liqpay";

export default async function handler(req, res) {
  const { amount } = req.body;
  const liqPay = new LiqPay(
    process.env.LIQPAY_PUBLIC_KEY,
    process.env.LIQPAY_PRIVATE_KEY
  );

  const params = {
    action: "pay",
    amount: amount,
    currency: "USD",
    description: "Test Payment",
    order_id: "order_" + new Date().getTime(), // Ensure unique order IDs in production
    version: "3",
  };

  const data = Buffer.from(JSON.stringify(params)).toString("base64");
  const signature = liqPay.cnb_signature(params);

  res.status(200).json({ data, signature });
}
