const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendPasswordResetEmail = async (email, name, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL || "noreply@beautyappointment.com", // Your verified sender
    subject: "Password Reset Request - Beauty Appointment System",
    text: `Password Reset Link: ${resetLink}\n\nThis link expires in 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a5568;">Hello ${name},</h2>
        <p>You requested to reset your password for Beauty Appointment System.</p>
        <p>Please click the button below to reset your password:</p>
        <div style="margin: 20px 0;">
          <a href="${resetLink}" 
             style="background-color: #F178B6; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p style="margin-top: 30px; color: #718096; font-size: 12px;">
          This link will expire in 5 minutes for security reasons.
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Password reset email sent to:", email);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return false;
  }
};

exports.sendVerificationEmail = async (email, name, code) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL || "noreply@beautyappointment.com", // Your verified sender
    subject: "Verify your email - Beauty Appointment System",
    text: `Your verification code is: ${code}\n\nThis code expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a5568;">Hello ${name},</h2>
        <p>Thank you for registering with Beauty Appointment System.</p>
        <p>Your verification code is:</p>
        <div style="margin: 20px 0; text-align: center;">
          <span style="background-color: #f3f4f6; padding: 10px 20px; font-size: 24px; font-family: monospace; letter-spacing: 3px; border-radius: 4px;">
            <strong>${code}</strong>
          </span>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p style="margin-top: 30px; color: #718096; font-size: 12px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent to:", email);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return false;
  }
};
