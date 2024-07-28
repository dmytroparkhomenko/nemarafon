// app/payment-status/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const signature = searchParams.get("signature");
  const [message, setMessage] = useState("Перевірка статусу оплати...");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (data && signature) {
      verifyPaymentStatus(data, signature);
    }
  }, [data, signature]);

  const verifyPaymentStatus = async (data: string, signature: string) => {
    const res = await fetch("/api/payment-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, signature }),
    });

    const result = await res.json();

    if (result.status === "success") {
      setMessage("Дякуємо за покупку!");
      setLink(result.programURI);
    } else {
      setMessage("Оплата не пройшла");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">{message}</h1>
      {link && (
        <a
          href={link}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Перейти до програми
        </a>
      )}
    </div>
  );
};

export default PaymentStatus;
