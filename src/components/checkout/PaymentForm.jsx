import React, { useState } from "react";

const PaymentForm = ({ formData, onUpdate, onBack, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    onUpdate({ cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    onUpdate({ expiryDate: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber.replace(/\s/g, "")) {
        newErrors.cardNumber = "Card number is required";
      } else if (formData.cardNumber.replace(/\s/g, "").length < 13) {
        newErrors.cardNumber = "Invalid card number";
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
      }

      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = "Invalid CVV";
      }

      if (!formData.nameOnCard.trim()) {
        newErrors.nameOnCard = "Name on card is required";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Payment Information</h2>

      <div className="payment-methods">
        <label className="payment-method">
          <input
            type="radio"
            name="paymentMethod"
            value="credit-card"
            checked={formData.paymentMethod === "credit-card"}
            onChange={handleChange}
          />
          Credit Card
        </label>

        <label className="payment-method">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={formData.paymentMethod === "paypal"}
            onChange={handleChange}
          />
          PayPal
        </label>
      </div>

      {formData.paymentMethod === "credit-card" && (
        <>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={errors.cardNumber ? "error" : ""}
            />
            {errors.cardNumber && (
              <span className="field-error">{errors.cardNumber}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date *</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength="5"
                className={errors.expiryDate ? "error" : ""}
              />
              {errors.expiryDate && (
                <span className="field-error">{errors.expiryDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV *</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="4"
                className={errors.cvv ? "error" : ""}
              />
              {errors.cvv && <span className="field-error">{errors.cvv}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nameOnCard">Name on Card *</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              className={errors.nameOnCard ? "error" : ""}
            />
            {errors.nameOnCard && (
              <span className="field-error">{errors.nameOnCard}</span>
            )}
          </div>
        </>
      )}

      {formData.paymentMethod === "paypal" && (
        <div className="paypal-info">
          <p>You will be redirected to PayPal to complete your payment.</p>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={onBack}>
          Back to Shipping
        </button>
        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
