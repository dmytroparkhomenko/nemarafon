import React, { useState } from "react";

function PaymentForm() {
  const [amount, setAmount] = useState("10");
  const [orderId, setOrderId] = useState(`order_${Date.now()}`);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/liqpay-api/payment-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, order_id: orderId }),
    });
    const { data, signature } = await response.json();

    // Redirect to LiqPay Checkout
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.liqpay.ua/api/3/checkout";
    form.acceptCharset = "utf-8";
    form.innerHTML = `
      <input type="hidden" name="data" value="${data}" />
      <input type="hidden" name="signature" value="${signature}" />
      <input type="submit" value="Pay Now"/>
    `;
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Pay with LiqPay</button>
    </form>
  );
}

export default PaymentForm;
