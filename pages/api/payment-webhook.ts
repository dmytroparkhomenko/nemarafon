import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { db } from "@/app/firebase/config";
import { doc, setDoc } from "firebase/firestore";

const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data, signature } = req.body;

    if (!data || !signature) {
      console.error("Error: Missing data or signature");
      return res.status(400).json({ error: "Missing data or signature" });
    }

    const expectedSignature = generateSignature(data, LIQPAY_PRIVATE_KEY);

    if (signature !== expectedSignature) {
      console.error("Error: Invalid signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    try {
      const paymentData = JSON.parse(
        Buffer.from(data, "base64").toString("utf-8")
      );

      console.log("Payment data:", paymentData);

      if (paymentData.status === "success") {
        const userId = paymentData.order_id.split("_")[0];
        const programURI = paymentData.custom?.programURI;

        if (!programURI) {
          console.error("Error: Missing programURI");
          return res.status(400).json({ error: "Missing programURI" });
        }

        const userDoc = doc(db, "users", userId);
        await setDoc(
          userDoc,
          {
            programURI: programURI,
            purchaseDate: new Date(),
          },
          { merge: true }
        );

        res
          .status(200)
          .json({ status: "success", programURI: `/program/${programURI}` });
      } else {
        res.status(200).json({ status: "failure" });
      }
    } catch (error) {
      console.error("Webhook Processing Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function generateSignature(data: any, privateKey: string) {
  const str = privateKey + data + privateKey;
  const sha1 = crypto.createHash("sha1");
  sha1.update(str);
  return sha1.digest("base64");
}
