import Image from "next/image";
import React, { useState } from "react";
import Visa from "@/app/components/symbols/Visa.svg";
import Mastercard from "@/app/components/symbols/Mastercard.svg";
import Privat from "@/app/components/symbols/Privat.svg";

function PaymentForm() {
  const [amount, setAmount] = useState("30000");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Prepare data to send to your API endpoint
    const requestData = {
      amount, // Ensure this is in the smallest unit, which should be копійки for гривні
    };

    // Sending the amount to your backend which is responsible for communicating with Monobank API
    const response = await fetch("/api/init-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    // Assuming your backend responds with the URL to redirect for payment processing
    const { paymentUrl } = await response.json();

    // Redirecting to the payment URL received from the backend
    window.location.href = paymentUrl;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white p-5 rounded-lg max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">ДЕТАЛІ ПРОГРАМИ</h2>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          ПЛАН ХАРЧУВАННЯ (3/4 ТИЖНІ)
        </label>
        <p className="text-sm">
          Індивідуальна програма харчування, в якій враховані всі особливості
          вашого організму, спосіб життя та особисті побажання
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">ПІДПИСКА</label>
        <p className="text-sm">План харчування (3/4 тижні)</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          ПОНОВЛЕННЯ ЧЛЕНСТА
        </label>
        <p className="text-sm">19.06.2024р</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">ЗАГАЛЬНА СУММА</label>
        <p className="text-sm">3000 грн</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Оплатити за допомогою
        </label>
        <div className="flex gap-3">
          <Image
            src={Visa}
            alt="visa"
            className="w-[30px] md:w-[40px] h-auto"
          />
          <Image
            src={Mastercard}
            alt="visa"
            className="w-[30px] md:w-[40px] h-auto"
          />
          <Image
            src={Privat}
            alt="visa"
            className="w-[17px] md:w-[27px] h-auto"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        ОПЛАТИТИ
      </button>
    </form>
  );
}

export default PaymentForm;
