import React, { useState } from "react";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";

const CheckoutForm = ({ onSubmit, user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="checkout-form">
      <div className="checkout-steps">
        <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
          <span>1</span> Shipping
        </div>
        <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
          <span>2</span> Payment
        </div>
      </div>

      {currentStep === 1 && (
        <ShippingForm
          formData={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
        />
      )}

      {currentStep === 2 && (
        <PaymentForm
          formData={formData}
          onUpdate={updateFormData}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CheckoutForm;
