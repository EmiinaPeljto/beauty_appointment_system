const supportRequestModel = require('../models/supportRequestModel');
const userModel = require('../models/userModels');

exports.addSupportRequest = async(req, res) => {
  try {
    const {subject, message} = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await supportRequestModel.addSupportRequest(subject, message);

    res.status(201).json({message: "Support requested successfully", requestId: result.insertId});
  } catch (error) {
    console.error("Request error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};