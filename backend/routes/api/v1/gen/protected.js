const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../../../middleware/authMiddleware');
const db = require('../../../../config/db');

// This route will require authentication
router.get('/profile', authenticateToken, (req, res) => {
  // At this point, req.user contains the decoded token payload
  res.json({
    message: 'Protected route accessed successfully',
    user: req.user
  });
});

// Protected route that requires JWT authentication
router.get('/me', authenticateToken, (req, res) => {
  // Access the authenticated user's info from the decoded token
  const userId = req.user.id;
  const email = req.user.email;

  res.json({ id: userId, email: email, message: 'Protected route accessed successfully!' });
});

// Add a support request
router.post('/supportRequests/add', authenticateToken, async (req, res) => {
  try {
    const { fullName, email, subject, message, status = 'pending' } = req.body;
    
    // If authenticated, use the user ID from the JWT token
    const userId = req.user.id;
    
    // Insert the support request into the database
    const result = await db.query(
      'INSERT INTO support_requests (user_id, full_name, email, subject, message, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [userId, fullName, email, subject, message, status]
    );
    
    // Return the created support request
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Support request submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting support request:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit support request',
      error: error.message 
    });
  }
});

module.exports = router;
