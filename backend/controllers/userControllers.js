const userModel = require("../models/userModels");
const validateRegistrationInput = require("../contracts/registrationValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config/auth");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async(req, res) => {
  try {
    // Extract user data from request body
    const {first_name, last_name,  email, password, phone_number} = req.body;

    // GetAllUsers to check for existing users
    const existingUsers = await userModel.getAllUsers();

    // Validate user input
    const {valid, errors} = await validateRegistrationInput({first_name, last_name, email, password, phone_number}, existingUsers);

    if (!valid) {
      return res.status(400).json({errors});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Register user
    const result = await userModel.register(first_name, last_name, email, phone_number, hashedPassword);

    res.status(201).json({message: "User registered successfully", userId: result.insertId});
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
      return res.status(401).json({ message: "Invalid email or password. Please, try again." });
    }

    // Compare the plain-text password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password. Please try again." });
    }

    // Create payload for JWT token - don't include sensitive data like password
    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role || 'user' // Default to 'user' if role is not defined
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
        role: user.role || 'user'
      }
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
