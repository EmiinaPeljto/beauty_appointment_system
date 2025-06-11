const userModel = require("../models/userModels");
const validateRegistrationInput = require("../contracts/registrationValidation");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config/auth");
const { sendPasswordResetEmail } = require("../utils/email");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  try {
    // Extract user data from request body
    const { first_name, last_name, email, password, phone_number } = req.body;

    // GetAllUsers to check for existing users
    const existingUsers = await userModel.getAllUsers();

    // Validate user input
    const { valid, errors } = await validateRegistrationInput(
      { first_name, last_name, email, password, phone_number },
      existingUsers
    );

    if (!valid) {
      return res.status(400).json({ errors });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register user
    const result = await userModel.register(
      first_name,
      last_name,
      email,
      phone_number,
      hashedPassword
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user by email
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please, try again." });
    }

    // Compare the plain-text password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again." });
    }

    // Create payload for JWT token - don't include sensitive data like password
    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role || "user", // Default to 'user' if role is not defined
    };

    // Generate JWT token
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });

    // Return token along with user info
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsersFullName = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from route parameter
    const users = await userModel.getUsersFullName(id);
    res.json(users);
  } catch (error) {
    console.error("Error fetching user's full name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from route parameter
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

///////////////////// Forgot password //////////////////
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });
    }

    // Validate email format using your registration validation
    const { valid, errors } = await validateRegistrationInput(
      {
        first_name: "tmp",
        last_name: "tmp",
        email,
        password: "Tmp123456",
        phone_number: "+38761111111",
      },
      []
    );
    if (!valid && errors.email) {
      return res.status(400).json({ status: "error", message: errors.email });
    }

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      // For security, respond with success even if user not found
      return res.json({
        status: "success",
        message: "If this email exists, a password reset link has been sent.",
      });
    }

    // Generate and send reset token
    const token = await userModel.createPasswordResetToken(user.id);
    const sent = await sendPasswordResetEmail(
      user.email,
      user.first_name,
      token
    );

    if (sent) {
      res.json({
        status: "success",
        message: "If this email exists, a password reset link has been sent.",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Failed to send email.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { new_password } = req.body;

    if (!token || !new_password) {
      return res.status(400).json({
        status: "error",
        message: "Token and new password required.",
      });
    }

    // Add password validation here
    const { valid, errors } = await validateRegistrationInput(
      {
        first_name: "tmp",
        last_name: "tmp",
        email: "tmp@tmp.com",
        password: new_password,
        phone_number: "+38761111111",
      },
      []
    );
    if (!valid && errors.password) {
      return res
        .status(400)
        .json({ status: "error", message: errors.password });
    }

    const reset = await userModel.validatePasswordResetToken(token);
    if (!reset) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired token.",
      });
    }

    const user = await userModel.getUserById(reset.user_id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await userModel.updatePasswordById(user.id, hashedPassword);

    // Mark token as used
    await userModel.markTokenUsed(reset.id);

    // Clear reset attempts
    await userModel.clearResetAttempts(user.id);

    res.json({
      status: "success",
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
