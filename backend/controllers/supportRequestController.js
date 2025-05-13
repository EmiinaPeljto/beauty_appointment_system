const supportRequestModel = require("../models/supportRequestModel");
const userModel = require("../models/userModels");
const db = require("../config/db");

exports.addSupportRequest = async (req, res) => {
  try {
    console.log('Auth User Object:', req.user); // Debug what's in the token
    
    const user_id = req.user.id;
    
    console.log('Extracted user_id:', user_id);
    const { subject, message } = req.body;
    console.log('Request body:', req.body);

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required",
      });
    }

    // Insert the support request into the database
    // Use the supportRequestModel function which is already set up correctly for your database
    const result = await supportRequestModel.addSupportRequest(
      user_id, // This can be null for non-authenticated users
      subject,
      message
    );

    res.status(201).json({
      success: true,
      data: result[0],
      message: "Support request submitted successfully",
    });
  } catch (error) {
    console.error("Support request error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit support request",
      error: error.message,
    });
  }
};
