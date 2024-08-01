"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("order_id");
  const [message, setMessage] = useState("Перевірка статусу оплати...");
  const [programURI, setProgramURI] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      verifyPaymentStatus(orderId);
    } else {
      setMessage("Невідомий номер замовлення.");
    }
  }, [orderId]);

  const verifyPaymentStatus = async (orderId: string) => {
    try {
      const res = await fetch("/api/payment-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const result = await res.json();

      console.log("Verify Payment Status Result:", result);

      if (result.status === "success") {
        setMessage("Дякуємо за покупку!");
        setProgramURI(result.programURI);
      } else {
        setMessage("Оплата не пройшла");
      }
    } catch (error) {
      console.error("Verify Payment Status Error:", error);
      setMessage("Сталася помилка під час перевірки статусу оплати.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">{message}</h1>
      {programURI && (
        <a
          href={programURI}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Перейти до програми
        </a>
      )}
    </div>
  );
};

export default PaymentStatus;
