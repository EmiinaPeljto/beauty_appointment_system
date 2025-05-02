const userModel = require("../models/userModels");

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
    const {first_name, last_name, email, phone_number, password} = req.body;

    if (!first_name || !last_name || !email || !phone_number || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await userModel.register(first_name, last_name, email, phone_number, password);

    res.status(201).json({message: "User registered successfully", userId: result.insertId});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userModel.login(email, password);

    if(email != user.email || password != user.password) {
      return res.status(401).json({ message: "Error while logging in" });
    }
    
    res.status(200).json({message: "User logged in successfully", userId: user.id});
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error while logging in!" });
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