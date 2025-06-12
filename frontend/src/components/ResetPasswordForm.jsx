import React, { useState } from "react";
import useResetPassword from "../hooks/useResetPassword";

const ResetPasswordForm = ({ token }) => {
  const [newPassword, setNewPassword] = useState("");
  const { sendResetPassword, loading, error, success } = useResetPassword(token);

  const onSubmit = (e) => {
    e.preventDefault();
    sendResetPassword(newPassword);
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Reset Password</h2>
      {success && <div style={{ color: "green" }}>{success}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          required
          minLength={8}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;