import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import RegisterForm from "../components/account/RegisterForm";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    setLoading(true);
    setError("");

    try {
      await register(userData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <RegisterForm
            onSubmit={handleRegister}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
