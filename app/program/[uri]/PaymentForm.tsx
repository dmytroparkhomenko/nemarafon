"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Visa from "@/app/components/symbols/Visa.svg";
import Mastercard from "@/app/components/symbols/Mastercard.svg";
import Privat from "@/app/components/symbols/Privat.svg";
import { getPostDataForPayment } from "@/app/api/programs-fetching";
import { useAuth } from "@/app/AuthContext";

interface PaymentFormProps {
  programURI: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ programURI }) => {
  const { user } = useAuth();
  const [programPaymentInfo, setProgramPaymentInfo] = useState<any>(null);

  // hardcode
  const [isChecked, setIsChecked] = useState(false);
  const [programDuration, setProgramDuration] = useState(7);
  // ---

  // program data fetching
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostDataForPayment(programURI);
      setProgramPaymentInfo(data);
    };

    fetchData();
  }, [programURI]);

  // hardcode
  useEffect(() => {
    if (isChecked) {
      setProgramDuration(21);
    } else {
      setProgramDuration(7);
    }
  }, [isChecked]);
  // ---

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const amount = isChecked
      ? 14699
      : programPaymentInfo?.programFields.programPrice;
    const programTitle = programPaymentInfo?.title;
    const orderId = `${user.uid}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}`;

    const response = await fetch("/api/init-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ programURI, programTitle, amount, orderId }),
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

  if (!programPaymentInfo) {
    return <div>Завантаження...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white p-5 rounded-lg max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl">ДЕТАЛІ ПРОГРАМИ</h2>
      </div>

      {programPaymentInfo?.title == "НЕмарафон 2024" && (
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="form-checkbox h-5 w-5 mr-3"
          />
          <label className="block text-sm font-medium">
            Придбати 3 НЕмарафони одразу зі знижкою 20%!
          </label>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {programPaymentInfo?.title}
        </label>
        <p className="text-sm">
          {programPaymentInfo?.programFields.programShortDescription}
        </p>
      </div>

      {isChecked && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Кількість потоків
          </label>
          <p className="text-sm">3</p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Доступ до програми
        </label>
        <p className="text-sm">{programDuration} тижнів</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Загальна сума</label>
        <p className="text-sm">
          {isChecked ? "14699" : programPaymentInfo?.programFields.programPrice}
          грн.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Оплата за допомогою
        </label>
        <div className="flex gap-3 mb-4">
          <Image
            src={Visa}
            alt="visa"
            className="w-[30px] md:w-[40px] h-auto"
          />
          <Image
            src={Mastercard}
            alt="mastercard"
            className="w-[30px] md:w-[40px] h-auto"
          />
          <Image
            src={Privat}
            alt="privat"
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
};

export default PaymentForm;
