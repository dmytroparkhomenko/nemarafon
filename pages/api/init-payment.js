import crypto from "crypto";

export default async function handler(req, res) {
  try {
    const { programURI, programTitle, amount, orderId } = req.body;
    const publicKey = process.env.LIQPAY_PUBLIC_KEY;
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    if (!programURI || !amount || !orderId) {
      console.error("Error: Missing amount or orderId");
      return res.status(400).json({ error: "Missing amount or orderId" });
    }

    const params = {
      public_key: publicKey,
      version: "3",
      action: "pay",
      amount: amount.toString(),
      currency: "UAH",
      description: `Покупка програми ${programTitle}`,
      order_id: orderId,
      result_url: `https://nemarafon-butenko.com/payment-status?order_id=${orderId}`,
      server_url: "https://nemarafon-butenko.com/api/payment-webhook",
      product_name: programURI,
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
