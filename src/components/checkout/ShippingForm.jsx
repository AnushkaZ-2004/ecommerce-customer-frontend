import React, { useState } from "react";
import { validateEmail } from "../../utils/helpers";

const ShippingForm = ({ formData, onUpdate, onNext }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-form">
      <h2>Shipping Information</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "error" : ""}
          />
          {errors.firstName && (
            <span className="field-error">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "error" : ""}
          />
          {errors.lastName && (
            <span className="field-error">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Street Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "error" : ""}
        />
        {errors.address && (
          <span className="field-error">{errors.address}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "error" : ""}
          />
          {errors.city && <span className="field-error">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? "error" : ""}
          />
          {errors.state && <span className="field-error">{errors.state}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">ZIP Code *</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={errors.zipCode ? "error" : ""}
          />
          {errors.zipCode && (
            <span className="field-error">{errors.zipCode}</span>
          )}
        </div>
      </div>

      <button type="submit" className="next-btn">
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingForm;
