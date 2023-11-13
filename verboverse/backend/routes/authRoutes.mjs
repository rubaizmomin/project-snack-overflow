const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();

// auth routes
// api/signup

router.post('/signup', signup);

module.exports = router;