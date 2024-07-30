// pages/api/payment-verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/firebase/config"; // Ensure the correct import path
import crypto from "crypto";
import { doc, setDoc } from "firebase/firestore";

const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request method:", req.method); // Log the request method
  console.log("Request body:", req.body); // Log the request body

  if (req.method === "POST") {
    const { data, signature } = req.body;

    const expectedSignature = crypto
      .createHash("sha1")
      .update(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY)
      .digest("base64");

    if (signature === expectedSignature) {
      const paymentData = JSON.parse(
        Buffer.from(data, "base64").toString("utf-8")
      );

      if (paymentData.status === "success") {
        const userId = paymentData.order_id.split("_")[0];
        const userDoc = doc(db, "users", userId);
        await setDoc(
          userDoc,
          {
            paymentStatus: paymentData.status,
            programURI: paymentData.description,
            purchaseDate: new Date(),
          },
          { merge: true }
        );
        res.status(200).json({
          status: "success",
          programURI: `/programs/${paymentData.description}`,
        });
      } else {
        res.status(200).json({ status: "failure" });
      }
    } else {
      res.status(400).send("Invalid signature");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
