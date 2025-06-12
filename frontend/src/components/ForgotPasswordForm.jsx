import React, { useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { sendForgotPassword, loading, error, success } = useForgotPassword();

  const onSubmit = (e) => {
    e.preventDefault();
    sendForgotPassword(email);
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Forgot Password</h2>
      {success && <div style={{ color: "green" }}>{success}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>Email address:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;