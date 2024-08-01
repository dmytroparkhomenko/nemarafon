import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY!;
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { orderId } = req.body;

    if (!orderId) {
      console.error("Missing orderId");
      return res.status(400).json({ error: "orderId is required" });
    }

    const params = {
      public_key: LIQPAY_PUBLIC_KEY,
      version: "3",
      action: "status",
      order_id: orderId,
    };

    const data = Buffer.from(JSON.stringify(params)).toString("base64");
    const signature = generateSignature(data, LIQPAY_PRIVATE_KEY);

    try {
      const response = await fetch("https://www.liqpay.ua/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data,
          signature: signature,
        }),
      });

      const result = await response.json();

      console.log("LiqPay API response:", result);

      if (result.status === "success") {
        res.status(200).json(result);
      } else {
        console.error("LiqPay API Error:", result);
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function generateSignature(data: string, privateKey: string) {
  const str = privateKey + data + privateKey;
  const sha1 = crypto.createHash("sha1");
  sha1.update(str);
  return sha1.digest("base64");
}
