"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "@/app/components/layout/AppLayout";
import Button from "@/app/components/common/Button";
import Link from "next/link";

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
        // setMessage("Оплата не пройшла");
        setMessage("Дякуємо за покупку!");
      }
    } catch (error) {
      console.error("Verify Payment Status Error:", error);
      setMessage("Сталася помилка під час перевірки статусу оплати.");
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] max-w-[80%] mx-auto mt-[-50px]">
        <h1 className="text-2xl mb-6 w-full">{message}</h1>
        {/* {programURI ? (
          <>
            <Button href={`/program/${programURI}`}>Перейти до програми</Button>
            <Link className="mt-3 underline text-marine" href="/profile">
              Перейти до профілю
            </Link>
          </>
        ) : (
          <Button className="px-[20px] w-[fit-content]" href={`/`}>
            Повернутися на головну
          </Button>
        )} */}
        <Button href={`/profile`}>Перейти до профілю</Button>
      </div>
    </AppLayout>
  );
};

export default PaymentStatus;
