import Image from "next/image";
import React, { useState } from "react";
import Visa from "@/app/components/symbols/Visa.svg";
import Mastercard from "@/app/components/symbols/Mastercard.svg";
import Privat from "@/app/components/symbols/Privat.svg";
import { ProgramCardProps } from "@/interfaces/interfaces";
import { getPostDataForPayment } from "@/app/api/programs-fetching";

interface PaymentFormProps {
  programURI: string;
}

async function PaymentForm({ programURI }: PaymentFormProps) {
  const amount = "1";

  const programPaymentInfo = await getPostDataForPayment(programURI);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/init-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const { data, signature } = await response.json();

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
    form.submit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white p-5 rounded-lg max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl">ДЕТАЛІ ПРОГРАМИ</h2>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {programPaymentInfo?.title}
        </label>
        <p className="text-sm">
          {programPaymentInfo?.programFields.programShortDescription}
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Доступ до програми
        </label>
        <p className="text-sm">7 тижнів</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Загальна сума</label>
        <p className="text-sm">
          {programPaymentInfo?.programFields.programPrice} грн.{" "}
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Оплата за допомогою
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
        className="w-full uppercase bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Оплатити
      </button>
    </form>
  );
}

export default PaymentForm;
