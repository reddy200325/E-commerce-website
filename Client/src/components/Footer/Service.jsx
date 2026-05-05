import React from "react";

const Service = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Our Services</h1>

      <div className="space-y-6 text-gray-700">
        <p>
          We provide high-quality fashion products with fast delivery and secure payments.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>🚚 Fast & Reliable Delivery</li>
          <li>💳 Secure Payment Methods</li>
          <li>🔄 Easy Returns & Refunds</li>
          <li>📦 Real-time Order Tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default Service;