import Image from "next/image";
import React, { useState } from "react";
import Visa from "@/app/components/symbols/Visa.svg";
import Mastercard from "@/app/components/symbols/Mastercard.svg";
import Privat from "@/app/components/symbols/Privat.svg";

function PaymentForm() {
  const [amount, setAmount] = useState("1");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/init-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const { data, signature } = await response.json();

    // Dynamically create a form to submit the payment
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.liqpay.ua/api/3/checkout";
    form.acceptCharset = "utf-8";

    const inputData = document.createElement("input");
    inputData.type = "hidden";
    inputData.name = "data";
    inputData.value = data;

    const inputSignature = document.createElement("input");
    inputSignature.type = "hidden";
    inputSignature.name = "signature";
    inputSignature.value = signature;

    form.appendChild(inputData);
    form.appendChild(inputSignature);

    document.body.appendChild(form);
    form.submit(); // Automatically submits the form, redirecting to LiqPay checkout
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
