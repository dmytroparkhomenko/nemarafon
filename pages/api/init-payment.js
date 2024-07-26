import LiqPay from "./lib";

export default async function handler(req, res) {
  const { amount } = req.body;
  const liqPay = new LiqPay(
    process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY,
    process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY
  );

  const params = {
    action: "pay",
    amount: amount,
    currency: "USD",
    description: "Test Payment",
    order_id: "order_" + new Date().getTime(),
    version: "3",
  };

  const data = Buffer.from(JSON.stringify(params)).toString("base64");
  const signature = liqPay.cnb_signature(params);

  res.status(200).json({ data, signature });
}
