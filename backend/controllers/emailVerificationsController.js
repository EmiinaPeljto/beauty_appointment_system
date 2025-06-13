const emailVerificationsModel = require('../models/emailVerificationsModel');
const {sendVerificationEmail} = require('../utils/email');

exports.verifyEmailCode = async (req, res) => {
    const { email, code } = req.body;
    // Find the latest verification for this email and code
    const record = await emailVerificationsModel.getLatestEmailVerification(email, code);
    if (!record) return res.status(400).json({ message: "No pending verification found." });

    if (record.verified) return res.status(400).json({ message: "Email already verified." });
    if (record.locked_until && new Date(record.locked_until) > new Date())
        return res.status(400).json({ message: "Too many attempts, please try again later." });
    if (new Date(record.expires_at) < new Date())
        return res.status(400).json({ message: "Code expired." });
    if (record.code !== code) {
        let attempts = record.attempts + 1;
        let locked_until = null;
        if (attempts >= 5) locked_until = new Date(Date.now() + 10 * 60 * 1000);
        await emailVerificationsModel.updateEmailVerification(record.id, { attempts, locked_until });
        return res.status(400).json({ message: "Invalid code.", attemptsLeft: Math.max(0, 5 - attempts) });
    }

    // Parse payload and insert into users table
    const userData = JSON.parse(record.payload);
    // Check if user already exists (should not, but for safety)
    const existingUser = await userModel.getUserByEmail(userData.email);
    if (existingUser) {
        await emailVerificationsModel.updateEmailVerification(record.id, { verified: 1 });
        return res.status(400).json({ message: "User already exists. Please log in." });
    }
    await userModel.register(
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.phone_number,
        userData.password
    );

    await emailVerificationsModel.updateEmailVerification(record.id, { verified: 1 });

    res.status(200).json({ message: "Email verified and account created. You can now log in." });
};
exports.resendVerificationCode = async (req, res) => {
    const {userId} = req.body;
    const record = await emailVerificationsModel.getLatestEmailVerification(userId);
    if (!record) return res.status(400).json({ message: "No verification found." });
    if (record.verified) return res.status(400).json({ message: "Already verified." });
    if (record.locked_until && new Date(record.locked_until) > new Date())
        return res.status(429).json({ message: "Resend locked. Try later." });
    if (record.resend_count >= 3) {
        const locked_until = new Date(Date.now() + 10 * 60 * 1000);
        await emailVerificationsModel.updateEmailVerification(record.id, { locked_until });
        return res.status(429).json({ message: "Resend limit reached. Try later." });
    }
    const code = Math.floor(10000000 + Math.random() * 90000000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await emailVerificationsModel.updateEmailVerification(record.id, {
        code, expires_at: expiresAt, resend_count: record.resend_count + 1, attempts: 0
    });
    const user = await userModel.getUserById(userId);
    await sendVerificationEmail(user.email, user.first_name, code);
    res.json({ message: "Verification code resent." });
};