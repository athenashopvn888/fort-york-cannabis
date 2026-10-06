"use client";

import DeliveryCatalog from "./DeliveryCatalog";
import IdVerificationChat from "./IdVerificationChat";
import "./delivery-experience.css";

export default function DeliveryContent() {
  return (
    <div className="fyc-delivery-scope">
      <DeliveryCatalog />
      <IdVerificationChat />
    </div>
  );
}
