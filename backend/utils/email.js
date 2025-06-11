const nodemailer = require('nodemailer');

// Configure Mailgun SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailgun.org',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    // Recommended to add for Mailgun SMTP
    rejectUnauthorized: false
  }
});

exports.sendPasswordResetEmail = async (email, name, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  const mailOptions = {
    from: process.env.SMTP_USERNAME, // Or your verified domain email
    to: email,
    subject: 'Password Reset Request - Beauty Appointment System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a5568;">Hello ${name},</h2>
        <p>You requested to reset your password for Beauty Appointment System.</p>
        <p>Please click the button below to reset your password:</p>
        <div style="margin: 20px 0;">
          <a href="${resetLink}" 
             style="background-color: #4299e1; color: white; padding: 10px 20px; 
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
    text: `Password Reset Link: ${resetLink}\n\nThis link expires in 5 minutes.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};